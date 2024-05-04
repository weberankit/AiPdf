import {getStorage ,ref,listAll,getMetadata } from "firebase/storage"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Header from "./Header"
import { useNavigate ,useLocation} from "react-router-dom"
import {onAuthStateChanged ,getAuth} from "firebase/auth"
import FileDisplay from "./FileDisplay"
import { UseDispatch } from "react-redux"
import { addFile, addFileMeta } from "../utils/userFiles"
import { callUserInfoOnRefresh } from "../utils/hooksHelper"
import { call } from "../utils/hooksHelper"
import { infoUser } from "../utils/userSlice"
import {KEYLANG ,KEYGPT,KEYDICT} from "../utils/userKey"
import useKeyUpdate from "../utils/useKeyUpdate"
import useStatusCheck from "../utils/useStatusCheck"
import { fireBaseErr } from "../utils/ErrorSlice"
const FileCart=()=>{
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

//console.log(selectUsrDetail)
//const [updateUserInfoOnrefresh , setUserInfo]=useState(selectUsrDetail?.uid)
//const [filedata,setfileData]=useState("")
//callinf function inside and updating id of user from null to user sign firebase uid
//so that when user refresh direct pag of cart it able to see the basic info about pagei.e saved pdf
// i can also provide user name on refressh of page but that is not necessayry dude hahaha
useEffect(()=>{
//alert("ll")  
//-earlier- callUserInfoOnRefresh(navigate,selectUsrDetail,setUserInfo)
callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser,SetMsg,fireBaseErr)

},[])
//calling for updating api key fromfirebase
useKeyUpdate(selectUsrDetail?.uid,readDataToggle)
//checking status of key if not avail use default
useStatusCheck()




//const directoryPath = `path/to/${updateUserInfoOnrefresh}`; // Adjust the path according to your storage structure
const directoryPath = `path/to/${selectUsrDetail?.uid}`; // Adjust the path according to your storage structure

useEffect(()=>{

    call(storage,directoryPath,dispatch,addFile ,SetMsg,fireBaseErr)
},[selectUsrDetail?.uid])

useEffect(()=>{
call(storage,directoryPath,dispatch,addFile , SetMsg,fireBaseErr)
},[selectToggle])

console.log(msg,"this is messaging")



    return(
        <>
        <Header/>
        

        <FileDisplay />

      <div >  {msg && <div className="bg-black text-white p-3 text-center w-1/2 m-auto ">{msg }</div> }</div>
      <div >  {selectErrorFireBase  && <div className="bg-black text-white p-3 text-center w-1/2 m-auto ">{selectErrorFireBase}</div> }</div>
        </>
    ) 
}
export default FileCart