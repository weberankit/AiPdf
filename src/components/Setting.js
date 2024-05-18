import {langugesConstant} from "../utils/langugesConstant"

import { getDatabase, ref, set , onValue } from "firebase/database";
import Header from "./Header";
import {useNavigate,Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { infoUser } from "../utils/userSlice";
import { useEffect ,useState} from "react";
import { callUserInfoOnRefresh } from "../utils/hooksHelper";
import useKeyUpdate from "../utils/useKeyUpdate";
import { readToggle } from "../utils/aiManagment";
import { KEYDICT,KEYGPT,KEYLANG } from "../utils/userKey";
import useStatusCheck from "../utils/useStatusCheck";
import { translateValue,dicitValue,gptValue } from "../utils/aiManagment";
import { addToogleNav } from "../utils/useStoreDataSlice";
import Heading from "./Heading";
import useSupportLang from "../utils/useSupportLang";
const Setting=()=>{
  const {setting1,setting2,setting3,setting4,setting5,setting6,setting7,setting8,setting9,setting10,setting11,setting12,setting13,setting14,setting15,setting16,setting17,setting18,setting19,setting20} = langugesConstant[useSupportLang()]


     const navigate=useNavigate() 
     const dispatch=useDispatch()
     const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)
     const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
     //preventing from nwanted call of api when user reuses any 3 features
     //so basically closing component when user move to other page
     dispatch(translateValue(false))
     dispatch(dicitValue(false))
     dispatch(gptValue(false))
const [msg,SetMsg]=useState()

//for refreshing user credintals
useEffect(()=>{
    callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser , SetMsg)
    dispatch(addToogleNav())
},[])
//to get input from key
const[gpts,setgpts]=useState(null)
const[dicts,setdicts]=useState(null)
const[trans,settrans]=useState(null)



//using toggle when user click save keys button as to invode readkey for displaying keys
const readDataToggle=useSelector((store)=>store.aiManage?.readDataToggle)
//passing details to invoke read key
useKeyUpdate(selectUsrDetail?.uid,readDataToggle)
//using it for showing beolw the key status
const selectingAllkeyVaues=useSelector((store)=>store.userskey)

//if no value is used then passing default key value
//calling it again so when user directly visit page http://.../setting then it invoke also to sheck status
useStatusCheck() 
      // Call the functions to write the keys to the database
      function handlekeyUpdation(userId,fireBasekeyName,UserKeyInputValue){
        // console.log(userId," ", fireBasekeyName," " , UserKeyInputValue.length)
      
       if (!UserKeyInputValue?.trim()) {
        
        alert("Please provide input");
        return;
      }else{
            const db = getDatabase();
           // console.log(db)
        const a=    set(ref(db, `${userId}/${fireBasekeyName}`), {
         /*     gpt: gptKey,
              dict:dictiKey,
              trans:translateKey*/
              [fireBasekeyName]: UserKeyInputValue?.trim() 
            });
    
        //   console.log(a,"kk")
          
         dispatch(readToggle(false))
          }
      }

      useEffect(()=>{
        if(selectDarkToogle){
          document.body.style.backgroundColor = "#242a33"
         
        }else{
          document.body.style.backgroundColor = "white"
        }
      },[selectDarkToogle])
    
    
    return(
        <>
        <Heading/>

<div className="pt-40 p-2">
  <div>
    <div className="bg-gray-100 shadow-lg  p-4 rounded-lg font-serif md:w-3/5 md:m-auto">
<h1 className="font-semibold text-sm p-1">{setting1}
 <em className="font-bold text-black p-1 rounded-sm "> {setting2}</em>

</h1>
<div className="font-bold text-sm p-1">{setting3}
</div>
</div>
</div>
<div className="font-semibold p-1 mt-6 text-center"> <em className=" font-serif p-1 rounded-md bg-yellow-600">{setting4}</em> </div>
<div className="text-sm mt-2  p-2 rounded-md text-center "> <Link to={"/aiKey"} ><button  className="hover:bg-white hover:text-black transition-all duration-500 font-bold text-sm bg-[#8a60f6] p-2 rounded-lg ml-1 m-2 md:m-1">{setting6}</button></Link> 
<Link to={"/dictKey"}><button className="font-bold text-sm bg-[#8a60f6] p-2 rounded-lg ml-1 m-2 md:m-1 hover:bg-white hover:text-black transition-all duration-500" >{setting5}</button></Link>
</div>

<div className="text-sm font-semibold m-1 p-2 text-center"> {setting7} <a href="mailto:impmessageweb@gmail.com" target="_blank" rel="noopener noreferrer"><button className="p-2 rounded-lg bg-black text-white hover:bg-yellow-400 text-xs">{setting8}   </button></a>  
       </div>

</div>

<div className="flex flex-col md:flex-row w-full justify-around pt-16 p-6">


       {selectUsrDetail?.uid && <div className="text-center p-5">
        <p className="font-bold p-2 m-1">{setting9}</p>
        <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
       <div className="flex flex-wrap md:flex-row justify-center m-1">
        <input className="border border-black w-72 text-black p-2 rounded-xl"  placeholder={setting11} value={gpts} onChange={(e)=>setgpts(e.target.value)} ></input>
        <button className="ml-2 p-2 bg-orange-500 rounded-md text-white hover:bg-black m-2 md:m-1" onClick={()=>{ handlekeyUpdation(selectUsrDetail?.uid,"gpt",gpts) ;  setgpts("") }}>{setting13}</button>
     
       </div>
       </form>
        
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
       <div className="flex flex-wrap md:flex-row justify-center m-1">
       <input  className="border border-black w-72 text-black p-2  rounded-xl"  placeholder={setting10} value={dicts} onChange={(e)=>setdicts(e.target.value)} ></input>
       <button className="ml-2 p-2 bg-orange-500 rounded-md text-white hover:bg-black m-2 md:m-1" onClick={(e)=>{handlekeyUpdation(selectUsrDetail?.uid,"dict",dicts) ; setdicts("")}}>{setting13}</button>
       
       </div>
       </form>
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
        <div className="relative">
        <div className="parent cursor-pointer"><em className="hover:text-blue-950">{setting12}</em> <p className="element absolute top-[-22px] bg-gray-700 text-sm">we are using free api for translate features so not need but further  might be</p></div>
       <input className="hover:cursor-not-allowed rounded-xl" placeholder="Translate key"  value={trans} onChange={(e)=>settrans(e.target.value)} ></input>
       <button className="hover:cursor-not-allowed" onClick={(e)=>{/*handlekeyUpdation(selectUsrDetail?.uid,"trans",trans) ; settrans("")*/}}>{/*save*/}</button>
       </div>
 </form>
      

<div>

{/*selectDICTValues?.dict  ?"using default":"thudd"*/}



</div>


       </div>}


       

       <div className="flex flex-col text-center p-5 "> 
       <p className="font-bold p-2 m-1">{setting14}</p>
       <p className="p-1  bg-black text-white rounded-md ">
       {(selectingAllkeyVaues?.keyGPT?.msg) ?  <>{setting15}</> : `${setting16}:  ${selectingAllkeyVaues?.keyGPT?.gpt}` }
</p>
<p className="p-1  bg-black text-white rounded-md m-1">
{(selectingAllkeyVaues?.KeyDICT?.msg) ? <>{setting18}</>  : `${setting17}:  ${selectingAllkeyVaues?.KeyDICT?.dict}`}
</p>
<p className="p-1  bg-black text-white rounded-md inline-block m-1">
{(selectingAllkeyVaues?.KeyLANG?.msg) ? <>{setting20}</>  : `${setting19} ${selectingAllkeyVaues?.KeyLANG?.trans}`}
  </p>
       </div>



</div>

{msg}


        </>
    )
} 
export default Setting