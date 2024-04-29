
import { getStorage,   deleteObject} from "firebase/storage";
import { useState } from "react";
import { pdfjs } from 'react-pdf';
//import {Document ,Page} from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import {  useDispatch, useSelector } from "react-redux";


import "../index.css"
import SelectionWord from "../utils/selectionWord";
import ShowPdf from "./ShowPdf";
import ShowSimplePdf from "./ShowSimplePdf";
import GetFilesFireBase from "./GetFilesFireBase";
import { textFile } from "../utils/userSlice";
import AiComponents from "./AiComponents";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;




const FileDisplay=()=>{

 const textShow=useSelector((store)=> store.userInformation.textGrab)
const dispatch=useDispatch()
const slectfileMeta=useSelector((store)=>store.fileInformation.file)
const [url,setUrl]=useState("")
const [proUrl,setProUrl]=useState("") 
const storage = getStorage();
const [msg,SetMsg] =useState(null)
const [sideBarShow , setSideBarShow]=useState(null)

//to grab words from pdf while selecting


SelectionWord(setSideBarShow)
console.log(sideBarShow,"sidebar")



    return(
        <div className="flex flex-col ">
            <div>{sideBarShow&& <AiComponents/>}</div>
{msg&&<p >{msg}</p>}


        <div className="w-1/2 m-auto pt-2 ">
      {url &&  <button className="bg-black font-semibold text-white p-1 rounded-lg" onClick={()=>setUrl(null)}>Close pdf</button>}
     {url&& <ShowSimplePdf data={url}/>}
</div>




<div className="text-center">
 {proUrl&& <button className="bg-red-600 text-white p-2 rounded-sm text-center" onClick={()=>setProUrl(null)}>close file</button>}
{
proUrl &&  <ShowPdf data={proUrl}/>
}
</div>

<div className=" w-3/2 p-2 ">
{/*textShow && <button className="w-44 m-auto" onClick={()=>dispatch(textFile(null))}>close</button>*/}
   { textShow && <>   <div className=" w-1/2 m-auto text-sm "> 
   <div><button className="bg-black text-white hover:bg-gray-600 p-2 rounded-lg" onClick={()=>dispatch(textFile(null))}>close</button></div>
    {textShow}</div> </>}

</div>


             
              <GetFilesFireBase slectfileMeta={slectfileMeta}
                                 
                                SetMsg={SetMsg}
                                setUrl={setUrl}
                                setProUrl={setProUrl}
                                //setGrab={grab}
              />
          
 






        </div>
    )
}

export default FileDisplay