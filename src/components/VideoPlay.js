import React from "react";
import YouTube from "react-youtube";
import { useParams ,Link,useLocation} from "react-router-dom";
import { useState } from "react";
import { XSquare } from "react-bootstrap-icons";
import { addShowLatestStatus } from "../utils/dataYoutubeSlice";
import { useDispatch ,useSelector} from "react-redux";
const VideoPlay = () => {
  const { id } = useParams();
 const [videoPlay,setVideoPlay]=useState(id)
 
//as the child route back path is different so that we need to get path so that when user 
//click back button it move to previous path -----set according to the app.js route path
 const path=useLocation()

 const pathgrab=path?.pathname?.split("/")?.slice(0)
 console.log(pathgrab[1])


 const dispatch=useDispatch()
 const status=useSelector((store)=>store.useYtSlice.ytStatus)
  const opts = {
    height: '390', // Adjust the height as needed
    width: '640',  // Adjust the width as needed
    playerVars: {
        modestbranding: 1, // Reduces YouTube branding
        autoPlay:0,
        mute: 0,
        rel:0,
        controls:1
    },
  };

  return (

 <>
 
 {videoPlay &&<div> 
 
    <div className=" fixed inset-0 flex flex-col  items-center justify-center bg-black   z-[1900] ">
    <div className=" mb-1 sm:mt-1" >  <Link to={`/${pathgrab[1]}`}><div ><XSquare size={20} color="white"/></div></Link></div> 
     <div className="w-[95%] sm:w-[75%] ">
      <div className="video-container">
         {status && <div className="text-white">loading the video...</div>}
        <YouTube videoId={id} opts={opts}
         className="topVideo" 
         onReady={(event) => {
            // You can access the player here if needed
          /* event.target.playVideo();*/ 
          dispatch(addShowLatestStatus(null))
          }}
          onPlay={()=>{
            dispatch(addShowLatestStatus(null))
          }}
         
         />
      </div>
    </div> 
    </div>
    </div>
} 
    </> 
  );
};

export default VideoPlay;
