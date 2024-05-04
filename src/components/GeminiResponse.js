import { useEffect, useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import { addUserQuery } from "../utils/geminiResponseSlice"
import { toggleForApi } from "../utils/userKey"

const GeminiResponse=()=>{
    const dispatch=useDispatch()
const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)
console.log(selectgeminiResponse)
const selectGeminiError=useSelector((store)=>store.ErrorSliced?.gptResponseError)
console.log(selectGeminiError)
const [userInput,setuser]=useState()
console.log(userInput)
function handleClick(){
    if(!userInput?.trim()){
      alert("please provide")
    }else{
    dispatch(addUserQuery(userInput ))
    dispatch(toggleForApi())
    setuser("")
    }
}


function scrollToElement(id){
const element=document.getElementById(id)
element.scrollIntoView({behavior:"smooth"})
}


useEffect(()=>{
    let value="UseForscrolling"

if(selectgeminiResponse){
    scrollToElement(value)
}


},[selectgeminiResponse?.length])



if(selectGeminiError){
    return(<div>sorry their is issue in your api key <em className="text-sm text-red-700">{selectGeminiError}</em></div>)
}
return(
    <>
    {    selectgeminiResponse?.map((item,index)=>{
        return(
            <div className="text-black mb-1" style={{fontSize:".7em"}}>{index+1} - {item}</div>
        
        )
    })}
    <div >
    {selectgeminiResponse.length &&
     <div className="relative" >
          <div className="parent cursor-pointer">to know more  <p className=" text-sm element absolute top-[-30px] bg-gray-700 ">type your question and for more better result select paragraph in pdf for context</p></div>
    <textarea className="text-black w-full" required placeholder="to ask type here and ask" value={userInput} onChange={(e)=>setuser(e.target.value)} ></textarea>
    <button className="text-center bg-black p-1 rounded-lg text-white font-semibold text-sm" onClick={()=> handleClick()}>Search</button>
</div>
}</div>
{
    //using beolw one for scrolling to last<div id="UseForscrolling"></div>
}
<div id="UseForscrolling"></div>
    </>
)
}
export default GeminiResponse