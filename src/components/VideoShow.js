/*
import { useSelector } from "react-redux"
import { useEffect } from "react"

const VideoShow=()=>{
const getVideoData=useSelector((store)=>store.useYtSlice.listYt)


useEffect(()=>{
console.log(getVideoData,"kk")
},[getVideoData])
    return(
        <>
        dd
        </>
    )
}
export default VideoShow*/


import { useSelector,useDispatch } from "react-redux";
import { useEffect ,useState,useRef} from "react";
import { XSquare } from "react-bootstrap-icons";
 import { handleAiVideo } from "../utils/youtubeVideosFun";
 import { addListYt, addQueryInput, addShowMsgi } from "../utils/dataYoutubeSlice";
 import { Outlet,Link} from "react-router-dom";
const VideoShow = ({checkClick}) => {
  const getVideoData = useSelector((store) => store.useYtSlice.listYt);
  const selectTextYtVideo=useSelector((store)=>store.useYtSlice.queryInput)
  const selectStatus=useSelector((store)=>store.useYtSlice.showMsg)
  const [data,setData]= useState(null)
  // let value=selectTextYtVideo
  const inputRef=useRef(null)
  const divRef=useRef(null)
  const paraRef=useRef(null)
  const dispatch=useDispatch()
  
  useEffect(() => {
    
   // console.log(getVideoData, "kk");
   if(checkClick){
    setData(getVideoData)  
    dispatch(addShowMsgi(null))
   }

  }, [getVideoData]);
 
 
const handleResearch=()=>{
    let get= inputRef.current.value
    if(!get.trim()){
        alert("provide input")
        return 
    }
    
    handleAiVideo(get,dispatch,addListYt,addShowMsgi,addQueryInput,checkClick)
  

    if(divRef.current){
        console.log(divRef)
        divRef.current.style.display="none"
        paraRef.current.style.display="block"
        inputRef.current.value=""
    }
}
//bg-[#FFF8DC]text-[#494F55]    
  return (
    <> 
  {selectStatus && <div className="bg-black animate-pulse p-10 md:p-20 lg:p-44 z-[1800] fixed inset-0 flex items-center justify-center rounded-sm text-center text-white font-bold"
    ><span className="animate-none font-bold">{selectStatus?.toUpperCase()}</span></div>}

      {data && (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[1600] select-none">
          <Outlet/>
          <div className=" absolute top-0 bg-black z-[1700]" onClick={()=>{setData(null);dispatch(addListYt(null))}}><XSquare size="30" color="orange"/></div>

          <div className=" bg-[#292929] text-[#ffffff]  w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg p-4  border border-black">
            <div ref={divRef} className="text-center text-black"><input ref={inputRef} className="outline-none border-gray-500 border rounded-md" required placeholder={selectTextYtVideo}  ></input> <button onClick={handleResearch} className="bg-red-500 text-white font-bold p-1 rounded-md">more</button></div>
            <p ref={paraRef} className="text-center text-red-500 hidden">only 1 time search allowed</p>

            <p className="font-bold text-sm border-b-[1px] m-1 border-black p-1">TOPIC:-<span>{selectTextYtVideo && selectTextYtVideo?.split(" ",8).join(" ")}...</span></p>

            {getVideoData.map((video, index) => {
                if(video?.id?.videoId){
             return( <><Link key={index}  to={`/withoutUpload/videoplay/${video?.id?.videoId}`}><div  className=" sm:hover:shadow-md flex flex-row mb-4 sm:hover:cursor-pointer " >
                
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-32 sm:w-48 h-24 sm:h-32 object-cover rounded-md "
                />
                <div className="ml-4">
                  <h2 className="text-sm sm:text-lg font-bold ">{video.snippet.title}</h2>
                  <p className=" text-xs sm:text-sm">{video.snippet.description?.split(" ")?.slice(0,6)?.join(' ')}</p>
                </div>
              </div></Link></>)
                }
})}
          </div>
        </div>
      )}
    </>
  );
  
};

export default VideoShow;

