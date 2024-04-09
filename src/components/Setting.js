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

//if no value is used then pass default key value
if(!selectingAllkeyVaues.keyGPT)dispatch(KEYGPT({gpt:"default",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyDICT)dispatch(KEYDICT({dict:"default",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyLANG)dispatch(KEYLANG({trans:"default",msg:"using default key"})); 

      // Call the functions to write the keys to the database
      function handlekeyUpdation(userId,fireBasekeyName,UserKeyInputValue){
        // console.log(userId," ", fireBasekeyName," " , UserKeyInputValue)
       
            const db = getDatabase();
           // console.log(db)
        const a=    set(ref(db, `${userId}/${fireBasekeyName}`), {
         /*     gpt: gptKey,
              dict:dictiKey,
              trans:translateKey*/
              [fireBasekeyName]: UserKeyInputValue 
            });
    
        //   console.log(a,"kk")
          
         dispatch(readToggle())

      }
    
    return(
        <>
        <Header/>
       {selectUsrDetail?.uid && <div>
    
        <form onSubmit={(e)=>{e.preventDefault(); console.log(e.target.value)}}> 
        <input  placeholder="Gpt Key" value={gpts} onChange={(e)=>setgpts(e.target.value)} ></input>
        <button onClick={()=>{ handlekeyUpdation(selectUsrDetail?.uid,"gpt",gpts) ;  setgpts("") }}>save</button>
      
        
       
       <input placeholder="dictionary key" value={dicts} onChange={(e)=>setdicts(e.target.value)}></input>
       <button  onClick={(e)=>{handlekeyUpdation(selectUsrDetail?.uid,"dict",dicts) ; setdicts("")}}>save</button>

        
       <input placeholder="Translate key"  value={trans} onChange={(e)=>settrans(e.target.value)} ></input>
       <button onClick={(e)=>{handlekeyUpdation(selectUsrDetail?.uid,"trans",trans) ; settrans("")}}>save</button>
       </form>

<div>

{/*selectDICTValues?.dict  ?"using default":"thudd"*/}


<button>clcik</button>
</div>


       </div>}


       <div className="flex flex-col"> 
       <p>
       {(selectingAllkeyVaues?.keyGPT?.msg) ?  "using Default key"  : `using Your GPT Key ${selectingAllkeyVaues?.keyGPT?.gpt}` }
</p>
<p>
{(selectingAllkeyVaues?.KeyDICT?.msg) ? "using Default key"  : `using Your GPT Key ${selectingAllkeyVaues?.KeyDICT?.dict}`}
</p>
<p>
{(selectingAllkeyVaues?.KeyLANG?.msg) ? "using Default key"  : `using Your GPT Key ${selectingAllkeyVaues?.KeyLANG?.trans}`}
  </p>
       </div>
        </>
    )
} 
export default Setting