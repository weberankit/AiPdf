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
import sendData from "../utils/sendData";
import { sendDataMail } from "../utils/ErrorSlice";
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
  // console.log(sourceLang)

   const [toogleLang ,setToogleLang]=useState(false)
   
   

   const selectSendDataMsg=useSelector((store)=>store.ErrorSliced.sendDataMsg)
   const selectUserEmail=useSelector((store)=>store.userInformation.value?.email)
   const selectDictAllDataTosendEmail=useSelector((store)=>store.useDataSlice.dictiDataTosendMail)
   useDictionary(selectDic,setApiData,sourceLang,targetLang)
//console.log(dataApi)
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
  function sendDataToUser(){
   sendData("DictionarySearch-of-all-data-right-now-seesion", selectDictAllDataTosendEmail,selectUserEmail,dispatch,sendDataMail)
     }
    
 
    return(
        <>

        <div className="mt-1 ">
 {(selectingDictkeyVaues) ?  <div className="bg-red-600 p-1 select-none text-white  text-center text-xs font-semibold m-auto mt-auto  w-1/2 ">Request:I have used free key which has limited use so for better exprience create your own free key steps-- <Link className="text-blue-800 font-bold " to={"/setting"} ><div className=" inline-block animate-bounce hover:animate-none">setting</div></Link> </div> : "" }
 {selectSendDataMsg&&<div className="text-center text-md text-green-700 z-[2000] font-bold top-0 fixed  w-full bg-black m-auto select-none">{selectSendDataMsg }<button className='bg-white text-black p-2 rounded-md  m-1 text-sm' onClick={()=>dispatch(sendDataMail(null))}>close</button></div>}
  </div>
        <div className="boxBg text-white  fixed  right-0 z-50 p-1" style={styles} >
          
<div className="overflow-scroll  h-96" >
  <div className="flex flex-row ">
             <button className="bg-black font-bold text-sm text-white p-1 rounded-lg m-1" onClick={()=>{dispatch(dicitValue(false))}}>close</button>
       { selectDictAllDataTosendEmail.length && <div onClick={()=>sendDataToUser()} className="hover:cursor-pointer bg-red-700 rounded-lg text-white p-1 m-1 text-sm hover:bg-black parent">send <p className="element absolute top-[40px]  bg-gray-700 p-2 z-[60] w-[600px]  left-0 text-xs"> send all  data  to your emailId</p></div>}
        <p className="font-semibold text-sm p-1 rounded-lg m-1 text-black">Dictionary</p>
      </div>

    
<div className="flex flex-row border-b-black border pb-1">
        <div className="parent cursor-pointer font-semibold text-xs sm:text-sm p-1 m-1 text-black">s-{ sourceLang?sourceLang:"english"} <p className="element absolute top-0 bg-gray-700 p-1 z-[60]">your pdf languges</p></div>
       
       <div className="parent cursor-pointer p-1 m-1 font-semibold text-xs sm:text-sm  text-black">R-{targetLang?targetLang:"hindi"} <p className="element absolute top-0 bg-gray-700 left-1 p-1 w-2/3">this will convert in this languages</p></div>
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