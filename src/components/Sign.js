import { useRef,useState } from "react"
import { getAuth, createUserWithEmailAndPassword ,updateProfile , signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { firebaseConfig } from "../utils/firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDispatch } from "react-redux";
import { infoUser,loadingState } from "../utils/userSlice";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Validate from "./Validate";
const Sign=()=>{
    const dispatch=useDispatch()
    const auth = getAuth();
const [isLogin, setLogin]=useState(false)
 const [errorMsg, setErrorMsg] = useState("")
const email=useRef(null)
const password=useRef(null)
const fullName=useRef(null)


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






 return(
<>
<form onSubmit={(e)=>e.preventDefault()}>
{isLogin && <input type="name" ref={fullName} placeholder="name"></input>} 
 <input ref={email} type="email" placeholder="Email id"></input>
 <input type="password" ref={password} placeholder="password"></input>
 <button onClick={handleForm} >{isLogin?"Signup":"singin"}</button>
 {
<p onClick={handleSignin}>{!isLogin?"click for signUp":"click for signIn"}</p>
}
</form>
<p onClick={handleLoginGoogle}>login with Google</p>
<p>{errorMsg}</p>
</>

 )
}
export default Sign
