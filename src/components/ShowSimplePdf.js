
import "react-pdf/dist/esm/Page/TextLayer.css";
/*
import {langugesConstant} from "../utils/langugesConstant"
import React, { useState, useRef, useEffect } from 'react';
import { PdfLoader, PdfHighlighter, Tip, Highlight, AreaHighlight, Popup } from 'react-pdf-highlighter';
//-import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import DisplaySimplePdf from "./DisplaySimplePdf"
import { handlePrint } from '../utils/helper';
import useSupportLang from "../utils/useSupportLang";
import { memo } from "react";

import {Document ,Page} from 'react-pdf'

*/

/*
const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const getNextId = () => String(Math.random()).slice(2);

const HighlightPopup = ({ comment, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (



    <div
      className="Highlight__popup"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button onClick={onDelete}>Delete</button>
      )}
      {comment.emoji} {comment.text}
    </div>
  );
};
/*
const ShowSimplePdf = ({ data ,printfileName }) => {
  const {showPdf1,showPdf2,showPdf3,showPdf4,showPdf5,showPdf6,showPdf7,showPdf8,showPdf9,showPdf10,showPdf11} =langugesConstant[useSupportLang()]
  console.log(data)
  const token=data.split("&token=")
  const keyForStoringHighlight=token[1]
  console.log(token)
  const [errorMessage, setErrorMessage] = useState();
 const[downloadBtnShow , setDownloaShow] =useState(null)



 const clearLocalStorage = () => {

  try {
    if(token){
    localStorage.removeItem(token[1])

    alert(showPdf1);
    setErrorMessage(null)

    }
  
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      setErrorMessage(showPdf2);

    } else {
      setErrorMessage(showPdf3)
    }
  }
};


const handleLocalStorageError = (error) => {

  if (error.name === 'QuotaExceededError') {
    setErrorMessage(showPdf4);

  } else {
    setErrorMessage(showPdf5);
    
  }
};


  const highlightsFromStorage = JSON.parse(localStorage.getItem(`${keyForStoringHighlight}`));
  const [highlights, setHighlights] = useState(highlightsFromStorage || []);

  const pdfHighlighter = useRef(null);
  let timer= setTimeout(()=>{setDownloaShow(true)},9000)

  useEffect(() => {
    
    const scrollToHighlightFromHash = () => {
      const highlight = getHighlightById(parseIdFromHash());
      if (highlight) {
        pdfHighlighter.current.scrollTo(highlight);
      }
    };

    window.addEventListener("hashchange", scrollToHighlightFromHash, false);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
      clearTimeout(timer)
    };
  }, []);

  const getHighlightById = id => highlights.find(highlight => highlight.id === id);

  const addHighlight = highlight => {
    const existingHighlights = JSON.parse(localStorage.getItem(`${keyForStoringHighlight}`)) || [];
     function toCallLocal(){
      try{
localStorage.setItem(`${keyForStoringHighlight}`, JSON.stringify([...existingHighlights, highlight]));
    }catch(error){
      handleLocalStorageError(error)
    }
  }
     toCallLocal()

    setHighlights([...highlights, { ...highlight, id: getNextId() }]);
  };

  const deleteHighlight = index => {
    const updatedHighlights = [...highlights];
    updatedHighlights.splice(index, 1);
    setHighlights(updatedHighlights);


    function toCallLocal(){
      try{
    localStorage.setItem(`${keyForStoringHighlight}`, JSON.stringify(updatedHighlights));
    }catch(error){
      handleLocalStorageError(error)
    }
  }
     toCallLocal()
  
  };

  const updateHighlight = (highlightId, position, content,) => {
    setHighlights(
      highlights.map(h => {
        return h.id === highlightId
          ? {
            ...h,
            position: { ...h.position, ...position },
            content: { ...h.content, ...content }
          }
          : h;
      })
    );
  };

  
function handleClear(){
  if(window.confirm("this will clear all of the highlights from all of your file so recommend to use button clear the Highlight DO YOU WANT TO clear ALL HIGHLIGHTS FROM ALL OF YOUR FILES")){
  localStorage.clear()
  setErrorMessage(null)
  localStorage.setItem('tourCompleted', 'true');
 
  }else{
    console.log("not deleted")
  }
}

  return (
    <div className="a">



{
errorMessage && <div className='bg-black fixed top-0 p-14 text-white text-sm z-[1003] w-full left-0'>
 
  
<button className='bg-white text-black p-2 rounded-md ' onClick={()=>setErrorMessage(null)}>{showPdf6}</button>

{ <div className='mr-4 w-full sm:w-5/6 text-red-700'>{errorMessage}</div>}

 <button className='bg-red-600 p-1 text-sm rounded-lg m-2 hover:bg-green-700' onClick={clearLocalStorage}>{showPdf11} </button>
<p className="p-1 m-1  text-green-500 animate-pulse hover:cursor-pointer hover:animate-none hover:text-white" onClick={()=>handlePrint( keyForStoringHighlight,printfileName)}>{showPdf10}</p>

<p className='text-xs '>{showPdf7}</p>

<button className='bg-red-600 text-white m-1 p-1 text-xs rounded-md hover:bg-yellow-800' onClick={()=>handleClear()}>{showPdf8}</button>
</div>


}
{
downloadBtnShow && <div className='z-[99] fixed left-[162px] w-6 parent  top-[24px]   p-1 m-2 ml-3 text-sm' onClick={()=>handlePrint(keyForStoringHighlight,printfileName)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg><p className="element absolute top-[-10px] bg-gray-700 z-[430] px-4 w-44">{showPdf9}</p></div>
}
<DisplaySimplePdf deleteHighlight={deleteHighlight} data={data} pdfHighlighter={pdfHighlighter} 
handleLocalStorageError ={handleLocalStorageError  } clearLocalStorage={clearLocalStorage}
HighlightPopup={HighlightPopup} addHighlight={addHighlight} updateHighlight={updateHighlight}
highlights={highlights} 
/>









        








   
    </div>
  );
};



export default ShowSimplePdf;
*/

/*
const ShowSimplePdf=({data})=>{
    const [numPages, setNumPages] = useState(0);
    const [pageNo ,setPageNo]=useState(1)
    function nextPage(){
        //eg.pg-4
          if(pageNo<numPages){
            console.log(pageNo,numPages)
              setPageNo(pageNo+1) //eg.pg-5 
          }
      
      }
      function prevPage(){
        //since when totalpage is greate or equal to 2 then decrement
        if(pageNo>=2){
          setPageNo(pageNo-1)
          console.log(pageNo,numPages)
        }
      }
      console.log(data)
return(
    <>
    
    <Document file={data} onLoadSuccess={({ numPages: numPagesInPdf }) => {
        setNumPages(numPagesInPdf)}}  loading={"pdf is loading"}>
        <Page pageNumber={pageNo} />
       
    
 
  
      </Document>

      {
 (pageNo==1) ? " " : <button onClick={prevPage}>{data&&"Prev"}</button>
  }
 {
 (pageNo>=numPages) ? " " : <button onClick={nextPage}>{data&&"Next"}</button>
  }
    </>
)
}

export default ShowSimplePdf
*/
/*
const ShowSimplePdf = memo(({ data }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  function nextPage() {
    if (pageNo < numPages) {
      setPageNo(pageNo + 1);
    }
  }

  function prevPage() {
    if (pageNo >= 2) {
      setPageNo(pageNo - 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-gray-100">
      <Document
        file={data}
        onLoadSuccess={({ numPages: numPagesInPdf }) => setNumPages(numPagesInPdf)}
        loading={<div className="text-gray-500">PDF is loading...</div>}
       
        className=" text-[.1rem] w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex justify-center border border-gray-300 shadow-lg rounded-lg "
      >
        <Page pageNumber={pageNo} />
      </Document>

      <div className="mt-4 flex space-x-4">
        {pageNo > 1 && (
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Prev
          </button>
        )}
        <span className="text-gray-500">
          Page {pageNo} of {numPages}
        </span>
        {pageNo < numPages && (
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
});

export default ShowSimplePdf;*/


import { useState, useRef, useEffect, memo } from "react";
import { Document, Page } from "react-pdf";
import { ZoomIn,ZoomOut,CaretLeft,CaretRight } from "react-bootstrap-icons";

const ShowSimplePdf = memo(({ data }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [width, setWidth] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function nextPage() {
    if (pageNo < numPages) {
      setPageNo(pageNo + 1);
    }
  }

  function prevPage() {
    if (pageNo >= 2) {
      setPageNo(pageNo - 1);
    }
  }

  return (
    <div
      ref={containerRef}
      className="  flex flex-col items-center justify-center w-full pt-[62px] sm:p-2 bg-gray-100 "
    >
      {/* Page Number and Navigation Controls at the Top */}
      <div className="w-full flex justify-between items-center mb-4 fixed top-0 z-[100] bg-white">
        {pageNo > 1 && (
          <button
            onClick={prevPage}
            className=" top-[250px] relative  p-1 sm:px-4 sm:py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
          >
            <CaretLeft size={20}/>
          </button>
        )}
        <span className="text-gray-500 ">
          Page {pageNo} of {numPages}
        </span>
        <div className=" hidden sm:flex justify-center "> 
        <span className="pr-1 hover:cursor-pointer">
          <ZoomIn size ={20} onClick={()=>setWidth((prev)=>prev+100)}/>  </span>
       <span className="pl-1 hover:cursor-pointer"> <ZoomOut size={20} onClick={()=>setWidth((prev)=>prev-100)}/></span>  
</div>
      
        {pageNo < numPages && (
          <button
            onClick={nextPage}
            className=" relative p-1  top-[250px] sm:px-4 sm:py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
          >
            <CaretRight size={20}/>
          </button>
        )}
      </div>

      {/* PDF Document Display */}
      <Document
        file={data}
        onLoadSuccess={({ numPages: numPagesInPdf }) => setNumPages(numPagesInPdf)}
        loading={<div className="text-gray-500 absolute z-[250] font-bold bg-white p-2 rounded-md text-center">PDF is loading...</div>}
        className="w-full  flex justify-center border border-gray-300 shadow-lg rounded-lg "
      >
        <Page pageNumber={pageNo} width={width} style={{fontSize:"10px"}} />
      </Document>
    </div>
  );
});

export default ShowSimplePdf;
