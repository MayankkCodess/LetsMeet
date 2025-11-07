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

    const router = useNavigate();

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
                alert("User Login Successfully.")
                return true;
            }
    }

    const getHistoryOfUser = async () => {
        
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
      
    }

    const addToUserHistory = async (meetingCode) => {
       
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
       
    }

  
    const data = {
        userData,setUserData,handleRegister,handleLogin,addToUserHistory,getHistoryOfUser
    }


    return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
)
}