import Validate from "./Validate"
import {useRef,useState} from "react"
import {  sendPasswordResetEmail} from "firebase/auth";
import { getAuth } from "firebase/auth";
import {Link,useNavigate} from "react-router-dom"
import { reset } from "../utils/ErrorSlice";
import { useDispatch } from "react-redux";

const ResetEmailPassword=()=>{
  const auth=getAuth()
    const [errorMsg ,setErrorMsg]=useState(null)
    const email=useRef(null)
    const navigate=useNavigate()
    let [count , setCount] =useState(3)
    const dispatch=useDispatch()
let timer=useRef()

function handleReset(){
  
       const emailCheck=Validate(email.current.value , "@WeQ(44%66#4")
        console.log(emailCheck,"hhh")
       if(emailCheck){
       
        setErrorMsg(" provide correct Email Id")
       }
       if(!emailCheck){
        sendPasswordResetEmail(auth, email.current.value)
          .then(() => {
            
            // Password reset email sent!
            // ..
            alert("link is sent on your Email Id Please reset password and use it for login")
           // setForm(false)
            //so it happen someone uses other emai id but not verfied so whe the real user come forforgot password email is sent so after email 
            //verify the page need to refresh so that it works --firebase stufff
            setErrorMsg("Moving to the main Page")
         timer=   setInterval(()=>{
            
             
             setCount((prev)=>prev-1)
            
            },700) 

             
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setErrorMsg("something went wrong ")
          });
        }
      }
      console.log(timer.current)
      if(count === 0){
      setCount(3)
        clearInterval(timer.current)
        //here dispatch value so on login page will be refresh and firebase as need refresh after email address validation
       dispatch(reset(true)) 
       navigate("/");
    

      }

    return(
        <> 
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[1200] bg-white pt-[280px] sm:pt-[180px] p-9 ">
          <Link to={"/"}>  <button className="bg-black p-2 m-2 text-base text-white rounded-lg left-0 top-0 absolute hover:bg-yellow-500">close</button></Link>
            <form onSubmit={(e)=>e.preventDefault()}>
            {errorMsg&&<p className="text-base text-red-700 p-1 m-1">{errorMsg} {count<3&&<span className="text-green-400">{count} seconds...</span>}</p>}

        <input ref={email} className=" text-black w-64 rounded-md mt-1 mb-1 md:m-2 border border-black p-2 m-auto" type="email" name="email" placeholder="Email id"></input>
       
       
       <button className="bg-red-600 p-2 m-2 text-base text-white rounded-lg hover:bg-yellow-500 " onClick={()=>handleReset()}>Reset Password</button>
       </form>
        </div>
        </>
    )
}

export default ResetEmailPassword