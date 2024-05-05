import { gptValue } from "../utils/aiManagment"
import {useDispatch,useSelector} from "react-redux"
import BoxSize from "./BoxSize"
import { useRef, useState } from "react"
import useGpt from "../utils/useGpt"
import GeminiResponse from "./GeminiResponse"
import {Link} from "react-router-dom"
import sendData from "../utils/sendData"
import DictLangSetting from "./DictLangSetting"
import { sendDataMail } from "../utils/ErrorSlice"
const GptText=({styles})=>{
    const dispatch=useDispatch()
  console.log(styles)
  const selectingGptkeyVaues=useSelector((store)=>store.userskey?.keyGPT?.msg)
 
  const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)
  const selectUserEmail=useSelector((store)=>store.userInformation.value?.email)
  const selectSendDataMsg=useSelector((store)=>store.ErrorSliced.sendDataMsg)
  const selectDic=useSelector((store)=>store.aiManage.Gpt)
  useGpt(selectDic)
 function sendDataToUser(){
sendData("AiSearch-of-all-data-right-now-seesion", selectgeminiResponse,selectUserEmail,dispatch,sendDataMail)
 }

    return(
        <>
        <div className="mt-2">
  {selectingGptkeyVaues ?  <div className="bg-red-600 p-1 text-black text-center text-xs font-bold m-auto w-1/2 select-none"> Request:just visit here a very important info as api key can be expire soon
    <Link to={"/setting"} className="text-blue-800 " > <div className=" inline-block animate-bounce hover:animate-none">setting</div></Link> </div> : "" }
{selectSendDataMsg&&<div className="text-center text-xs w-5/6 m-auto">{selectSendDataMsg}</div>}
</div>
     <div className = "bg-black text-white  fixed right-0 z-50  " style={styles}>
      <div className="overflow-scroll  h-96 ">

      <div className=" flex flex-row fixed bg-black">
        <button className=" text-white text-xs  m-1 bg-black p-1 rounded-sm" onClick={()=>{dispatch(gptValue(false))}}>close</button>
    { selectgeminiResponse.length && <div onClick={()=>sendDataToUser()} className="hover:cursor-pointer bg-red-700 rounded-lg text-white p-1 m-1 text-sm hover:bg-black parent">send <p className="element absolute top-[40px]  bg-gray-700 p-2 z-[60] w-[600px]  left-0 text-xs"> send all AiSearch data  to your emailId</p></div>} 
  <p className="text-white text-xs font-semibold m-1 p-1 text-center">AiSearch </p>

</div>
   



       <div className="pt-2 mt-8 p-[10px] sm:p-[20px] text-white">  <GeminiResponse/></div>
        </div>
        
</div>


        </>
    )
}
export default GptText