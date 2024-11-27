import { langugesConstant } from "../utils/langugesConstant";
import { getStorage, deleteObject } from "firebase/storage";
import { useState, useRef } from "react";
import { pdfjs } from "react-pdf";
//import {Document ,Page} from 'react-pdf'
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useDispatch, useSelector } from "react-redux";

import "../index.css";
import SelectionWord from "../utils/selectionWord";
import ShowPdf from "./ShowPdf";
import ShowSimplePdf from "./ShowSimplePdf";
import GetFilesFireBase from "./GetFilesFireBase";
import { textFile } from "../utils/userSlice";
import AiComponents from "./AiComponents";
//import ReactToPrint from "react-to-print";
import { addUrlAdvPdf, addUrlPdf } from "../utils/useStoreDataSlice";
//import ToShowSimplePdf from "./ToShowSimplePdf";
import "../App.css";
import useSupportLang from "../utils/useSupportLang";
//import PrintComponent from "./ToShowSimplePdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileDisplay = () => {
  
  
  
  const slectfileMeta = useSelector((store) => store.fileInformation.file);
  const storage = getStorage();
  const [msg, SetMsg] = useState(null);
  const [sideBarShow, setSideBarShow] = useState(null);
  const selectPdfUrl = useSelector((store) => store.useDataSlice.pdfUrl);
 
  const selectAdvPdfUrl = useSelector((store) => store.useDataSlice.advPdfUrl);
  SelectionWord(setSideBarShow);



  return (
    <div className="flex flex-col ">
      {msg && <p>{msg}</p>}

      {<GetFilesFireBase slectfileMeta={slectfileMeta} SetMsg={SetMsg} />}
    </div>
  );
};

export default FileDisplay;
