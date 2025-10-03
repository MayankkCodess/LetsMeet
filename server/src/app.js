import express from "express" ;
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);  // instead of this line as many things are in same app.js we create socketManager.js

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))

app.use("/api/v1/users",userRoutes);
// app.use("/api/v2/users",newUserRoutes);  like if someone using latest version or it updated

const start = async() =>{
    app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://kaushmayank218_db_user:ghijkedcs12349809@cluster0.afjexlf.mongodb.net/")

    console.log(`Mongo Connected DB Host: ${connectionDB.connection.host}`);
    server.listen(app.get("port"),() =>{
        console.log("Listening on port 8000");
    })
}

start();