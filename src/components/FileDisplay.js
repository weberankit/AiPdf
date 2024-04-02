
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

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;




const FileDisplay=()=>{

 const textShow=useSelector((store)=> store.userInformation.textGrab)
const dispatch=useDispatch()
const slectfileMeta=useSelector((store)=>store.fileInformation.file)
const [url,setUrl]=useState("")
const [proUrl,setProUrl]=useState("") 
const storage = getStorage();
const [msg,SetMsg] =useState(null)


//to grab words from pdf while selecting


SelectionWord()




    return(
        <div className="flex flex-col ">
{msg&&<p>{msg}</p>}
        <div>
      {url &&  <button onClick={()=>setUrl(null)}>Close</button>}
     {url&& <ShowSimplePdf data={url}/>}
</div>




<div>
 {proUrl&& <button onClick={()=>setProUrl(null)}>close</button>}
{
proUrl &&  <ShowPdf data={proUrl}/>
}
</div>

<div className="bg-sky-300">
{textShow && <button onClick={()=>dispatch(textFile(null))}>close</button>}
   { textShow && <div className="bg-sky-300"> {textShow}</div> }

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