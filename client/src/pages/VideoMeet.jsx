import React, { useEffect } from 'react'
import {useRef,useState} from "react";
import "../Styles/VideoMeet.css"
import { TextField,Button } from '@mui/material';

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

    let[video,setVideo] = useState([]);

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

    let [videos,setVideos] = useState([]);

    //todo
    //if(isChrome()===false){
    //}

  const getPermissions = async() =>{
    try{
      const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});
      if(videoPermission){
        setVideoAvailable(true);
      }else{
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});
      if(audioPermission){
        setAudioAvailable(true);
      }else{
        setAudioAvailable(false);
      }

      if(navigator.mediaDevices.getDisplayMedia){
        setScreenAvailable(true);

      }else{
        setScreenAvailable(false);
      }

      if(videoAvailable || audioAvailable){
        const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});
        if(userMediaStream){
          window.localStream = userMediaStream;
          if(localVideoRef.current){
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    }catch(err){
      console.log(err);
    }
  }

    useEffect(()=>{
       getPermissions();
      //  console.log(localVideoRef);
    },[]);
    //this fn do like if user mute video then it will of it from every other user computer 
    const getUserMediaSuccess =(stream)=>{

    }

   //here is that function below
    let getUsermedia = ()=>{
    if((video && videoAvailable) || (audio && audioAvailable)){
      navigator.mediaDevices.getUserMedia({video:video,audio:audio})
      .then(getUserMediaSuccess)//TODO:getUserMediaSuccess
      .then((stream)=>{})
      .catch((e)=>console.log(e))
    }else{
      try{
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track=>track.stop())
      }catch(e){}
    }};

    //if some one changes like mute audio or off video then useEffect help to do so
    useEffect(()=>{
      if(video!==undefined && audio !== undefined){
        getUserMedia();
      }
    },[audio,video])


    // TODO Add Message
    let connectToSocketServer = () =>{
      socketRef.current = io.connect(server_url , {secure:false});
      socketRef.current.on("signal",gotMessageFromServer);
  
      socketRef.current.on("connect",()=>{

        socketRef.current.emit("join-call" , window.location.href);
        
        socketIdRef.current = socketRef.current.id

        socketRef.current.on("chat-message",addMessage);

        socketRef.current.on("user-left",(id)=>{
          setVideo((videos)=>videos.filter((video)=>video.socketId!==id))
        })

        socketRef.current.on("user-joined",(id,clients)=>{
          clients.forEach((socketListId) => {

            connections[socketListId]= new RTCPeerConnection(peerConfigConnections)
          })
        })

      })
    }

    let getMedia = () =>{
      setVideo(videoAvailable);
      setAudio(audioAvailable);

      // connectToSocketServer();
    }

  return (
    <div >
      { askForUsername ===true ? <div>

        <h3>Enter Into Lobby</h3>
        <TextField id="outlined-basic" label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained" onClick={connect}>Connect</Button>
         {/* upar button mai onClick={connect} ye aayega */}
          <div>
            <video  ref={localVideoRef} autoPlay muted></video>
          </div>
        </div> :<></>
        }
    </div>
  )
}

export default VideoMeet
