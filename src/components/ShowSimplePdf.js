import {Document ,Page} from 'react-pdf'
import { useState } from 'react'

import { Text, View, StyleSheet } from '@react-pdf/renderer';
/*
 <Document className="react-pdf__Page__canvas"  file={data} onLoadSuccess={({ numPages: numPagesInPdf }) => {
        setNumPages(numPagesInPdf)}}  loading={"pdf is loading"}>
        <Page pageNumber={pageNo} />
       
    
 
  
      </Document>

*/

const ShowSimplePdf=({data})=>{
    const [numPages, setNumPages] = useState(0);
    const [pageNo ,setPageNo]=useState(1)

  

    console.log(pageNo,numPages)
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
          console.log(pageNo,numPages)
          setPageNo(pageNo-1)
          
        }
      }
      console.log(data)

   

return(
    <div className=''>
<div >
         {
 (pageNo==1) ? " " : <button className="bg-black font-semibold text-white p-1 rounded-lg m-1 fixed top-[260px] z-[100] left-0 text-[11px] md:text-base md:top-28 mt-8 md:left-56" onClick={prevPage}>{data&&"Prev"}</button>
  }
  </div>
  <div>
   {
 (pageNo>=numPages) ? " " : <button className="bg-black font-semibold text-white p-1 rounded-lg m-1 fixed text-[11px] md:text-base left-0 md:left-56 mt-8 top-[210px] z-[100] md:top-48" onClick={nextPage}>{data&&"Next"}</button>
  }
</div>

<div className=''>
   

    
<Document    file={data} onLoadSuccess={({ numPages: numPagesInPdf }) => {
        setNumPages(numPagesInPdf)}}  loading={"pdf is loading"}>
        <Page pageNumber={pageNo} />
       
    
 
  
      </Document>






</div>
 
    </div>
)
}

export default ShowSimplePdf