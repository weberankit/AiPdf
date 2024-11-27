import { useSelector ,useDispatch} from "react-redux"
import AiComponents from "./AiComponents"
import { useState } from "react"
import useStatusCheck from "../utils/useStatusCheck"
import { langugesConstant } from "../utils/langugesConstant"
import useSupportLang from "../utils/useSupportLang"
import SelectionWord from "../utils/selectionWord"
import { textFile } from "../utils/userSlice"

const PdfView=()=>{
    const textShow=useSelector((store)=> store.userInformation.textGrab)
    const [sideBarShow , setSideBarShow]=useState(null)
    SelectionWord(setSideBarShow)
    useStatusCheck()
    const {fileDisplay1} =langugesConstant[useSupportLang()]
    const dispatch=useDispatch()
    return(
        <>
       <div  className={` w-3/2 p-2 `}  >

{textShow && <div className="absolute z-[1000] mt-9">{ sideBarShow&& <AiComponents/>}</div>}

{ textShow && <div>   
<div className=" w-4/5 sm:w-1/2 m-auto text-xs sm:text-sm "> 
   <div> <button className="bg-black text-white hover:bg-gray-600 p-2 rounded-lg" onClick={()=>dispatch(textFile(null))}>{fileDisplay1}</button></div>
   {textShow}
   </div> 
</div>
}

</div>
        </>
    )
}

export default PdfView