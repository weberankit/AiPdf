import {useDispatch,useSelector} from "react-redux"

import { dicitValue } from "../utils/aiManagment"
//import { useEffect } from "react"
import {Link} from "react-router-dom"
import qs from 'qs';
import useDictionary from "../utils/useDictionary";
import { useState } from "react";
import DictLangSetting from "./DictLangSetting";
import DictiResponseApi from "./DictiResponseApi";
import { useRef } from "react";
import { OperationType } from "firebase/auth";
const DictionaryText=({styles})=>{
    const dispatch=useDispatch()
    const selectingDictkeyVaues=useSelector((store)=>store.userskey?.KeyDICT?.msg)
    //passing it so that when user mount on other component it does not call api unnecssary
    //slectdic is value when useris on dict component otherwise null
    const selectDic=useSelector((store)=>store.aiManage.Dictionary)
    const [dataApi,setApiData] =useState(null)
  // let fontValue=useRef(18)
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
 // State variables for width, height, and text
 /*
 const [width, setWidth] = useState("auto");
 const [height, setHeight] = useState("auto");
 const handleSizeClick = (val,opeartor) => {
    // Increase the size by 20%
    setWidth(prevWidth =>( prevWidth * 1.2)/val);
    setHeight(prevHeight => (prevHeight * 1.2)/val);
    // Update the text
    
     fontValue.current=fontValue.current + 2 -opeartor
     console.log(fontValue.current)
  };
  const divStyle = {
    position: 'fixed',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'lightblue',
    fontSize:`${fontValue.current}px`,
    transition: 'all 0.3s ease'
  };*/
  
 
    return(
        <>
        <div className="mt-1 ">
 {(selectingDictkeyVaues) ?  <div className="bg-red-600 p-1 text-white text-center text-xs font-semibold m-auto mt-auto  w-1/2 ">Request:just visit here a very important info as api key can be expired <Link className="text-blue-800" to={"/setting"} >setting</Link> </div> : "" }
  </div>
        <div className="bg-black text-white  fixed  right-0 z-50 p-1" style={styles} >
<div className="overflow-scroll  h-96" >
  <div className="flex flex-row ">
             <button className="bg-black font-bold text-sm text-white p-1 rounded-lg m-1" onClick={()=>{dispatch(dicitValue(false))}}>close</button>
        <p className="font-semibold text-sm p-1 rounded-lg m-1 text-black">Dictionary file</p>
      </div>

    
<div className="flex flex-row border-b-black border pb-1">
        <div className="parent cursor-pointer font-semibold text-sm p-1 m-1 text-black">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 p-1 z-[60]">your pdf languges</p></div>
       
       <div className="parent cursor-pointer p-1 m-1 font-semibold text-sm  text-black">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700 left-1 p-1 w-2/3"> you want response in this languages</p></div>
 <button className="bg-black text-xs hover:bg-yellow-500 text-white p-1 mt-2 px-2 rounded-lg" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":'language'}</button>
      
</div>



{<DictiResponseApi data={dataApi} /> }





</div>
     </div>    
       
       <div className="   bg-black text-white ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} localSource={"sourceLangDict"} localTarget={"TargetLangDict"} />:''}</div>
</div>




</>
       
       
    )
}
export default DictionaryText