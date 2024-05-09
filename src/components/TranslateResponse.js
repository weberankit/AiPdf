import { useSelector } from "react-redux"
const TranslateResponse=()=>{
    const selectSearchMsg=useSelector((store)=>store.ErrorSliced.searchMsg)

    const selectTransRespnse=useSelector((store)=>store.aiRespond?.translResponse)
    console.log(selectTransRespnse)
    return(
        <>
          {selectSearchMsg&& <div className="bg-black text-center text-sm p-1 m-1 fixed text-white rounded-md"> {selectSearchMsg}</div>}
        <div style={{fontSize:".5em"}} >  {selectTransRespnse?.message}</div> 
        <div className="text-black" style={{fontSize:".8em"}} >     {selectTransRespnse&&selectTransRespnse}</div> 
        </>
    )
}
export default TranslateResponse