import Validate from "./Validate"
import {useRef,useState} from "react"
import {  sendPasswordResetEmail} from "firebase/auth";
const ResetEmailPassword=({auths,setForm})=>{
    const [errorMsg ,setErrorMsg]=useState(null)
    const email=useRef(null)
function handleReset(){
        const emailCheck=Validate(email.current.value , "@WeQ(44%66#4")
        console.log(emailCheck,"hhh")
       if(emailCheck){
       
        setErrorMsg(" provide correct Email Id")
       }
       if(!emailCheck){
        sendPasswordResetEmail(auths, email.current.value)
          .then(() => {
            // Password reset email sent!
            // ..
            alert("link is sent on your Email Id Please reset password--redirecting to login page.. ")
            setForm(false)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setErrorMsg("something went wrong ")
          });
        }
      }


    return(
        <> 
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[1200] bg-white pt-[280px] sm:pt-[180px] p-9 ">
            <button className="bg-black p-2 m-2 text-base text-white rounded-lg left-0 top-0 absolute hover:bg-yellow-500" onClick={()=>setForm(false)}>close</button>
            <form onSubmit={(e)=>e.preventDefault()}>
            {errorMsg&&<p className="text-base text-red-700 p-1 m-1">{errorMsg}</p>}

        <input ref={email} className=" text-black w-64 rounded-md mt-1 mb-1 md:m-2 border border-black p-2 m-auto" type="email" placeholder="Email id"></input>
       
       
       <button className="bg-red-600 p-2 m-2 text-base text-white rounded-lg hover:bg-yellow-500 " onClick={()=>handleReset()}>Reset Password</button>
       </form>
        </div>
        </>
    )
}

export default ResetEmailPassword