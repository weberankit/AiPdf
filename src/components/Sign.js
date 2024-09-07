import { langugesConstant } from "../utils/langugesConstant";
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
import {Link, useNavigate} from "react-router-dom"
import Footer from "./Footer";
import {useSignBgOnRefresh} from "../utils/useBodybgDark"
import useSupportLang from "../utils/useSupportLang";
const Sign=()=>{
  const {sign3,sign4,sign5,sign6,sign8,sign9,sign10,sign11,sign12,sign13,sign14,sign15,sign16,sign17} =langugesConstant[useSupportLang()]

  const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)

const selectMsgLoginEmail=useSelector((store)=>store.ErrorSliced.loginEmailMsg)
   //here  login page will be refresh when click on reset  as firebase  need to refresh after email address validation
   //so using the selecttoggleonclickreset for that 
const selectoggleOnclickOfReset=useSelector((store)=>store.ErrorSliced.restPasswordToogle)
console.log(selectoggleOnclickOfReset,selectMsgLoginEmail)
    const dispatch=useDispatch()
    const auth = getAuth();
    //intial-false
const [isLogin, setLogin]=useState(false) 
 const [errorMsg, setErrorMsg] = useState("")
const email=useRef(null)
const password=useRef(null)
//const reEnter=useRef(null)
const fullName=useRef(null)
const [toogle,setToogle] =useState(false)
const [showForm,setForm]=useState(false)
   //not using set error as it is in red colour so generally observer user panic on first
      //view so using setInform
const [informUser ,setInform] =useState(false)

const handleSignin=()=>{
    setLogin(!isLogin)
}
const navigate =useNavigate()


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
     //hide password
     setForm(true)
    dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
    navigate("/")
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
      console.log(user)
     setForm(true)
      //not using set error as it is in red colour so generally observer user panic on first
      //view so using setInform
     setErrorMsg(null)
     //only show messgae when user email is not verified or user data is logged in suggestim him for forgot password
     !selectoggleOnclickOfReset && setInform("THIS IS NOT A ERROR message JUST INFORMING YOU , wait for a second and if you have used email/password login please first verify on email, ignore if already done and If login not happening then it means  email is already used so please click on the Forgot Password  or simply use continue with google")
       
     //moving to body page for sigin aftr luser login by email
    
     user.emailVerified && navigate("/")
     
     //after click on rset password preloading effect uses
     selectoggleOnclickOfReset && setInform("wait...")
     //refersh page after click on reset btn as page need to be refresh as firebase needed it.
    
    selectoggleOnclickOfReset && window.location.reload() 
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
      navigate("/")
    setErrorMsg(null)
    }).catch((error) => {
     
     // const errorMessage = error.message;
    
    setErrorMsg(error+" " +"please check something went wrong(please check your account in browser / otherwise Use email&password login)")
    });
}

 


function scrollToElement(id){
  const element=document.getElementById(id)
// element.scrollIntoView({ behavior: 'smooth' ,block: 'start'})
//element.getBoundingClientRect().top with window.pageYOffset,  get the total vertical offset of the element
// from the top of the document.
 const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
 const scrollFactor = 1.5;
 window.scrollTo({ top: offsetTop/scrollFactor, behavior: 'smooth' });
}
//here we send data for checking email not password as reset password so bypass paswword


const fileSlide=['<img src="upload.svg" alt="file image"></img>' ]
//console.log(showForm)

//useBodybgDark()
//onrefeesg darkmode body bg changes to black using localstorage

useSignBgOnRefresh()


 return(
<>


  <div className={`${selectDarkToogle && 'darkMode text-white h-[2000px] fixed w-full pt-16'}`}>
   <div>   <Link to={"/"}>  <button className="bg-black p-2 m-2 text-base text-white rounded-lg left-0 top-0 absolute hover:bg-yellow-500">{sign3}</button></Link></div> 
  <div className="flex flex-col " >

<h1  className="text-center  text-black p-2 pb-0 text-xl font-extrabold "id="signin">{sign4}  </h1>
<p className="text-center font-bold text-red-700 p-1 ">{errorMsg}</p>
<p className="text-center font-bold text-green-500 text-sm  p-1 ">{informUser}</p>
<div className="flex flex-col md:flex-row justify-center mt-6 md:mt-12 mb-6 md:mb-12  " >
<form onSubmit={(e)=>e.preventDefault()}>
  
<div className="flex flex-col  p-4 relative">
 {selectMsgLoginEmail && <p className="bg-blue-800 p-1 text-center absolute left-0 right-0 text-white font-semibold  text-sm top-[-30px]  md:top-[-42px]  rounded-lg">{sign5} <a className="text-black" href="https://aipdf.ankitkr.in/">{sign6}</a></p>}

{isLogin && <input className="w-64  md:m-2 border border-black rounded-md p-2 m-auto text-black" type="name" name="username" ref={fullName} placeholder={sign8}></input>} 
 <input ref={email} className="w-64 rounded-md mt-1 mb-1 md:m-2 border border-black p-2 m-auto text-black" type="email" name="email" placeholder={sign9}></input>
 {<div className="w-64 m-auto border border-black rounded-md py-2 sm:py-0 bg-white text-black"> <input  className=" w-[14rem] md:w-[13rem]  md:m-2  m-auto outline-none" ref={password} type={showForm?"text":"password"} placeholder={sign10}></input> <span className="cursor-pointer" onClick={()=>setForm(!showForm)}> {showForm?"🙉":"🙈"}</span></div>}
 { /*isLogin && <input  className="w-64 rounded-md md:m-2 border border-black p-2 m-auto " ref={reEnter}  placeholder="ReEnter password"></input>*/ }
 </div>
 <div className="flex flex-row  justify-center ">
 <button className="m-1 bg-black p-2 rounded-md hover:text-black hover:bg-yellow-500 text-white h-11" onClick={handleForm} >{isLogin?<>{sign11}</>:<>{sign12}</>}</button>
 {
<p className="m-1 bg-white p-2 rounded-md text-black border border-black cursor-pointer  h-11 w-48 text-semibold" onClick={handleSignin}>{!isLogin?<>{sign13}</>:<>{sign14}</>}</p>
}

</div>
{!isLogin&& <Link to={"/reset"}><p className="text-center p-2 m-1 text-sm underline hover:cursor-pointer" >{sign15} </p></Link> }


</form>
<div className=" w-4 m-auto md:m-0 md:w-12  md:h-14 mt-7 md:mt-8  md:pt-4  text-center flex flex-row font-bold">{sign16}</div>
<div
 className="flex flex-row border cursor-pointer border-black p-2 rounded-md  bg-black text-white hover:bg-white hover:text-black text-xs sm:text-sm  sm:font-normal  m-auto md:m-0 md:w-48  md:h-14 mt-7 md:mt-8  md:pt-4  text-center "
  onClick={handleLoginGoogle}>
  <div className="flex flex-row w-full ">
    <svg xmlns="http://www.w3.org/2000/svg"
     
    viewBox="0 0 48 48" className="w-8 " >
      <path fill="#FFC107"
       d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z">
        </path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg> <p className="ml-2 pt-1 text-sm sm:text-sm">{sign17}</p> </div>

</div>
</div>



</div>
</div>

</>

 )
}
export default Sign
