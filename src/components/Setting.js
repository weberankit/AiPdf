import { getDatabase, ref, set , onValue } from "firebase/database";
import Header from "./Header";
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { infoUser } from "../utils/userSlice";
import { useEffect ,useState} from "react";
import { callUserInfoOnRefresh } from "../utils/hooksHelper";
import useKeyUpdate from "../utils/useKeyUpdate";
import { readToggle } from "../utils/aiManagment";
import { KEYDICT,KEYGPT,KEYLANG } from "../utils/userKey";
import useStatusCheck from "../utils/useStatusCheck";
const Setting=()=>{
     const navigate=useNavigate() 
     const dispatch=useDispatch()
     const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
//for refreshing user credintals
useEffect(()=>{
    callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser)
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
       {selectUsrDetail?.uid && <div>
    
        <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
        <input  placeholder="Gpt Key" value={gpts} onChange={(e)=>setgpts(e.target.value)} required></input>
        <button onClick={()=>{ handlekeyUpdation(selectUsrDetail?.uid,"gpt",gpts) ;  setgpts("") }}>save</button>
       </form>
        
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
       <input placeholder="dictionary key" value={dicts} onChange={(e)=>setdicts(e.target.value)}required ></input>
       <button  onClick={(e)=>{handlekeyUpdation(selectUsrDetail?.uid,"dict",dicts) ; setdicts("")}}>save</button>
       </form>
       <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
        <div className="relative">
        <div className="parent cursor-pointer"><em className="hover:text-blue-950"> not allowed to update translate key</em> <p className="element absolute top-[-15px] bg-gray-700 ">we are using free api so not allow but further we might be</p></div>
       <input className="hover:cursor-not-allowed" placeholder="Translate key"  value={trans} onChange={(e)=>settrans(e.target.value)} r></input>
       <button className="hover:cursor-not-allowed" onClick={(e)=>{/*handlekeyUpdation(selectUsrDetail?.uid,"trans",trans) ; settrans("")*/}}>{/*save*/}</button>
       </div>
 </form>
      

<div>

{/*selectDICTValues?.dict  ?"using default":"thudd"*/}



</div>


       </div>}


       <div className="flex flex-col"> 
       <p>
       {(selectingAllkeyVaues?.keyGPT?.msg) ?  "using Default key"  : `using Your GPT Key ${selectingAllkeyVaues?.keyGPT?.gpt}` }
</p>
<p>
{(selectingAllkeyVaues?.KeyDICT?.msg) ? "using Default key"  : `using Your Dictionary Key ${selectingAllkeyVaues?.KeyDICT?.dict}`}
</p>
<p>
{(selectingAllkeyVaues?.KeyLANG?.msg) ? "using Default key"  : `not using Key ${selectingAllkeyVaues?.KeyLANG?.trans}`}
  </p>
       </div>
        </>
    )
} 
export default Setting