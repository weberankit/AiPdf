import {getStorage ,ref,listAll,getMetadata } from "firebase/storage"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import {onAuthStateChanged ,getAuth} from "firebase/auth"
import FileDisplay from "./FileDisplay"
import { UseDispatch } from "react-redux"
import { addFile, addFileMeta } from "../utils/userFiles"
import { callUserInfoOnRefresh } from "../utils/hooksHelper"
import { call } from "../utils/hooksHelper"
import { infoUser } from "../utils/userSlice"
const FileCart=()=>{
  const dispatch=useDispatch()
  const selectToggle=useSelector((store)=>store.fileInformation.toogle)
  console.log(selectToggle)
const navigate=useNavigate()
const storage = getStorage();
const [msg,SetMsg] =useState(null)
const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
//console.log(selectUsrDetail)
//const [updateUserInfoOnrefresh , setUserInfo]=useState(selectUsrDetail?.uid)
//const [filedata,setfileData]=useState("")
//callinf function inside and updating id of user from null to user sign firebase uid
//so that when user refresh direct pag of cart it able to see the basic info about pagei.e saved pdf
// i can also provide user name on refressh of page but that is not necessayry dude hahaha
useEffect(()=>{
//alert("ll")
//-earlier- callUserInfoOnRefresh(navigate,selectUsrDetail,setUserInfo)
callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser)
},[])


//const directoryPath = `path/to/${updateUserInfoOnrefresh}`; // Adjust the path according to your storage structure
const directoryPath = `path/to/${selectUsrDetail?.uid}`; // Adjust the path according to your storage structure

useEffect(()=>{

    call(storage,directoryPath,dispatch,addFile ,SetMsg)
},[selectUsrDetail?.uid])

useEffect(()=>{
call(storage,directoryPath,dispatch,addFile , SetMsg)
},[selectToggle])





    return(
        <>
        <Header/>
        lion is kingh

        <FileDisplay />

        {msg && msg}
        </>
    ) 
}
export default FileCart