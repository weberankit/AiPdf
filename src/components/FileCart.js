import {getStorage ,ref,listAll,getMetadata } from "firebase/storage"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
//import Header from "./Header"
import { useNavigate ,useLocation} from "react-router-dom"
//import {onAuthStateChanged ,getAuth} from "firebase/auth"
import FileDisplay from "./FileDisplay"
//import { UseDispatch } from "react-redux"
import { addFile } from "../utils/userFiles"
import { callUserInfoOnRefresh } from "../utils/hooksHelper"
import { call } from "../utils/hooksHelper"
import { infoUser } from "../utils/userSlice"
//import {KEYLANG ,KEYGPT,KEYDICT} from "../utils/userKey"
import useKeyUpdate from "../utils/useKeyUpdate"
import useStatusCheck from "../utils/useStatusCheck"
import { fireBaseErr } from "../utils/ErrorSlice"
import Heading from "./Heading"
import { addToogleNav } from "../utils/useStoreDataSlice"
import useBodybgDark from "../utils/useBodybgDark"
const FileCart=()=>{
  const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)
  const dispatch=useDispatch()
  const selectToggle=useSelector((store)=>store.fileInformation.toogle)
  console.log(selectToggle)
const navigate=useNavigate()
const storage = getStorage();
const [msg,SetMsg] =useState(null)
const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
//using two state for error check in firebase one is msg and other is selectfirebaseerror
//beacuse of refresh of page calling another function so there we can use setInterval to setMsg
//it might be rerender the setMsg many times so using another redux state so it will not rerender the whole component
const selectErrorFireBase=useSelector((store)=>store.ErrorSliced.firebaseError)
//using toggle when user click save keys button as to invode readkey for displaying keys
const readDataToggle=useSelector((store)=>store.aiManage?.readDataToggle)


//callinf function inside and updating id of user from null to user sign firebase uid
//so that when user refresh direct pag of cart it able to see the basic info about pagei.e saved pdf
// i can also provide user name on refressh of page but that is not necessayry dude hahaha
useEffect(()=>{
//alert("ll")  
//-earlier- callUserInfoOnRefresh(navigate,selectUsrDetail,setUserInfo)
callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser,SetMsg,fireBaseErr)
dispatch(addToogleNav(false))

},[])
//calling for updating api key fromfirebase
useKeyUpdate(selectUsrDetail?.uid,readDataToggle)
//checking status of key if not avail use default
useStatusCheck()




//const directoryPath = `path/to/${updateUserInfoOnrefresh}`; // Adjust the path according to your storage structure
const directoryPath = `path/to/${selectUsrDetail?.uid}`; 

useEffect(()=>{
  //to get all files firebase path not files url and also if user refresh page  the calluserinfoonrefersh will be call which 
  //dispatch value userinfo and this will change selectuserdetail which is dependcies here so it will call the call
    call(storage,directoryPath,dispatch,addFile ,SetMsg,fireBaseErr)
},[selectUsrDetail?.uid])

///calling it as if something changed to uploaded files it will be updated so using  dependcies selectoogle
useEffect(()=>{
call(storage,directoryPath,dispatch,addFile , SetMsg,fireBaseErr)
},[selectToggle])

console.log(msg,"this is messaging")
//using as won small scrren size body anfd file backround both visible so to hide it
//made bg of body of smae colour of filecart box
useBodybgDark()

    return(
        <>
        <Heading/>
        <div className={`p-10 ${selectDarkToogle ? "darkMode " : "bg-white"}`}>
          <div>
<div className="mt-12">
        <FileDisplay />

      <div >  {msg && <div className="bg-black text-white p-3 text-center w-1/2 m-auto ">{msg }</div> }</div>
      <div >  {selectErrorFireBase  && <div className="bg-black text-white p-3 text-center w-1/2 m-auto ">{selectErrorFireBase}</div> }</div>
</div>
</div></div>
        </>
    ) 
}
export default FileCart