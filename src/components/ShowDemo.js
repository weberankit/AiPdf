import AiComponents from "./AiComponents"
import ShowPdf from "./ShowPdf"
import ShowSimplePdf from "./ShowSimplePdf"
import SelectionWord from "../utils/selectionWord"
import useStatusCheck from "../utils/useStatusCheck"
import { useState } from "react"

import {Link} from "react-router-dom"
const ShowDemo=()=>{

    const [sideBarShow , setSideBarShow]=useState(null)
    useStatusCheck()
    SelectionWord(setSideBarShow)


const [dataUrl , SetDataUrl] =useState("https://firebasestorage.googleapis.com/v0/b/aipdf-375e4.appspot.com/o/path%2Fto%2FvFnr7xaXckVqklAYwqtOSUaZiCs2%2Fimpfile-not-del.pdf?alt=media&token=4b62ac1b-0158-44f1-ac54-429ec055c24b")

    return(
        <>
        <Link to={"/"}><div className="bg-red-600 text-sm sm:text-xs  p-2  right-0 text-white rounded-lg w-24 m-auto z-[99] fixed ">upload Page</div></Link>
<div className="">
    
 { sideBarShow && <AiComponents/>}
 { dataUrl && <button className="bg-red-600 font-semibold text-white p-1 rounded-lg top-[100px] text-[11px] md:text-base fixed left-1 z-[50]" onClick={()=>{ SetDataUrl(null);setSideBarShow(null)}} >Close pdf</button>}
{dataUrl && <ShowSimplePdf data={dataUrl} printfileName={"default"}/>}
<Link to={"/demo"}><div className="bg-black text-center p-2 rounded-lg m-1 text-white w-24 m-auto text-sm" >Back</div></Link>
</div>


        </>
    )
}

export default ShowDemo