import {useDispatch,useSelector} from "react-redux"

import { dicitValue } from "../utils/aiManagment"
//import { useEffect } from "react"

import qs from 'qs';
import useDictionary from "../utils/useDictionary";
import { useState } from "react";
import DictLangSetting from "./DictLangSetting";
import DictiResponseApi from "./DictiResponseApi";
import { useRef } from "react";
import { OperationType } from "firebase/auth";
const DictionaryText=({styles})=>{
    const dispatch=useDispatch()

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
        <div className="bg-black text-white  fixed  right-0 z-45 " style={styles} >
<div className="overflow-scroll  h-96" >
             <button className="bg-gray-600" onClick={()=>{dispatch(dicitValue(false))}}>close</button>
        <p>dictionary file</p>
      

    

        <div className="parent cursor-pointer">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 ">this is pdf languges</p></div>
       <div className="parent cursor-pointer">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700">this is pdf response languages</p></div>


{<DictiResponseApi data={dataApi} /> }



<button className="bg-red-400" onClick={()=>setToogleLang(!toogleLang)}>{toogleLang===true?"close lang setting":'change lang'}</button>

</div>
     </div>    
       
       <div className="   bg-black text-white ">
       <div className="">  {toogleLang === true ?<DictLangSetting closeProp={()=>setToogleLang(!toogleLang)} localSource={"sourceLangDict"} localTarget={"TargetLangDict"} />:''}</div>
</div>




</>
       
       
    )
}
export default DictionaryText