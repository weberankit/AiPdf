import {langugesConstant} from "../utils/langugesConstant"
import { gptValue } from "../utils/aiManagment"
import {useDispatch,useSelector} from "react-redux"
import BoxSize from "./BoxSize"
import { useEffect, useRef, useState } from "react"
import useGpt from "../utils/useGpt"
import GeminiResponse from "./GeminiResponse"
import {Link} from "react-router-dom"
import sendData from "../utils/sendData"
import DictLangSetting from "./DictLangSetting"
import { sendDataMail } from "../utils/ErrorSlice"
import ShowMessageKey from "./ShowMessageKey"

import { SendFill, X } from "react-bootstrap-icons"
import useSupportLang from "../utils/useSupportLang"

const GptText=({styles})=>{

  const {showPdf6 ,gpt1,gpt2,log2,send1} = langugesConstant[useSupportLang()]
    const dispatch=useDispatch()
  //console.log(styles)
  const selectingGptkeyVaues=useSelector((store)=>store.userskey?.keyGPT?.msg)
//console.log(selectingGptkeyVaues)
  const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)
  const selectUserEmail=useSelector((store)=>store.userInformation.value?.email)
  const selectSendDataMsg=useSelector((store)=>store.ErrorSliced.sendDataMsg)
  const selectDic=useSelector((store)=>store.aiManage.Gpt)
  useGpt(selectDic)
 function sendDataToUser(){
sendData("AiSearch-of-all-data-right-now-seesion", selectgeminiResponse,selectUserEmail,dispatch,sendDataMail,log2,send1)
 }


//boxBg text-white 



    return(
        <>
       <ShowMessageKey keyAvail={selectingGptkeyVaues}/>

        <div className="mt-2">
 
{selectSendDataMsg&&<div className="text-center text-md text-green-700 z-[2000] font-bold bg-[black] top-0  fixed  w-full  inline-block m-auto">{selectSendDataMsg}<button className='bg-white text-black p-2 rounded-md  m-1 text-sm' onClick={()=>dispatch(sendDataMail(null))}>{showPdf6}</button> </div>}
</div>
     <div className = " bg-[#252b33] shadow-lg fixed right-0 z-50   " style={styles}>
      <div className="overflow-scroll  h-96 ">

      <div className=" flex flex-row fixed bg-black rounded-lg rounded-l-xl">
        <button className=" text-red-600 bg-white hover:bg-[#8a60f6] bg- transition-all duration-500   m-1  p-1 rounded-sm" onClick={()=>{dispatch(gptValue(false))}}><X size={24}/></button>
    { selectgeminiResponse.length && <div onClick={()=>sendDataToUser()} className="hover:cursor-pointer rounded-lg text-white p-1 m-2  hover:bg-black parenti transition-all duration-500"><SendFill/><p className=" showel transition-all duration-1000  rounded-md absolute top-[40px]  bg-gray-700 p-2 z-[60] w-[600px]  left-0 text-xs">{gpt1} </p></div>} 
  <p className="text-white text-xs font-semibold m-2 p-1 text-center">{gpt2} </p> 

</div>
   
 


       <div className="pt-2 mt-8 p-[10px]  text-white">  <GeminiResponse/></div>
        </div>
        
</div>


        </>
    )
}
export default GptText