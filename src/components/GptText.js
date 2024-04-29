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
  {selectingGptkeyVaues ?  <div className="bg-red-600 p-1 text-black text-center text-xs font-semibold m-auto w-1/2 "> Request:I am using Gemini Api  which is going to be expire
  so please use your key visit here
    <Link to={"/setting"} className="text-blue-800" > setting</Link> </div> : "" }
</div>
     <div className = "bg-black text-white  fixed right-0 z-50 " style={styles}>
      <div className="overflow-scroll  h-96">
        <p>Gptfile</p>
        <button onClick={()=>{dispatch(gptValue(false))}}>close</button>
{selectgeminiResponse.length>1?<div >scroll below</div>:""}
         <GeminiResponse/>
        </div>
        
</div>
        </>
    )
}
export default GptText