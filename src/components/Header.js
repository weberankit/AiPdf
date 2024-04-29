import {useDispatch, useSelector} from "react-redux"
import { getAuth, signOut } from "firebase/auth";
import { UseDispatch } from "react-redux";
import { infoUser } from "../utils/userSlice";
import { useNavigate ,Link,useLocation} from "react-router-dom";
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
}).catch((error) => {
  // An error happened.
});
    }
   if(!selector)return
    return(
        <>
        <div className="flex flex-row justify-between mb-1">
       <Link to={"/"}> <div className="w-16 p-3 hover:cursor-pointer animate-bounce duration-1000 hover:animate-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="orange" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
         <em className="text-xs ">upload</em>
       </div>
     
       </Link>
     
<div className="text-md  text-white flex flex-row  w-2/3  bg-red-600  justify-between p-2 items-center">

    <Link  to={"/cart"}><div  className={userPath.pathname === "/cart" ? "text-black":" " }>FilesCart</div> </Link>
<Link to={"/setting"}><div className={userPath.pathname === "/setting" ? "text-black":" "}>Setting</div></Link>
    <p className="">{selector.displayName}</p>
    <p className="hover:text-white hover:cursor-pointer" onClick={logout}>Logout</p>
</div>

</div>

        </>
    )
}

export default Header