import {langugesConstant} from "../utils/langugesConstant"

import {useDispatch,useSelector} from "react-redux"
import { translateValue } from "../utils/aiManagment"
import useTranslate from "../utils/useTranslate"
import DictLangSetting from "./DictLangSetting"
import { useState } from "react"
import TranslateResponse from "./TranslateResponse"
import {Link} from "react-router-dom"
import { toggleForApi } from "../utils/userKey"
import {  X } from "react-bootstrap-icons"
import useSupportLang from "../utils/useSupportLang"

const TranslateText=({styles})=>{
  const{trans1,dict1,dict2,dict4} = langugesConstant[useSupportLang()]

const dispatch=useDispatch()

  //passing it so that when user mount on other component it does not call api unnecssary
  const selectTrans=useSelector((store)=>store.aiManage.Translate)

  const [toogleLang ,setToogleLang]=useState(false)
 let sourceLang= localStorage.getItem("sourceLangTrans")
 let targetLang=localStorage.getItem("TargetLangTrans")
 //const selectingTrankeyVaues=useSelector((store)=>store.userskey?.KeyLANG?.msg)
useTranslate(selectTrans,sourceLang,targetLang)

    return(

        <>
         {/*(selectingTrankeyVaues) ?  <div className="bg-red-600 p-1">please use  your own  translate key api might be 
  expired ,just follow the step provided in setting very easy step as your api is accessible by you not by other users
    click  <Link to={"/setting"} >setting</Link> </div> : "" */}
        <div className=" bg-[#252b33] shadow-lg  text-white  fixed right-0 z-50 pt-2" style={styles}>
      
 <div className="overflow-scroll  h-72">

<div className="flex flex-row">
  <button className=" text-red-600 hover:bg-[#8a60f6] bg-white transition-all duration-500  p-1 rounded-sm m-1"  onClick={()=>{dispatch(translateValue(false))}}><X size={24}/></button>
        <p className="m-1 p-1 text-sm text-white">{trans1}</p>
</div>

       
<div className="flex flex-row border-b-black border pb-1">
       <div className="parent cursor-pointer p-1 m-1 text-white text-xs sm:text-sm">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 text-white left-0 p-1 rounded-md">{dict1}</p></div>
 <div className="parent cursor-pointer p-1 m-1 text-white text-xs sm:text-sm">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700 text-white left-0 p-1 w-2/3 rounded-md">{dict2}</p></div>
 <button className="bg-black text-xs hover:bg-red-500 text-white p-1 mt-2 px-2  rounded-lg" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":<>{dict4}</>}</button>
 </div>



<div className="mt-1 p-[10px]">
     <TranslateResponse/> 
      </div>
      </div>
      
        </div>
  
        <div className="   bg-black text-white ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} localSource={"sourceLangTrans"} localTarget={"TargetLangTrans"} />:''}</div>
</div>


</>
    )
}
export default TranslateText