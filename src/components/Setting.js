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
const Setting=()=>{
     const navigate=useNavigate() 
     const dispatch=useDispatch()
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
          
         dispatch(readToggle())
          }
      }
    
    return(
        <>
        <Header/>

<div className="p-6">
<h1 className="font-semibold text-sm p-1">I have built this with all my hard work, and this AiPdf is different from others please use it and provide your feedback .
 <em className="font-bold text-black p-1 rounded-sm "> here I am using free api key, which can be expire soon as used by many</em>

</h1>
<div className="font-bold text-sm p-1">you can generate your own  key by just 4-5 simple steps 
</div>

<div className="font-semibold p-1"> <em className="  p-1 rounded-md bg-yellow-600">one key you can use it for enough times</em> </div>
<div className="text-sm m-2  p-2 rounded-md">Go to <Link to={"/aiKey"} ><button className="font-bold text-sm bg-blue-500 p-2 rounded-lg ml-1 m-2 md:m-1">Learn to create Gemini  key</button></Link> 
<Link to={"/dictKey"}><button className="font-bold text-sm bg-blue-500 p-2 rounded-lg ml-1 m-2 md:m-1">Learn to create Dictionary key</button></Link>
</div>

<div className="text-sm font-semibold m-1 p-2"> If you face any difficulty for creating key <a href="mailto:impmessageweb@gmail.com" target="_blank" rel="noopener noreferrer"><button className="p-2 rounded-lg bg-black text-white hover:bg-yellow-400 text-xs">contact   </button></a>  
       </div>

</div>

<div className="flex flex-col md:flex-row w-full justify-around pt-16 p-6">


       {selectUsrDetail?.uid && <div className="text-center p-5">
        <p className="font-bold p-2 m-1">Here you have to paste your api key</p>
        <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
       <div className="flex flex-wrap md:flex-row justify-center m-1">
        <input className="border border-black w-72 text-black p-2"  placeholder="Gemini Ai Key" value={gpts} onChange={(e)=>setgpts(e.target.value)} ></input>
        <button className="ml-2 p-2 bg-orange-500 rounded-md text-white hover:bg-black m-2 md:m-1" onClick={()=>{ handlekeyUpdation(selectUsrDetail?.uid,"gpt",gpts) ;  setgpts("") }}>save</button>
     
       </div>
       </form>
        
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
       <div className="flex flex-wrap md:flex-row justify-center m-1">
       <input  className="border border-black w-72 text-black p-2"  placeholder=" dictionary key" value={dicts} onChange={(e)=>setdicts(e.target.value)} ></input>
       <button className="ml-2 p-2 bg-orange-500 rounded-md text-white hover:bg-black m-2 md:m-1" onClick={(e)=>{handlekeyUpdation(selectUsrDetail?.uid,"dict",dicts) ; setdicts("")}}>save</button>
       
       </div>
       </form>
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
        <div className="relative">
        <div className="parent cursor-pointer"><em className="hover:text-blue-950"> not need to update translate key</em> <p className="element absolute top-[-22px] bg-gray-700 text-sm">we are using free api for translate features so not need but further  might be</p></div>
       <input className="hover:cursor-not-allowed" placeholder="Translate key"  value={trans} onChange={(e)=>settrans(e.target.value)} ></input>
       <button className="hover:cursor-not-allowed" onClick={(e)=>{/*handlekeyUpdation(selectUsrDetail?.uid,"trans",trans) ; settrans("")*/}}>{/*save*/}</button>
       </div>
 </form>
      

<div>

{/*selectDICTValues?.dict  ?"using default":"thudd"*/}



</div>


       </div>}


       

       <div className="flex flex-col text-center p-5 "> 
       <p className="font-bold p-2 m-1">This is status of api key</p>
       <p className="p-1  bg-black text-white rounded-md ">
       {(selectingAllkeyVaues?.keyGPT?.msg) ?  "using Default Gemini key"  : `using Your GPT Key:  ${selectingAllkeyVaues?.keyGPT?.gpt}` }
</p>
<p className="p-1  bg-black text-white rounded-md m-1">
{(selectingAllkeyVaues?.KeyDICT?.msg) ? "using Default Dictionary key"  : `using Your Dictionary Key:  ${selectingAllkeyVaues?.KeyDICT?.dict}`}
</p>
<p className="p-1  bg-black text-white rounded-md inline-block m-1">
{(selectingAllkeyVaues?.KeyLANG?.msg) ? "no need"  : `not using Key ${selectingAllkeyVaues?.KeyLANG?.trans}`}
  </p>
       </div>



</div>

{msg}


        </>
    )
} 
export default Setting