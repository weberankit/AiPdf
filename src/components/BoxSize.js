import { useRef } from "react";
import { useState } from "react";
const BoxSize=({handlePlusClick,handleMinusClick})=>{
 // console.log(handleSizeClick)
  return(
    <div className="right-0 z-45 fixed text-white bg-black" >
       
    <div className="parent cursor-pointer bg-black inline-block mr-1"  onClick={()=>handlePlusClick()}>plus<p className="element absolute  top-20 bg-gray-700 ">to increse response box size</p></div>
    <div className="m-3 parent cursor-pointer  bg-black inline-block"  onClick={()=>handleMinusClick()}>minus<p className="element absolute top-0 bg-gray-700 ">to decrease response box size</p></div>
           
       </div>
  )
}
export default BoxSize