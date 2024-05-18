
import { langugesConstant } from '../utils/langugesConstant';
import { Translate, MoonStarsFill ,FilePdfFill,MenuButtonWideFill,MenuAppFill,ThreeDots} from 'react-bootstrap-icons';
import {Link} from "react-router-dom"

import {useDispatch, useSelector} from "react-redux"
import { getAuth, signOut } from "firebase/auth";
import { UseDispatch } from "react-redux";
import { infoUser } from "../utils/userSlice";
import { useNavigate ,useLocation} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SlideNav from './SlideNav';
import { addToogleNav } from '../utils/useStoreDataSlice';
import { addDarkMode } from '../utils/userSlice';
import LangSupport from "./LangSupport"
import useSupportLang from '../utils/useSupportLang';

const Heading=()=>{
    const auth = getAuth();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
const {sign1,sign2,log1} = langugesConstant[useSupportLang()]
    const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)
     const selector=useSelector((store)=>store.userInformation.value)
     const userPath=useLocation()
     console.log(userPath,"userpath")
    const selectNavToggle=useSelector((store)=>store.useDataSlice.toggleNav)
    // console.log(selector.displayName)
     function logout(){
      if(window.confirm(log1)){
signOut(auth).then(() => {
   // Sign-out successful.
   dispatch(infoUser(null))
  // dispatch(addToogleNav())

    navigate("/")
  //  window.location.reload()
 }).catch((error) => {
   // An error happened.
 });
      }else{
  console.log("not logout")
      }
     
 
     }
    
    const refHide= useRef()
     const selectPdfUrl=useSelector((store)=>store.useDataSlice.pdfUrl)
     //console.log(selectPdfUrl)
     const selectAdvPdfUrl=useSelector((store)=>store.useDataSlice.advPdfUrl)
     if(selectPdfUrl || selectAdvPdfUrl){
      refHide.current="hidden"
     }else{
      // setHideHeaderPdfOpen("fixed")
      refHide.current="null"
     }
     console.log(refHide.current)

   const navHideOutsideClick=useRef()
   function hideNavOnOutside(e) {
    // navHideOutsideClick.current instanceof HTMLElement why it needed because below
/*please note this This check is essential because you might accidentally store a different type of value in navHideOutsideClick.current (e.g., a string or number)
 due to coding errors or unexpected data. Using an invalid element reference could cause runtime errors. */
//instances means  meaning it has its own copy of the properties and methods defined in the constructor.
    if (navHideOutsideClick.current && navHideOutsideClick.current instanceof HTMLElement) {
      // Check for click outside the navigation bar
      if (!navHideOutsideClick.current.contains(e.target)) {
        dispatch(addToogleNav(false));
      }
    } else {
      console.error("navHideOutsideClick is not a valid DOM element reference.");
    }
  }
  
  
  useEffect(() => {
const getDefaultDark=localStorage.getItem("darkModes")
if(getDefaultDark){
if(getDefaultDark === "white"){
dispatch(addDarkMode(false))
}
if(getDefaultDark === "black"){
  dispatch(addDarkMode(true))
}
}
    window.addEventListener("mousedown", hideNavOnOutside);
  return () => window.removeEventListener("mousedown", hideNavOnOutside);



  }, [])


  



//store in local so to  use when user visit again
function handleDarkToggleStore(item){
 
   localStorage.setItem("darkModes" , item)


}





const [showSupport , setShowSupport] = useState(null)


    return(
        <>

{showSupport && <div className="fixed w-full "><LangSupport close={setShowSupport}/></div>}



        <div className={`fixed w-full border-b border-gray-400 z-[850]  ${refHide.current}  ${selectDarkToogle?" darkMode text-white ":"bg-white" }`}>
            <div className='flex flex-row justify-between p-4'>
                <div className='w-1/3 select-none'>
       <div className='mt-4 flex flex-row '> <Link to={"/"} className="flex flex-row"> <FilePdfFill size={28} /><span className={`hidden md:block text-2xl font-extrabold  `}>{sign1}</span></Link></div>
            </div>
            <div className='w-[360px] flex flex-row justify-between  text-white'>
            <div  > { selectDarkToogle ?  <div className=" mt-[14px]  cursor-pointer text-lg p-2 rounded-3xl m-2  bg-[#8a60f6] flex items-center justify-center" onClick={()=>{dispatch(addDarkMode(false));handleDarkToggleStore("white")}}> <MoonStarsFill color='white' size={16}/> </div> : <div className=" mt-[14px] text-lg p-2 rounded-3xl m-2  bg-[#8a60f6] flex items-center justify-center cursor-pointer" onClick={()=>{dispatch(addDarkMode(true)) ;handleDarkToggleStore("black")}}> <MoonStarsFill color='black' size={16}/></div>}</div>
  {!selector ? <Link to={"/sign"} className='p-2 mt-[4px] whitespace-nowrap'>     <div className='  bg-black  p-2 rounded-md flex items-center justify-center initialPage'> {sign2} </div></Link>:<div   > {selectNavToggle ?<div className={ `cursor-pointer   ${selectDarkToogle?"text-white  ":"text-black"} cursor-pointer p-4 rounded-lg`} onClick={()=>dispatch(addToogleNav(false))}><MenuAppFill size={24}/> </div>:<div onClick={()=>dispatch(addToogleNav(true))} className={` ${selectDarkToogle?"text-white":"text-black"} cursor-pointer p-4 rounded-lg `}><MenuButtonWideFill size={24}/></div>}     </div>
}
          <div onClick={()=>setShowSupport(!showSupport)} className='bg-[#f7b239] text-black p-4 rounded-lg my-1 cursor-pointer'>{showSupport?<ThreeDots/>:<Translate size={22} />}</div>
          </div>
          </div>


          <div ref={navHideOutsideClick} className={`${selectNavToggle ? 'left-0 ' : '-left-full'} cursor-pointer fixed top-0 h-full w-2/3 sm:w-1/2 md:w-1/3 lg:w-[25%]  shadow-lg transition duration-800  ease-in-out ${selectDarkToogle? " darkMode text-white":"bg-white"} `}><SlideNav logoutUser={logout} emailId={selector?.email}/></div>
        </div>
        </>
    )
} 

export default Heading