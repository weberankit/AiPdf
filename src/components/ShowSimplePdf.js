import {Document ,Page} from 'react-pdf'
import { useState } from 'react'

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
    <div >
<div >
         {
 (pageNo==1) ? " " : <button className="bg-black font-semibold text-white p-1 rounded-lg m-1 fixed top-28 mt-8 left-56" onClick={prevPage}>{data&&"Prev"}</button>
  }
  </div>
  <div>
   {
 (pageNo>=numPages) ? " " : <button className="bg-black font-semibold text-white p-1 rounded-lg m-1 fixed left-56 mt-8" onClick={nextPage}>{data&&"Next"}</button>
  }
</div>


    <Document file={data} onLoadSuccess={({ numPages: numPagesInPdf }) => {
        setNumPages(numPagesInPdf)}}  loading={"pdf is loading"}>
        <Page pageNumber={pageNo} />
       
    
 
  
      </Document>

 
    </div>
)
}

export default ShowSimplePdf