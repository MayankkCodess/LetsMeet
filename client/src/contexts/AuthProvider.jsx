import { useState,useContext}from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

const client = axios.create({
    baseURL:"http://localhost:8000/api/v1/users"
})

export const AuthProvider = ({children})=>{
    const authContext = useContext(AuthContext)

    const [userData,setUserData] = useState(authContext);

    const handleRegister = async(name,username,password) =>{

            const request = await client.post("/register",{
                name:name,
                username:username,
                password:password
            })
            if(request.status === 201){
                return request.data.message;
            }
    }

    const handleLogin = async(username, password) =>{
     
           let request = await client.post("/login",{
                username:username,
                password:password
            });
            if(request.status === 200){
                localStorage.setItem("token",request.data.token); 
                router("/");
                return true;
            }
    }

    const router = useNavigate();

    const data = {
        userData,setUserData,handleRegister,handleLogin
    }
    return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
)
}