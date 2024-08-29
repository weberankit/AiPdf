import {langugesConstant} from "../utils/langugesConstant"

import {useDispatch,useSelector} from "react-redux"

import { dicitValue } from "../utils/aiManagment"

import useDictionary from "../utils/useDictionary";
import { useState } from "react";
import DictLangSetting from "./DictLangSetting";
import DictiResponseApi from "./DictiResponseApi";

import sendData from "../utils/sendData";
import { sendDataMail } from "../utils/ErrorSlice";
import ShowMessageKey from "./ShowMessageKey";
import { SendFill, X } from "react-bootstrap-icons"
import useSupportLang from "../utils/useSupportLang";

const DictionaryText=({styles})=>{

  


const{showPdf6,gpt1,dict1,dict2,dict3,dict4,log2,send1} = langugesConstant[useSupportLang()]
    const dispatch=useDispatch()
    //way to check whether using default key or not
    const selectingDictkeyVaues=useSelector((store)=>store.userskey?.KeyDICT?.msg)
    //passing it so that when user mount on other component it does not call api unnecssary
    //slectdic is value when useris on dict component otherwise null
    const selectDic=useSelector((store)=>store.aiManage.Dictionary)
    const [dataApi,setApiData] =useState(null)
  
   let sourceLang= localStorage.getItem("sourceLangDict")
   let targetLang=localStorage.getItem("TargetLangDict")
   
   const [toogleLang ,setToogleLang]=useState(false)
   
   

   const selectSendDataMsg=useSelector((store)=>store.ErrorSliced.sendDataMsg)
   const selectUserEmail=useSelector((store)=>store.userInformation.value?.email)
   const selectDictAllDataTosendEmail=useSelector((store)=>store.useDataSlice.dictiDataTosendMail)
   useDictionary(selectDic,setApiData,sourceLang,targetLang)

  function sendDataToUser(){
   sendData("DictionarySearch-of-all-data-right-now-seesion", selectDictAllDataTosendEmail,selectUserEmail,dispatch,sendDataMail,log2,send1)
     }
    
 
    return(
        <>
<ShowMessageKey keyAvail={selectingDictkeyVaues}/>
        <div className="mt-1 ">

 {selectSendDataMsg&&<div className="text-center text-md text-green-700 z-[2000] font-bold top-0 fixed  w-full bg-black m-auto select-none">{selectSendDataMsg }<button className='bg-white text-black p-2 rounded-md  m-1 text-sm' onClick={()=>dispatch(sendDataMail(null))}>{showPdf6}</button></div>}
  </div>
        <div className=" bg-[#252b33] shadow-lg   fixed  right-0 z-50 p-1" style={styles} >
          
<div className="overflow-scroll  h-96" >
  <div className="flex flex-row ">
             <button className=" text-red-600 hover:bg-[#8a60f6] bg-white transition-all duration-500  p-1 rounded-sm m-1" onClick={()=>{dispatch(dicitValue(false))}}><X size={24}/></button>
       { selectDictAllDataTosendEmail.length && <div onClick={()=>sendDataToUser()} className="hover:cursor-pointer rounded-lg text-white p-1 m-2  hover:bg-black parenti transition-all duration-500"><SendFill/> <p className=" showel transition-all duration-1000  rounded-md absolute top-[40px]  bg-gray-700 p-2 z-[60] w-[600px]  left-0 text-xs"> {gpt1}</p></div>}
        <p className="font-semibold text-sm p-1 rounded-lg m-1 text-white">{dict3}</p>
      </div>

    
<div className="flex flex-row border-b-black border pb-1 text-white">
        <div className="parent cursor-pointer font-semibold text-xs sm:text-sm p-1 m-1 text-white">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 p-1 z-[60]">{dict1}</p></div>
       
       <div className="parent cursor-pointer p-1 m-1 font-semibold text-xs sm:text-sm  text-white">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700 left-1 p-1 w-2/3">{dict2}</p></div>
 <button className="bg-black text-xs hover:bg-red-500 text-white p-1 mt-2 px-2 rounded-lg" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":<>{dict4}</>}</button>
      
</div>



{<DictiResponseApi data={dataApi} /> }





</div>
     </div>    
       
       <div className="  ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} localSource={"sourceLangDict"} localTarget={"TargetLangDict"} />:''}</div>
</div>




</>
       
       
    )
}
export default DictionaryText