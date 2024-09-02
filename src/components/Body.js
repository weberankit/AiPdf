import { useState, useEffect ,useContext} from "react";
//import Sign from "./Sign"
import {onAuthStateChanged ,getAuth, prodErrorMap} from "firebase/auth"
//import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { infoUser ,loadingState} from "../utils/userSlice";
//import Header from "./Header";
import {useSelector} from "react-redux"
import { useNavigate,Outlet,useLocation } from "react-router-dom";
//import UploadFiles from "./UploadFiles";
import Footer from "./Footer";

import { contextSpinLogin } from "../utils/helper";

import InitialPage from "./InitialPage";
//import { contextSpinLogin } from "../utils/helper";
 
const Body=()=>{

    const dispatch=useDispatch()
   const [user , setUser] = useState(true) 
   const selector=useSelector((store)=>store.userInformation.value)
   const selectLoadingValue=useSelector((store)=>store.userInformation.preLoading)
 
  const useContextSpin=useContext(contextSpinLogin)
const{spin,setSpin} = useContextSpin
//console.log(spin.spin,"this is spin,",setSpin)
    const auth = getAuth();
   const navigate=useNavigate()
   
useEffect(()=>{

  const loginApi= onAuthStateChanged(auth, (user) => {
 setSpin(true)
  // console.log(spin,"this is checking")
        if (user?.emailVerified) {
        
        
          const {uid ,email,displayName,photoURL} = user;
        

         dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
         setUser(false)
         dispatch(loadingState(null))
       

    


     navigate("/")


          // ...
        } else {
         setSpin(false)
          // User is signed out
          // ...
            //navigate("/")
         //   console.log(spin,"this is false value")
       //  setSpin(false)
        }
      });
      return ()=>loginApi()

},[])



//console.log(Math.random())

    return(

      <div className="">
        <div className="">
    

    <div>
      <div>
   {
     <InitialPage />
   }
</div>






    </div>
    <div className="bg-green-500  text-xs">{selectLoadingValue===true?"logging will be start... if you used email login must verified first and if you have already done wait..":""}</div>




        </div>
        <Footer/>
       
        </div>
    )
}
export default Body