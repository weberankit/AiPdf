
import { useState ,useEffect } from "react"
import { useLocation } from "react-router-dom"
import { langugesConstant } from "../utils/langugesConstant"
import useSupportLang from "../utils/useSupportLang"
import { useSelector } from "react-redux"
const ShowMessageKey=({keyAvail})=>{
        const {msg1} = langugesConstant[useSupportLang()] 
const location =useLocation()
    const [showKeyMessage , setShowKeyMessage] = useState(null)
    const selector = useSelector((store) => store.userInformation.value);
    useEffect(()=>{
       


function MangeAlert(){
        let getItems=sessionStorage.getItem("keyalert") || null
        
    
        if(!getItems){
       //for both upload and direct open pdf
 if(keyAvail && location.pathname === "/cart"  || keyAvail && location.pathname === "/withoutUpload" && selector ){
          setShowKeyMessage(true)

           sessionStorage.setItem("keyalert","done")
        }



       
        }
    
      }

      MangeAlert()


        },[])

function scroll(){
    window.scrollTo({top:0,behavior:"smooth"})
}


        return(
<>
<div>
<div>
  {showKeyMessage && <>       
   <div className=" fixed top-0 left-0 right-0 bottom-0 w-full h-[4000px] z-[4000] bg-white ">
   
  <div>

    <div className=" p-4 md:p-44 m-2 font-serif"><h1 className="text-xl font-extrabold ">{msg1}</h1></div>

</div>
 <div className="w-full"><div className="bg-black text-center p-4 text-white w-1/2 m-auto " onClick={()=>{setShowKeyMessage(null);scroll()}}>Close</div></div>
   </div>
  
  </>}
</div>

        </div>



</>

        )
}

export default ShowMessageKey