import express from "express" ;
import dotenv from "dotenv";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"
//Recent Changes 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


const app = express();
const server = createServer(app);
const io = connectToSocket(server);  // instead of this line as many things are in same app.js we create socketManager.js

const PORT = process.env.PORT || 8000


app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))

app.use("/api/v1/users",userRoutes);
// app.use("/api/v2/users",newUserRoutes);  like if someone using latest version or it updated

const start = async() =>{
   const connectionDB = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo Connected DB Host: ${connectionDB.connection.host}`);

   server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

}

start();