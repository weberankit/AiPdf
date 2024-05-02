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
  const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)

  useGpt(targetLangGemini)
    return(
        <>
        <div className="mt-2">
  {selectingGptkeyVaues ?  <div className="bg-red-600 p-1 text-black text-center text-xs font-semibold m-auto w-1/2 "> Request:just visit here a very important info as api key can be expire soon
    <Link to={"/setting"} className="text-blue-800" > setting</Link> </div> : "" }
</div>
     <div className = "bg-black text-white  fixed right-0 z-50 " style={styles}>
      <div className="overflow-scroll  h-96 flex flex-col">
      <div className="fixed flex flex-row ">
        <button className="text-white text-xs  m-1 bg-black p-1 rounded-sm" onClick={()=>{dispatch(gptValue(false))}}>close</button>
  <p className="text-black text-sm font-semibold m-1">AiSearch </p>
</div>
       <div className="pt-2 mt-9 p-1 text-white">  <GeminiResponse/></div>
        </div>
        
</div>
        </>
    )
}
export default GptText