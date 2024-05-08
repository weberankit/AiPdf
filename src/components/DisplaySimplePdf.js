


import { PdfLoader, PdfHighlighter, Tip, Highlight, AreaHighlight, Popup } from 'react-pdf-highlighter';
import { Document} from '@react-pdf/renderer';



const DisplaySimplePdf=({deleteHighlight,data,pdfHighlighter,handleLocalStorageError,clearLocalStorage,HighlightPopup,addHighlight,updateHighlight,highlights})=>{
   

   
    return(

<Document  >

    <div className="App" style={{ display: "flex", height: "100vh"  }}>
    
   

      <PdfLoader url={data} beforeLoad={<div>Loading...</div>}>
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
   
    </Document>




    )
}

export default DisplaySimplePdf

