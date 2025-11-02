import React from 'react'
import {useRef,useState} from "react";
import "../Styles/VideoMeet.css"

const server_url= "http://localhost:8000";
//you can use useRef here as well so do how you will
var connections={}
const peerConfigConnections = {
    "iceServers":[
        {"urls":"stun.stun.l.google.com:19302"}
    ]
}

const VideoMeet = () => {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let[videoAvailable,setVideoAvailable] = useState(true);

    let[audioAvailable,setAudioAvailable] = useState(true);

    let[video,setVideo] = useState();

    let[audio,setAudio] = useState();

    let[screen,setScreen] = useState();

    let[Modal,setModal]=useState();

    let[screenAvailable,setScreenAvailable]=useState();

    let[messages,setMessages]=useState([]);

    let[message,setMessage]=useState("");

    let[newMessage,setNewMessage] = useState(0);

    let[askForUsername,setAskForUsername] = useState(true);

    let[username,setUsername] = useState("");

    const videoRef= useRef([]);

    let [vides,setVideos] = useState([]);

    //todo
    //if(isChrome()===false){
    //}
  return (
    <div >
      { askForUsername ===true ? <div>
        </div> :<></>
        }
    </div>
  )
}

export default VideoMeet
