
import { getStorage,   deleteObject} from "firebase/storage";
import { useState ,useRef} from "react";
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
//import ReactToPrint from "react-to-print";
import { addUrlAdvPdf, addUrlPdf } from "../utils/useStoreDataSlice";
//import ToShowSimplePdf from "./ToShowSimplePdf";
import "../App.css"
//import PrintComponent from "./ToShowSimplePdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;




const FileDisplay=()=>{

 const textShow=useSelector((store)=> store.userInformation.textGrab)
const dispatch=useDispatch()
const slectfileMeta=useSelector((store)=>store.fileInformation.file)
//const [url,setUrl]=useState("")
//const [proUrl,setProUrl]=useState("") 
const storage = getStorage();
const [msg,SetMsg] =useState(null)
const [sideBarShow , setSideBarShow]=useState(null)
//toget name and pass for print function
const [printFileName ,setPrintFileName] =useState("your highlighted Text")
//to grab words from pdf while selecting
const selectPdfUrl=useSelector((store)=>store.useDataSlice.pdfUrl)
//console.log(selectPdfUrl)
const selectAdvPdfUrl=useSelector((store)=>store.useDataSlice.advPdfUrl)
//console.log(selectAdvPdfUrl)
SelectionWord(setSideBarShow)
//console.log(sideBarShow,"sidebar")





    return(
        <div className="flex flex-col ">


            <div>{ sideBarShow&& <AiComponents/>}</div>
{msg&&<p >{msg}</p>}


        <div  >
      {selectPdfUrl &&  <button className="bg-red-600 font-semibold text-white p-1 rounded-lg top-[100px] text-[11px] md:text-base fixed left-1 z-[50]" onClick={()=>dispatch(addUrlPdf(null))}>Close pdf</button>}
 <div >   { selectPdfUrl&& <ShowSimplePdf data={selectPdfUrl} printfileName={printFileName}/>} </div> 
   
</div>




<div className="text-center ">
 {selectAdvPdfUrl&& <button className="bg-red-600 text-white p-2 rounded-sm text-center" onClick={()=>dispatch(addUrlAdvPdf(null))}>close file</button>}
 {selectAdvPdfUrl && <div className="font-semibold text-xs select-none">As this is a free trial version so if you get session timeout then refresh the page  </div>}
{
selectAdvPdfUrl &&  <ShowPdf data={selectAdvPdfUrl}/>
}
</div>

<div className=" w-3/2 p-2 ">
{/*textShow && <button className="w-44 m-auto" onClick={()=>dispatch(textFile(null))}>close</button>*/}
   { textShow && <>   <div className=" w-4/5 sm:w-1/2 m-auto text-xs sm:text-sm "> 
   <div><button className="bg-black text-white hover:bg-gray-600 p-2 rounded-lg" onClick={()=>dispatch(textFile(null))}>close</button></div>
    {textShow}</div> </>}

</div>


             
              <GetFilesFireBase slectfileMeta={slectfileMeta}
                                 
                                SetMsg={SetMsg}
                              
                               // setUrl={setUrl}
                               // setProUrl={setProUrl}
                                //setGrab={grab}
                              //  myurl={selectPdfUrl}
                                setPrintFileName={setPrintFileName}
              />
          
 






        </div>
    )
}

export default FileDisplay