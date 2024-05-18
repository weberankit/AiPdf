import { useSelector } from "react-redux"
const TranslateResponse=()=>{
    const selectSearchMsg=useSelector((store)=>store.ErrorSliced.searchMsg)

    const selectTransRespnse=useSelector((store)=>store.aiRespond?.translResponse)
    console.log(selectTransRespnse)
    return(
        <>
          {selectSearchMsg&& <div className="bg-black text-white p-2 rounded-lg  mb-1 border-b border-black font-serif text-xs"> {selectSearchMsg}</div>}
        <div style={{fontSize:".5em"}} className="text-white">  {selectTransRespnse?.message}</div> 
        <div className="bg-[#758bfd] text-white p-2 rounded-lg  mb-1 border-b border-black font-serif text-xs" style={{fontSize:".8em"}} >     {selectTransRespnse&&selectTransRespnse}</div> 
        </>
    )
}
export default TranslateResponse