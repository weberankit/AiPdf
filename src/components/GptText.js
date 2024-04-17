import { gptValue } from "../utils/aiManagment"
import {useDispatch,useSelector} from "react-redux"
import BoxSize from "./BoxSize"
import { useRef, useState } from "react"
import useGpt from "../utils/useGpt"
import GeminiResponse from "./GeminiResponse"
import {Link} from "react-router-dom"
const GptText=({styles})=>{
    const dispatch=useDispatch()
  console.log(styles)
  const selectingGptkeyVaues=useSelector((store)=>store.userskey?.keyGPT?.msg)
  let targetLangGemini=localStorage.getItem("TargetGeminiDict")


  useGpt(targetLangGemini)
    return(
        <>
  {(selectingGptkeyVaues) ?  <div className="bg-red-600 p-1">please use your own GeMINI key api might be 
  expired ,just follow the step provided in setting very easy step as your api is accessible by you not by other users
   click  <Link to={"/setting"} >setting</Link> </div> : "" }

     <div className = "bg-black text-white  fixed right-0 z-45 " style={styles}>
      <div className="overflow-scroll  h-96">
        <p>Gptfile</p>
        <button onClick={()=>{dispatch(gptValue(false))}}>close</button>

         <GeminiResponse/>
        </div>
        
</div>
        </>
    )
}
export default GptText