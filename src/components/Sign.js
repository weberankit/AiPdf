import { useRef,useState,useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword ,updateProfile , signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { firebaseConfig } from "../utils/firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDispatch,useSelector } from "react-redux";
import { infoUser,loadingState } from "../utils/userSlice";
import {  signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import Validate from "./Validate";
//import { Link } from "react-router-dom";
//import {use}
import ResetEmailPassword from "./ResetEmailPassword"

import { loginMsg } from "../utils/ErrorSlice";
import { sendEmailVerification} from "firebase/auth";

import Footer from "./Footer";
const Sign=()=>{


const selectMsgLoginEmail=useSelector((store)=>store.ErrorSliced.loginEmailMsg)
console.log(selectMsgLoginEmail)
    const dispatch=useDispatch()
    const auth = getAuth();
    //intial-false
const [isLogin, setLogin]=useState(true)
 const [errorMsg, setErrorMsg] = useState("")
const email=useRef(null)
const password=useRef(null)
//const reEnter=useRef(null)
const fullName=useRef(null)
const [toogle,setToogle] =useState(false)
const [showForm,setForm]=useState(false)
const handleSignin=()=>{
    setLogin(!isLogin)
}



const handleForm=()=>{
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
const formCheck=  Validate( email.current.value, password.current.value)
//console.log(formCheck)
setErrorMsg(formCheck)
if(formCheck) return
if(!formCheck){
  dispatch(loadingState(true))
}console.log(errorMsg)
if(isLogin){
setErrorMsg("login start ...")
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
.then((userCredential) => {
// Signed up 
const user = userCredential.user;
//console.log(user,"usrs")
sendEmailVerification(user)
  .then(() => {
    // Email verification sent!
    // ...
  dispatch(loginMsg())
setErrorMsg("verify on your email")

updateProfile(auth.currentUser, {
   
    displayName: fullName.current.value
  }).then(() => {
    // Profile updated!
    // ...
     //const {displayName} = auth.currentUser;
     //console.log(displayName)
    // console.log("Profile updated:", auth.currentUser.displayName);
    console.log(user.emailVerified)
if(user.emailVerified === true){
  console.log(user.emailVerified,"inside")
     const {uid ,email,displayName} = auth.currentUser;
   //hide login msg after link click on page refresh 
   setErrorMsg(null)
     dispatch(loginMsg())
    dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
  }
  }).catch((error) => {
    // An error occurred
    // ...
    dispatch(loadingState(false))
    console.log(error,"this is error")
    setErrorMsg("Error:please check login credintials"+"  "+error)
  });
 



})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
//setErrorMsg(error)
// ..
dispatch(loadingState(false))
setErrorMsg("Error:please check login credintials"+" "+error)

})
}).catch((error)=>{
  console.log(error,"email error")
  dispatch(loadingState(false))
  setErrorMsg("Error:please check signup details "+" "+ error )
})



}else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    
    .then((userCredential) => {
      // Signed in 
      const user = userCredential?.user;
      // ...
     setErrorMsg("wait for a seconds, if you have used email/password login please first verify on email, ignore if already done")
      console.log("working")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(loadingState(false))
      setErrorMsg("Error:please check login credintials"+"  "+error)
    });
}


}






const handleLoginGoogle=()=>{
  setErrorMsg("Login Start....")
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
    setErrorMsg(null)
    }).catch((error) => {
     
     // const errorMessage = error.message;
    
    setErrorMsg(error+"please check something went wrong(please check your account in browser / otherwise Use email&password login)")
    });
}

 


function scrollToElement(id){
  const element=document.getElementById(id)
 element.scrollIntoView({ behavior: 'smooth' })


}
//here we send data for checking email not password as reset password so bypass paswword


const fileSlide=['<img src="upload.svg" alt="file image"></img>' ]
console.log(showForm)








 return(
<>

<div className=" bg-black  border-b-white  mt-0 p-3  w-auto  md:w-full text-sm font-bold fixed  block text-white pb-1 z-50">To upload a PDF, it is important to provide your email so that we can save your PDF with your email ID. 
This way, you can access it from any device using the same email ID  <button id="signInButton" className={'bg-red-700 text-white hover:bg-black font-bold p-2 rounded-md animate-pulse mt-1 md:mt-0 ' } onClick={()=>scrollToElement("signin")}>signIn ⬇</button></div>
  <div className="">
  <div className="flex flex-col" >

<div className="p-10 flex flex-col md:flex-row">
<div className="p-4 w-full md:w-1/2 mt-10 text-sm flex flex-col">
<h1 className=" text-6xl md:text-7xl  lg:text-9xl text-red-600 pt-20 md:pt-5 p-5  italic pb-7">  AiPDF</h1>

  <div className="p-2 rounded-lg mb-1 inline-block text-white text-xl md:text-3xl ">👩<em className="text-xs bg-black p-1 md:p-2 rounded-lg">What makes this PDF reader unique?</em></div>
  <div className="text-white rounded-lg ml-14 inline-block text-xl md:text-4xl m-1">👲<em className=" md:boxShadow text-xs bg-white text-black font-bold rounded-lg p-1 md:p-2">just select text ,it provides text summarization.its 100% free (no conditions applied) </em></div>
<button className="font-bold text-black p-1 md:p-2 m-1 block animate-pulse" onClick={()=>setToogle(!toogle)}>{toogle?"Hide":"show more"}</button>
 { toogle &&<>
  <p className="p-2 rounded-lg mb-1 inline-block text-white text-xl md:text-3xl">👩 <em className="text-xs bg-black p-1 md:p-2 rounded-lg">oh really! How is that possible? .</em></p>
  <p className="text-white rounded-lg ml-14 inline-block text-xl md:text-4xl m-1">👲<em className=" md:boxShadow text-xs bg-white text-black font-bold rounded-lg p-1 md:p-2 ">Let me explain. For example, if you're stuck on any line or paragraph, you can get a summary directly. Moreover, you can ask deeper questions using Gemini AI.</em></p>
  <p className="p-2 rounded-lg mb-1 inline-block text-white text-xl md:text-3xl">👩<em className="text-xs bg-black p-1 md:p-2 rounded-lg">Do you have any other features?</em></p>
  <p className="text-white p-2 rounded-lg ml-14 inline-block  text-xl md:text-4xl m-1">👲 <em className=" md:boxShadow text-xs bg-white text-black font-bold rounded-lg p-1 md:p-2" >Yes, you can search for word meanings in different languages, and you can also convert text into different languages.</em></p>
  <p className="text-white p-2 rounded-lg ml-14 inline-block text-xl md:text-4xl m-1">👲 <em className="text-xs bg-white text-black font-bold rounded-lg p-1 md:p-2" >You can try it out first and then decide .</em></p>
 </>
 }
</div>



<div className="p-4  mt-5 md:mt-10  w-1/2 float-right ">
<div className="w-[200px] md:w-[300px] lg:w-[400px] text-center md:float-right">
 
<img src={"upload.svg"} alt="svg-image-file"></img>
 

</div>
</div>

</div>

<h1  className="text-center font-bold text-black p-2 pb-0">SIGN IN  </h1>
<p className="text-center font-bold text-red-700 p-1 ">{errorMsg}</p>
<div className="flex flex-col md:flex-row justify-center mt-6 md:mt-12 mb-6 md:mb-12  " id="signin">
<form onSubmit={(e)=>e.preventDefault()}>
  
<div className="flex flex-col  p-4 relative">
 {selectMsgLoginEmail && <p className="bg-blue-800 p-1 text-center absolute left-0 right-0 text-white font-semibold  text-sm top-[-30px]  md:top-[-42px]  rounded-lg">check your email id & verify it and after that <a className="text-black" href="">click here</a> </p>}

{isLogin && <input className="w-64  md:m-2 border border-black rounded-md p-2 m-auto" type="name" ref={fullName} placeholder="name"></input>} 
 <input ref={email} className="w-64 rounded-md mt-1 mb-1 md:m-2 border border-black p-2 m-auto" type="email" placeholder="Email id"></input>
 { <input  className="w-64 rounded-md md:m-2 border border-black p-2 m-auto " ref={password}  placeholder="create password"></input>}
 { /*isLogin && <input  className="w-64 rounded-md md:m-2 border border-black p-2 m-auto " ref={reEnter}  placeholder="ReEnter password"></input>*/ }
 </div>
 <div className="flex flex-row  justify-center ">
 <button className="m-1 bg-black p-2 rounded-md hover:text-black hover:bg-yellow-500 text-white h-11" onClick={handleForm} >{isLogin?"SignUp":"Login"}</button>
 {
<p className="m-1 bg-white p-2 rounded-md text-black border border-black cursor-pointer  h-11 w-48 text-semibold" onClick={handleSignin}>{!isLogin?"New User":"already User"}</p>
}

</div>
{!isLogin&& <p className="text-center p-2 m-1 text-sm underline hover:cursor-pointer" onClick={()=>setForm(true)}>{"Forgot Password"} </p>}


</form>
<div className=" w-4 m-auto md:m-0 md:w-12  md:h-14 mt-7 md:mt-8  md:pt-4  text-center flex flex-row font-bold">or</div>
<div
 className="border cursor-pointer border-black p-2 rounded-md  bg-black text-white hover:bg-white hover:text-black text-xs sm:text-sm  sm:font-normal w-2/4  sm:w-2/5 m-auto md:m-0 md:w-48  md:h-14 mt-7 md:mt-8  md:pt-4  text-center flex flex-row "
  onClick={handleLoginGoogle}>
    
    <svg xmlns="http://www.w3.org/2000/svg"
     
    viewBox="0 0 48 48" className="w-8 " >
      <path fill="#FFC107"
       d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z">
        </path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg> <p className="ml-2 pt-1 text-sm sm:text-sm">continue with Google</p> </div>


</div>



</div>
</div>
{showForm && <div><ResetEmailPassword auths={auth} setForm={setForm}/></div>}
</>

 )
}
export default Sign
