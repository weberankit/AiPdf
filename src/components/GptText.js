import { gptValue } from "../utils/aiManagment"
import {useDispatch} from "react-redux"
import BoxSize from "./BoxSize"
import { useRef, useState } from "react"
const GptText=({styles})=>{
    const dispatch=useDispatch()
  console.log(styles)
    return(
        <>
     <div className = "bg-black text-white  fixed right-0 z-45 " style={styles}>
      <div className="overflow-scroll  h-96">
        <p>Gptfile</p>
        <button onClick={()=>{dispatch(gptValue(false))}}>close</button>
        </div>
        
</div>
        </>
    )
}
export default GptText