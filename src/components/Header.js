import {useDispatch, useSelector} from "react-redux"
import { getAuth, signOut } from "firebase/auth";
import { UseDispatch } from "react-redux";
import { infoUser } from "../utils/userSlice";
import { useNavigate ,Link,useLocation} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const Header=()=>{
    const dispatch=useDispatch()
   const navigate=useNavigate()
    const selector=useSelector((store)=>store.userInformation.value)
    const userPath=useLocation()
    console.log(userPath,"userpath")

   // console.log(selector.displayName)
    function logout(){
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  dispatch(infoUser(null))
   navigate("/")
   window.location.reload()
}).catch((error) => {
  // An error happened.
});
    }
const [navIcon , setNavIcon] =useState(false)

//let icon=useRef()
//state when user move from phone to destktop site and if browser does not refresh
let [iconToggle ,setIconToggle] =useState()
useEffect(()=>{
  if(window.innerWidth<620){

//icon.current=true
setIconToggle(true)
}
},[])

window.addEventListener("resize",()=>{
  if(window.innerWidth>=768){
 //   icon.current=false
 setIconToggle(false)
  }
  if(window.innerWidth<768){
   // icon.current=true
    setIconToggle(true)
  }
})


//console.log(icon.current)

   if(!selector)return
    return(
        <>
        <div className="flex flex-row justify-between mb-1 w-[75%] md:w-full ">
       <Link to={"/"}> <div className="w-16 p-3 hover:cursor-pointer animate-bounce slow-bounce hover:animate-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="orange" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
         <em className="text-xs ">AiPDF</em>
       </div>
     
       </Link>
     { iconToggle && <div onClick={()=>setNavIcon(!navIcon)}> {navIcon?<div className="w-8 p-1 m-1 absolute right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg></div>:<div className="w-8 p-1 m-1 absolute right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg></div>} </div> }

<div  className={`z-[100] text-md  text-black  md:flex w-2/3  bg-red-600 justify-between p-2 items-center md:flex-row  ${navIcon ? "flex flex-col fixed top-0  left-0 h-48 " : "hidden"} `} >

    <Link  to={"/cart"}><div  className={userPath.pathname === "/cart" ? "text-white":" " }>FilesCart</div> </Link>
<Link to={"/setting"}><div className={userPath.pathname === "/setting" ? "text-white":" "}>Setting</div></Link>
    <div className="select-none parent">{selector.displayName} <p className="text-xs absolute element bg-black p-1 rounded-xl">{selector?.email}</p></div>
    <p className="hover:text-white hover:cursor-pointer" onClick={logout}>Logout</p>
</div>

</div>

        </>
    )
}

export default Header