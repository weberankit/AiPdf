
import { PdfLoader, PdfHighlighter, Tip, Highlight, AreaHighlight, Popup } from 'react-pdf-highlighter';
import { Document,Page} from '@react-pdf/renderer';
import {langugesConstant} from "../utils/langugesConstant"





import {useRef,useEffect} from "react"
import {useSelector} from "react-redux"
import useSupportLang from '../utils/useSupportLang';

const DisplaySimplePdf=({deleteHighlight,data,pdfHighlighter,handleLocalStorageError,clearLocalStorage,HighlightPopup,addHighlight,updateHighlight,highlights})=>{




const {display1,display2} =langugesConstant[useSupportLang()]
 const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)

  // console.log(numPages,"this is page no")

/*futher we will add this features also
   let scrollInterval;

   function handleScroll() {
     console.log("Scrolling...");
     const divd = document.querySelector(".PdfHighlighter");
     console.log(divd, "get the div");
   
     // Start scrolling continuously
     scrollInterval = setInterval(() => {
       divd.scrollTop -= 50; // Adjust scrolling speed as needed
     }, 100); // Adjust the interval for smoother scrolling
   
     // Stop scrolling when the button is released
     window.addEventListener("mouseup", () => {
       clearInterval(scrollInterval);
     });
   }  <button onClick={()=>handleScroll()}>manin</button> */

const pageInput=useRef()

   function scrollToPage() {
    const pageElement = document.querySelector(`.page[data-page-number="${pageInput.current.value.trim()}"] `);
    
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
    //  console.log(`Page ${pageNumber} not found.`);
      alert("please provide correct page no ")
    }
  }
  //scrollToPage(2); // Scrolls to page with data-page-number="2"
  //scrollToPage(100003); // Scrolls to page with data-page-number="3"
/*  useEffect(()=>{

if (selectDarkToogle){
let documentPdf =document.querySelectorAll(".textLayer")
   console.log(documentPdf)
    if(documentPdf){
      documentPdf.forEach((item)=>{
        item.style.backgroundColor="#808080"
      })
      
    }
}

    
   
    })*/



    return(

<>

<div className=" fixed z-[99] left-14 top-4  m-2 ">
<form onSubmit={(e)=>e.preventDefault()}>
  <input className="w-11 border border-black m-1  p-2 rounded-lg text-xs" placeholder="1" ref={pageInput}></input>
<button onClick={()=>scrollToPage() } className="text-white bg-black rounded-lg p-2 m-1 hover:bg-yellow-500">{display2}</button>
</form>
</div>
<Document  >

    <div className="App" style={{ display: "flex", height: "100vh"  }}>
    
   

      <PdfLoader url={data} beforeLoad={<div className='text-center font-bold  w-full m-auto'>{display1}</div>}
      //onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
      
      >
        {pdfDocument => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            ref={pdfHighlighter}
            scrollRef={scrollTo => {}}
            onLocalStorageError={handleLocalStorageError}
            highlights={highlights}
            enableAreaSelection={event => event.altKey}
            onSelectionFinished={(
              position,
              content,
              hideTipAndSelection,
              transformSelection
            ) => (
              <Tip
                onOpen={transformSelection}
                onConfirm={comment => {
                  addHighlight({ content, position, comment });
                  hideTipAndSelection();
                }}
              />
            )}
            highlightTransform={(
              highlight,
              index,
              setTip,
              hideTip,
              viewportToScaled,
              screenshot,
              isScrolledTo
            ) => {
              const isTextHighlight = !Boolean(
                highlight.content && highlight.content.image
              );
            
              const component = isTextHighlight ? (
                <Highlight
                  isScrolledTo={isScrolledTo}
                  position={highlight.position}
                  comment={highlight.comment}
                />
              ) : (
                <AreaHighlight
                  highlight={highlight}
                  onChange={boundingRect => {
                    updateHighlight(
                      highlight.id,
                      { boundingRect: viewportToScaled(boundingRect) },
                      { image: screenshot(boundingRect) }
                    );
                  }}
                />
              );

              return (
                <Popup
                  popupContent={
                    <HighlightPopup
                      comment={highlight.comment}
                      onDelete={() => deleteHighlight(index)}
                    />
                  }
                  onMouseOver={popupContent => setTip(highlight, highlight => popupContent)}
                  onMouseOut={hideTip}
                  key={index}
                  children={component}
                />
              );
            }}
          />
        )}
      </PdfLoader>
     
   
    </div>
    <Page  pageNumber={5} />
    </Document>


    </>


    )
}

export default DisplaySimplePdf