
import React, { useState, useRef, useEffect } from 'react';
import { PdfLoader, PdfHighlighter, Tip, Highlight, AreaHighlight, Popup } from 'react-pdf-highlighter';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import DisplaySimplePdf from "./DisplaySimplePdf"
import { handlePrint } from '../utils/helper';





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

const ShowSimplePdf = ({ data ,printfileName }) => {
  console.log(data)
  const token=data.split("&token=")
  const keyForStoringHighlight=token[1]
  console.log(token)
  const [errorMessage, setErrorMessage] = useState();
 const[downloadBtnShow , setDownloaShow] =useState(null)


 // Clear local storage
 const clearLocalStorage = () => {

  try {
    if(token){
    localStorage.removeItem(token[1])

    alert('this file highlight storage in local is cleared successfully! now You can Highlight text ');
    setErrorMessage(null)

    }
  
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      setErrorMessage('not able to clear this file highlights local storage please try again ');

    } else {
      setErrorMessage('not able to clear this file highlights local storage please try again ')
    }
  }
};

// Handle local storage quota exceeded error
const handleLocalStorageError = (error) => {

  if (error.name === 'QuotaExceededError') {
    setErrorMessage('As because of Limited free resources used your local browser to store your highlighted  so its memory spaces can be completely full  please click on button CLEAR THE HIGHLIGHT, your Highlighted text of this file will be lost  so download Highlighted text from below');

  } else {
    setErrorMessage('As because of Limited free resources  used your local browser to store your highlighted  ,Not able to access local storage  please click on button CLEAR THE HIGHLIGHT , your Highlighted text of this file will be lost so download Highlighted text from below');
    
  }
};


  const highlightsFromStorage = JSON.parse(localStorage.getItem(`${keyForStoringHighlight}`));
  const [highlights, setHighlights] = useState(highlightsFromStorage || []);

  const pdfHighlighter = useRef(null);
  let timer= setTimeout(()=>{setDownloaShow(true)},7000)

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
  }else{
    console.log("not deleted")
  }
}

  return (
    <div className="a">



{
errorMessage && <div className='bg-black fixed top-0 p-14 text-white text-sm z-[1003] w-full left-0'>
 
  
<button className='bg-white text-black p-2 rounded-md ' onClick={()=>setErrorMessage(null)}>close</button>
{/* Error message errorMessage &&*/}
{ <div className='mr-4 w-full sm:w-5/6 text-red-700'>{errorMessage}</div>}

 <button className='bg-red-600 p-1 text-sm rounded-lg m-2 hover:bg-green-700' onClick={clearLocalStorage}>Clear the Highlight </button>
<p className="p-1 m-1 text-green-500 animate-pulse hover:cursor-pointer hover:animate-none hover:text-white" onClick={()=>handlePrint( keyForStoringHighlight,printfileName)}>Download the Highlighted text of this file before clear the Highlights</p>

<p className='text-xs '>first click on clear the HighLight button above if error continue then click below Danger button but this will clear all highlights</p>

<button className='bg-red-600 text-white m-1 p-1 text-xs rounded-md hover:bg-yellow-800' onClick={()=>handleClear()}>Danger</button>
</div>


}
{
downloadBtnShow && <div className=' fixed left-[162px] w-6 parent  top-[24px]   p-1 m-1 text-sm' onClick={()=>handlePrint(keyForStoringHighlight,printfileName)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg><p className="element absolute top-[-10px] bg-gray-700 z-[430] px-4 w-44">Downlod your Highlighted text</p></div>
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


