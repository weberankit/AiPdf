import { useRef } from "react";
import { useState } from "react";
const BoxSize=({handlePlusClick,handleMinusClick})=>{
 // console.log(handleSizeClick)
  return(
    <div className="right-0 z-50 fixed text-white bg-black rounded-md p-0 text-sm" >
       
    <div className="parent cursor-pointer bg-black inline-block mr-1 "  onClick={()=>handlePlusClick()}>➕<p className="element absolute  top-20 bg-gray-700 p-1 rounded-sm">to increse response box size</p></div>
    <div className="m-3 parent cursor-pointer  bg-black inline-block"  onClick={()=>handleMinusClick()}>➖<p className="element absolute top-20 bg-gray-700 right-0 p-1 rounded-sm">to decrease response box size</p></div>
           
       </div>
  )
}
export default BoxSize