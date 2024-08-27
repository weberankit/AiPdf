import {langugesConstant} from "../utils/langugesConstant"
import {Link,useLocation} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux"
import { addToogleNav } from "../utils/useStoreDataSlice"
import { XSquare ,House ,GearWideConnected,FileEarmark,CloudUploadFill ,PersonBadgeFill} from "react-bootstrap-icons"
import useSupportLang from "../utils/useSupportLang"

const SlideNav=({logoutUser,emailId})=>{
   const {nav1,nav2,nav3,nav4,nav5} = langugesConstant[useSupportLang()]

const path=useLocation()
const {pathname:location}=path 
console.log(location)
const dispatch=useDispatch()
const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)

const navLinks=[
    {
   path:"/",
   navName:nav1,
   icon:<House size={24}/>

    },
    {
        path:"/cart",
        navName:nav2,
        icon:<FileEarmark size={24}/>
     
         },
         {
            path:"/upload",
            navName:nav3,
            icon:<CloudUploadFill size={24}/>
         
             },
             {
                path:"/setting",
                navName:nav4,
                icon:<GearWideConnected size={24}/>
             
                 }
                 


]
    return(
        <>
<div className={`relative `} >
    <span className="absolute top-3 text-xs sm:text-base font-bold font-serif ml-1">{emailId}</span>
<button className="p-2 m-1 rounded-lg ml-[85%] text-red-600 text-2xl font-extrabold" onClick={()=>dispatch(addToogleNav())}><XSquare/></button>
<div >
<ul className="mt-16">
{navLinks.map((item)=>{
    return(
        <>
        <div className={`p-2 text-center border border-gray-200 hover:bg-[#202020c9] hover:text-white ${selectDarkToogle ? "hover:bg-gray-400":"text-black"} `}>


        <Link to={item.path}>
<li className="py-2 px-4 border-b-gray-200 hover:text-white">{location === item.path?<div className="flex flex-row"><div  className=" p-1 font-bold font-serif">{item.icon}</div><div className="mt-1 px-8 text-[#8a60f6]  font-bold font-serif">{item.navName}</div></div>:<div className="flex flex-row hover:text-white"><div className=" p-1 font-bold font-serif">{item.icon}</div><div className={`mt-1 px-8  font-bold font-serif   ${    selectDarkToogle?"text-white":"text-black"}`}>{item.navName}</div></div>}</li>
</Link>

        </div>
        </>
    )
})}
<div className="p-2 hover:bg-[#202020c9] ml-2 cursor-pointer"  onClick={()=>logoutUser()}>
<li className=" py-2 px-4 border-b-gray-200 hover:text-white "><div className="flex flex-row "><div  className=" p-1 font-bold font-serif mt-1"><PersonBadgeFill/></div><div className={`mt-1 px-8   font-bold font-serif ${    selectDarkToogle?"text-white":"text-black"}`} >{nav5}</div></div></li>
</div>
</ul>



</div>



</div>


        </>
    )
}

export default SlideNav