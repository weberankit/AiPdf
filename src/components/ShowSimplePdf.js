import {Document ,Page} from 'react-pdf'
import { useState } from 'react'

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