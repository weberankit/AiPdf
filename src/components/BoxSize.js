import {langugesConstant} from "../utils/langugesConstant"

import { ZoomIn, ZoomOut } from "react-bootstrap-icons";
import useSupportLang from "../utils/useSupportLang";
const BoxSize=({handlePlusClick,handleMinusClick})=>{



 // console.log(handleSizeClick)➕➖
 const{box1 , box2} = langugesConstant[useSupportLang()]

  return(
    <div className="right-0 z-50 fixed text-white bg-black rounded-md p-[2px] text-sm" >
       
    <div className="parent cursor-pointer bg-black inline-block mr-1 lg:p-2"  onClick={()=>handlePlusClick()}><ZoomIn /><p className="text-xs element absolute  top-20 bg-gray-700 p-1 rounded-sm right-6">{box1}</p></div>
    <div className=" parent cursor-pointer  bg-black inline-block lg:p-2"  onClick={()=>handleMinusClick()}><ZoomOut /><p className="element absolute top-20 bg-gray-700 right-0 p-1 rounded-sm">{box2}</p></div>
              
       </div>
  )
}
export default BoxSize 