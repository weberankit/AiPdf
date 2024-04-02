import {useDispatch, useSelector} from "react-redux"
import { getAuth, signOut } from "firebase/auth";
import { UseDispatch } from "react-redux";
import { infoUser } from "../utils/userSlice";
import { useNavigate ,Link} from "react-router-dom";
const Header=()=>{
    const dispatch=useDispatch()
   const navigate=useNavigate()
    const selector=useSelector((store)=>store.userInformation.value)
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
<div>
    <p>{selector.displayName}</p>
    <button onClick={logout}>Logout</button>
</div>
<Link to={"/cart"}><div>FilesCart</div></Link>
        </>
    )
}

export default Header