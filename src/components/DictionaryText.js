import {useDispatch,useSelector} from "react-redux"

import { dicitValue } from "../utils/aiManagment"
//import { useEffect } from "react"

import qs from 'qs';
import useDictionary from "../utils/useDictionary";
import { useState } from "react";
import DictLangSetting from "./DictLangSetting";
import DictiResponseApi from "./DictiResponseApi";

const DictionaryText=()=>{
    const dispatch=useDispatch()

    //passing it so that when user mount on other component it does not call api unnecssary
    const selectDic=useSelector((store)=>store.aiManage.Dictionary)
    const [dataApi,setApiData] =useState(null)
   
   let sourceLang= localStorage.getItem("sourceLangDict")
   let targetLang=localStorage.getItem("TargetLangDict")
   /*
   if(!sourceLang){
    sourceLang='en'
   }
   if(!targetLang){
    targetLang='hi'
   }*/
   console.log(sourceLang)
   const [toogleLang ,setToogleLang]=useState(false)
useDictionary(selectDic,setApiData,sourceLang,targetLang)
console.log(dataApi)

    return(
        <>
        <div className="bg-black text-white  fixed right-0 z-50">
             <button className="bg-gray-600" onClick={()=>{dispatch(dicitValue(false))}}>close</button>
        <p>dictionary file</p>
       
        <div className="parent cursor-pointer">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 ">this is pdf languges</p></div>
       <div className="parent cursor-pointer">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700">this is pdf response languages</p></div>


{<DictiResponseApi data={dataApi} /> }



<button className="bg-red-400" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":'change lang'}</button>


 </div>
        
       
       <div className="   bg-black text-white ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} />:''}</div>
</div>
</>
       
       
    )
}
export default DictionaryText