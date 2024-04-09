
import { getDatabase, ref , onValue } from "firebase/database";
import { useEffect} from "react";

import {useDispatch,useSelector} from "react-redux"

import { KEYDICT,KEYGPT,KEYLANG } from "./userKey";
const useKeyUpdate=(userId,readDataToggle)=>{
   const dispatch=useDispatch()
 
const db = getDatabase();
//getting all path for read key
    const userKeys = [
       ref(db, `${userId}/gpt`),
      ref(db, `${userId}/dict`),
      ref(db, `${userId}/trans`),
    ];

function readKey(Valt){

onValue(this, (snapshot) => {
  this.data = snapshot.val();

 console.log(this.data)
 dispatch(Valt(this.data))
return this
//
})
}



//using it for fetching all details from firebase
//used call method so that from single function we can invodeke multiple path details
  function ReadKey(){
   //both works--but function allso need to a/c to it
//const Gpt= new readGPTKey(userKeys[0],KEYGPT)

const dict=readKey.call(userKeys[1],KEYDICT)
const trans= readKey.call(userKeys[2],KEYLANG)
const Gpt=readKey.call(userKeys[0],KEYGPT)


  }


useEffect(()=>{
 
if(userId){

  ReadKey()
//writeKey()

}

},[readDataToggle])

/*to get the stored data from firebase when comp mount so that we can use on
 refresh of page */
useEffect(()=>{
 // console.log("jj")
//
if(userId){
//  console.log("uj")
  ReadKey()


}

},[userId])
    
}
export default useKeyUpdate 