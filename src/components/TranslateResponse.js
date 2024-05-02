import { useSelector } from "react-redux"
const TranslateResponse=()=>{
    const selectTransRespnse=useSelector((store)=>store.aiRespond?.translResponse)
    console.log(selectTransRespnse)
    return(
        <>
        <div style={{fontSize:".5em"}} >  {selectTransRespnse?.message}</div> 
        <div className="text-black" style={{fontSize:".8em"}} >     {selectTransRespnse&&selectTransRespnse}</div> 
        </>
    )
}
export default TranslateResponse