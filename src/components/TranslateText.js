import {useDispatch,useSelector} from "react-redux"
import { translateValue } from "../utils/aiManagment"
import useTranslate from "../utils/useTranslate"
import DictLangSetting from "./DictLangSetting"
import { useState } from "react"
import TranslateResponse from "./TranslateResponse"
import {Link} from "react-router-dom"
const TranslateText=({styles})=>{
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
        <div className="bg-black text-white  fixed right-0 z-45" style={styles}>
 <div className="overflow-scroll  h-72">
        <p>Translatefiles</p>


       <button onClick={()=>{dispatch(translateValue(false))}}>close</button>

       <div className="parent cursor-pointer">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 ">this is pdf languges</p></div>
 <div className="parent cursor-pointer">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700">this is pdf response languages</p></div>
 
<TranslateResponse/>

<button className="bg-red-400" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":'change lang'}</button>
      
      
      </div>
      
        </div>
  
        <div className="   bg-black text-white ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} localSource={"sourceLangTrans"} localTarget={"TargetLangTrans"} />:''}</div>
</div>


</>
    )
}
export default TranslateText