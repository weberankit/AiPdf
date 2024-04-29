import { useRef,useState } from "react"
import { getAuth, createUserWithEmailAndPassword ,updateProfile , signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { firebaseConfig } from "../utils/firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDispatch } from "react-redux";
import { infoUser,loadingState } from "../utils/userSlice";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Validate from "./Validate";
//import { Link } from "react-router-dom";
//import {use}
const Sign=()=>{
    const dispatch=useDispatch()
    const auth = getAuth();
const [isLogin, setLogin]=useState(false)
 const [errorMsg, setErrorMsg] = useState("")
const email=useRef(null)
const password=useRef(null)
const fullName=useRef(null)
const [toogle,setToogle] =useState(false)

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

createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
.then((userCredential) => {
// Signed up 
const user = userCredential.user;
//console.log(user,"usrs")

updateProfile(auth.currentUser, {
   
    displayName: fullName.current.value
  }).then(() => {
    // Profile updated!
    // ...
     //const {displayName} = auth.currentUser;
     //console.log(displayName)
    // console.log("Profile updated:", auth.currentUser.displayName);
     const {uid ,email,displayName} = auth.currentUser;
    dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
  }).catch((error) => {
    // An error occurred
    // ...
    dispatch(loadingState(false))
    console.log(error,"this is error")
    setErrorMsg("Error:please check login credintials")
  });


})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
//setErrorMsg(error)
// ..
dispatch(loadingState(false))
setErrorMsg("Error:please check login credintials")

});
}else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(loadingState(false))
      setErrorMsg("Error:please check login credintials")
    });
}



}

const handleLoginGoogle=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
  
    }).catch((error) => {
     
      const errorMessage = error.message;
    
      setErrorMsg("Error:please check login credintials")
    });
}




function scrollToElement(id){
  const element=document.getElementById(id)
 element.scrollIntoView({ behavior: 'smooth' })


}

const fileSlide=['<img src="upload.svg" alt="file image"></img>' ]

 return(
<>
<div className=" bg-black  border-b-white mt-0 p-3 text-sm font-bold fixed w-full block text-white">To upload a PDF, it is important to provide your email so that we can save your PDF with your email ID. 
This way, you can access it from any device using the same email ID  <button id="signInButton" className={'bg-red-700 text-white hover:bg-black font-bold p-2 rounded-md  ' } onClick={()=>scrollToElement("signin")}>signIn ⬇</button></div>
  <div className="">
  <div className="flex flex-col" >

<div className="p-10 flex flex-row">
<div className="p-4 w-1/2 mt-10 text-sm flex flex-col">
<h1 className=" text-9xl text-red-600  p-5  italic pb-7">  AiPDF</h1>

  <div className="p-2 rounded-lg mb-1 inline-block text-white text-3xl ">👩<em className="text-xs bg-black p-2 rounded-lg">What makes this PDF reader unique?</em></div>
  <div className="text-white rounded-lg ml-14 inline-block text-4xl m-1">👲<em className="boxShadow text-xs bg-white text-black font-bold rounded-lg p-2">In this PDF reader, it provides text summarization.</em></div>
<button className="font-bold text-black p-2 m-1 block" onClick={()=>setToogle(!toogle)}>{toogle?"Hide":"show more"}</button>
 { toogle &&<>
  <p className="p-2 rounded-lg mb-1 inline-block text-white text-3xl">👩 <em className="text-xs bg-black p-2 rounded-lg">How is that possible? I feel foolish.</em></p>
  <p className="text-white rounded-lg ml-14 inline-block text-4xl m-1">👲<em className="boxShadow text-xs bg-white text-black font-bold rounded-lg p-2 ">Let me explain. For example, if you're stuck on any line or paragraph, you can get a summary directly. Moreover, you can ask deeper questions using Gemini AI.</em></p>
  <p className="p-2 rounded-lg mb-1 inline-block text-white text-3xl">👩<em className="text-xs bg-black p-2 rounded-lg">Do you have any other features?</em></p>
  <p className="text-white p-2 rounded-lg ml-14 inline-block text-4xl m-1">👲 <em className=" boxShadow text-xs bg-white text-black font-bold rounded-lg p-2" >Yes, you can search for word meanings in different languages, and you can also convert text into different languages.</em></p>
  <p className="text-white p-2 rounded-lg ml-14 inline-block text-4xl m-1">👲 <em className="text-xs bg-white text-black font-bold rounded-lg p-2" >You can try it out first and then decide .</em></p>
 </>
 }
</div>



<div className="p-4  mt-10  w-1/2 float-right ">
<div className="w-[400px] text-center float-right">
 
<img src={"upload.svg"} alt="svg-image-file"></img>
 

</div>
</div>

</div>

<h1  className="text-center font-bold text-black p-2 pb-0">SIGN IN </h1>
<p className="text-center font-bold text-red-700 p-1 ">{errorMsg}</p>
<div className="flex justify-center mt-12 mb-12  " id="signin">

<form onSubmit={(e)=>e.preventDefault()}>
  
<div className="flex flex-col  p-4  ">
{isLogin && <input className="w-64  m-2 border border-black rounded-md p-2" type="name" ref={fullName} placeholder="name"></input>} 
 <input ref={email} className="w-64 rounded-md m-2 border border-black p-2" type="email" placeholder="Email id"></input>
 <input type="password" className="w-64 rounded-md m-2 border border-black p-2" ref={password} placeholder="password"></input>
 </div>
 <div className="flex flex-row  justify-between ">
 <button className="m-1 bg-black p-2 rounded-md hover:text-black hover:bg-yellow-500 text-white h-11" onClick={handleForm} >{isLogin?"Signup":"SignIn"}</button>
 {
<p className="m-1 bg-black p-2 rounded-md text-white hover:bg-yellow-500 hover:text-black h-11 w-48" onClick={handleSignin}>{!isLogin?"New User":"already User"}</p>
}
</div>
</form>
<div className="bg-red-700 p-2 rounded-md text-white hover:bg-yellow-500 hover:text-black  w-36 h-14 mt-8 text-center pt-4" onClick={handleLoginGoogle}>login with Google </div>


</div>



</div>
</div>
</>

 )
}
export default Sign
