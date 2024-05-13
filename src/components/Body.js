import { useState, useEffect } from "react";
import Sign from "./Sign"
import {onAuthStateChanged ,getAuth} from "firebase/auth"
//import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { infoUser ,loadingState} from "../utils/userSlice";
import Header from "./Header";
import {useSelector} from "react-redux"
import { useNavigate,Outlet,useLocation } from "react-router-dom";
import UploadFiles from "./UploadFiles";
import Footer from "./Footer";
import Joyride from 'react-joyride'; // Import Joyride


import tourSteps from "../utils/tourSteps"
 
const Body=()=>{
   

    const dispatch=useDispatch()
   const [user , setUser] = useState(true) 
   const selector=useSelector((store)=>store.userInformation.value)
   const selectLoadingValue=useSelector((store)=>store.userInformation.preLoading)
  //console.log(selector)
  
    const auth = getAuth();
   const navigate=useNavigate()
   const [onBoardStep , setOnBoardSteps]= useState(false)
useEffect(()=>{

  const loginApi= onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
         
         // const uid = user.uid;
          const {uid ,email,displayName,photoURL} = user;
         // console.log(user)

         dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
         setUser(false)
         dispatch(loadingState(null))
       

          // Check if the tour has been completed before
    const tourCompleted = localStorage.getItem('tourCompleted');
   if (!tourCompleted) {
      // If the tour hasn't been completed before, show the tour
      setOnBoardSteps(true)
    
        }
          // ...
        } else {
          // User is signed out
          // ...
            //navigate("/")
        }
      });
      return ()=>loginApi()

},[])

const handleTourComplete = () => {
  // Set a flag in local storage indicating that the tour has been completed
  localStorage.setItem('tourCompleted', 'true');
//  alert("j")
};



// <div className="bg-red-700  text-xs">{selectLoadingValue===true?"logging will be start... if you used email login must verified first and if you have already done wait..":""}</div>
    return(
        <div className="uploadBg">
          {onBoardStep  && <Joyride 
          steps={tourSteps} 
          continuous={true}
         //  showProgress={true}
            showSkipButton={true}
             run={onBoardStep}
             callback={handleTourComplete} // Set a callback to mark tour as completed
             
             />}

        <div className="">
      
<div ><Header stepClass={"step-2"} /></div>


    <div>
    {
      //here in classname hiding sign 
    }  
   {
   selector == null ?<div className="visible signBg"><Sign/></div>  :<div className="hidden"><Sign/></div>
   }    
    </div>
    <div className="bg-green-500  text-xs">{selectLoadingValue===true?"logging will be start... if you used email login must verified first and if you have already done wait..":""}</div>




    <div className="pt-36 sm:pt-48 " >
      {
       selector !== null ? <><UploadFiles step1stClass={"step-1"} stepThird={"step-3"}/></>:""
      }
    </div>

        </div>

        <Footer/>
        </div>
    )
}
export default Body