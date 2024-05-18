import {langugesConstant} from "../utils/langugesConstant"

import { useEffect, useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import { addUserQuery } from "../utils/geminiResponseSlice"
import { toggleForApi } from "../utils/userKey"
import { Search } from "react-bootstrap-icons"
import useSupportLang from "../utils/useSupportLang"

const GeminiResponse=()=>{
const {gpt3,gpt4,gpt5} = langugesConstant[useSupportLang()]

    const dispatch=useDispatch()
    const selectSearchMsg=useSelector((store)=>store.ErrorSliced.searchMsg)

const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)
//console.log(selectgeminiResponse)
const selectGeminiError=useSelector((store)=>store.ErrorSliced?.gptResponseError)
//console.log(selectGeminiError)
const [userInput,setuser]=useState()
//console.log(userInput)
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
    return(<div>{gpt3} <em className="text-sm text-red-700">{selectGeminiError}</em></div>)
}
return(
    <>
    {selectSearchMsg&& <div className="bg-black text-center text-sm p-1 m-1 fixed text-white rounded-md"> {selectSearchMsg}</div>}
    {    selectgeminiResponse?.map((item,index)=>{
        return(
            <div className="bg-[#758bfd] text-white p-2 rounded-lg  mb-1 border-b border-black font-serif" style={{fontSize:".7em"}}>{index+1} - {item}</div>
        
        )
    })}
    <div >
    {selectgeminiResponse.length &&
     <div className="relative" >
          <div className="parent cursor-pointer font-serif text-sm font-light"> {gpt4}  <p className=" text-sm element absolute top-[-30px] bg-gray-700 ">{gpt5}</p></div>
    <textarea className="text-black w-full rounded-md" required placeholder="to ask type here and ask" value={userInput} onChange={(e)=>setuser(e.target.value)} ></textarea>
    <button className="text-center bg-black p-1 rounded-lg text-white font-semibold text-sm mt-1" onClick={()=> handleClick()}><Search size={20}/></button>
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