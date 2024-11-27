import { useSelector ,useDispatch} from "react-redux"
import AiComponents from "./AiComponents"
import { useState } from "react"
import useStatusCheck from "../utils/useStatusCheck"
import { langugesConstant } from "../utils/langugesConstant"
import useSupportLang from "../utils/useSupportLang"
import SelectionWord from "../utils/selectionWord"
import ShowPdf from "./ShowPdf"
import { addUrlAdvPdf } from "../utils/useStoreDataSlice"
import { Link } from "react-router-dom"
const AdvPdfView=()=>{

    const selectAdvPdfUrl=useSelector((store)=>store.useDataSlice.advPdfUrl)
    const [sideBarShow , setSideBarShow]=useState(null)
    SelectionWord(setSideBarShow)
    useStatusCheck()
    const {fileDisplay1,fileDisplay2} =langugesConstant[useSupportLang()]
    const dispatch=useDispatch()
    return(
        <>
     <div className={` text-center `}>
{selectAdvPdfUrl && <div className="absolute z-[1000] mt-9">{ sideBarShow&& <AiComponents/>}</div>}
 {selectAdvPdfUrl&&<Link to={"/cart"}><button onClick={()=>{dispatch(addUrlAdvPdf(null))}} className="bg-red-600 text-white p-2 rounded-sm text-center" >{fileDisplay1}</button></Link> }
 {selectAdvPdfUrl && <div className="font-semibold text-xs select-none">{fileDisplay2} </div>}
{
selectAdvPdfUrl &&  <ShowPdf data={selectAdvPdfUrl}/>
}
</div>
        </>
    )
}

export default AdvPdfView