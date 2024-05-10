import { useState, useEffect } from "react";
import Sign from "./Sign"
import {onAuthStateChanged ,getAuth} from "firebase/auth"
//import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { infoUser ,loadingState} from "../utils/userSlice";
import Header from "./Header";
import {useSelector} from "react-redux"
import { useNavigate,Outlet } from "react-router-dom";
import UploadFiles from "./UploadFiles";
import Footer from "./Footer";

const Body=()=>{

    const dispatch=useDispatch()
   const [user , setUser] = useState(true) 
   const selector=useSelector((store)=>store.userInformation.value)
   const selectLoadingValue=useSelector((store)=>store.userInformation.preLoading)
  console.log(selector)
  
    const auth = getAuth();
   const navigate=useNavigate()
useEffect(()=>{

  const loginApi= onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
         
         // const uid = user.uid;
          const {uid ,email,displayName,photoURL} = user;
         // console.log(user)

         dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
         setUser(false)
         dispatch(loadingState(null))
        
          // ...
        } else {
          // User is signed out
          // ...
            //navigate("/")
        }
      });
      return ()=>loginApi()

},[])


// <div className="bg-red-700  text-xs">{selectLoadingValue===true?"logging will be start... if you used email login must verified first and if you have already done wait..":""}</div>
    return(
        <>
         

        <div className="">
      
<div className=""><Header /></div>


    <div>
    {
      //here in classname hiding sign 
    }  
   {
   selector == null ?<div className="visible"><Sign/></div>  :<div className="hidden"><Sign/></div>
   }    
    </div>
    <div className="bg-green-500  text-xs">{selectLoadingValue===true?"logging will be start... if you used email login must verified first and if you have already done wait..":""}</div>




    <div className="pt-36 sm:pt-48 " >
      {
       selector !== null ? <><UploadFiles/></>:""
      }
    </div>

        </div>

        <Footer/>
        </>
    )
}
export default Body