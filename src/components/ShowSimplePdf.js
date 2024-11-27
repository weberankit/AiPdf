import "react-pdf/dist/esm/Page/TextLayer.css";

import { useState, useRef, useEffect, memo } from "react";
import { Document, Page } from "react-pdf";
import { ZoomIn, ZoomOut, CaretLeft, CaretRight } from "react-bootstrap-icons";
import { handleAiVideo } from "../utils/youtubeVideosFun";
import { useSelector, useDispatch } from "react-redux";
import {
  addListYt,
  addShowMsgi,
  addQueryInput,
} from "../utils/dataYoutubeSlice";
import VideoShow from "./VideoShow";
import SelectionWord from "../utils/selectionWord";
import { useNavigate,Outlet,useLocation,Link } from "react-router-dom";
import questionGenerate from "../utils/questionGenerate";
import { addGenQuestion } from "../utils/genarateQuestionSlice";

const ShowSimplePdf = memo(({ data }) => {

const location=useLocation()

let getPageno=1
//when user move to questiontab on cart--pageno state lost so setting it 
if(location?.pathname==="/cart/pdfPages"){
  getPageno=parseInt( sessionStorage.getItem("pageNo")) 
}



 
  const [numPages, setNumPages] = useState(0);
  

  const [pageNo, setPageNo] = useState(getPageno||1);
  const [width, setWidth] = useState(0);
  const navigate=useNavigate()
  const [sideBarShow, setSideBarShow] = useState(null);
  const pageRef = useRef();
  const [pageTextload, setPageTextLoad] = useState(null);
  const containerRef = useRef();
  const dispatch = useDispatch();
  const selectTextYtVideo = useSelector((store) => store.useYtSlice.queryInput);
  
  const pathgrab=location?.pathname?.split("/")?.slice(0)
  SelectionWord(setSideBarShow);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
   
    //when user back then we have to null the question store from redux and seesionstorage
   //so when user open new pdf it will no show old data for even 100 ms
  dispatch(addGenQuestion(null))
  //also we have to clear seesion store which used for show data when page refersh
  sessionStorage.removeItem("question")
  //so after inital page setup when user move to question tab ,the page updated from session
  //and after inital render useefeect run so clearing it by this when user open
  //other pdf it will not interfere
  sessionStorage.removeItem("pageNo")

    window.addEventListener("resize", updateWidth);
    return () =>{ window.removeEventListener("resize", updateWidth);
                   }
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

  function handleSubmitGo(e) {
    e.preventDefault();

    setPageNo(() => {
      let valueUser = parseInt(e.target[0].value);
      if (valueUser > numPages) {
        alert("your file does not have this page");
        return pageNo;
      }
      if (valueUser < 1) {
        alert("provide correct page please");
        return pageNo;
      }

      return valueUser;
    });

    e.target[0].value = null;
  }

  

 function handleQuestion(){

const text=pageRef?.current?.textContent
if(text?.trim()?.length>=50){
questionGenerate(text,dispatch,addGenQuestion)
navigate(`/${pathgrab[1]}/Questions`)
//only set when we at cart page so it will not interfer in other route open---as same component is using 
location?.pathname==="/cart/pdfPages" && sessionStorage.setItem("pageNo",pageNo)
}else{
  alert("text words must be greater than 50")
  return;
}

}




  return (
    <>

<div>
      <VideoShow checkClick={sideBarShow} />
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
              <CaretLeft size={20} />
            </button>
          )}

          <span className="text-gray-500 flex flex-row justify-center  w-full  py-1">
            Page {pageNo} of {numPages}
            <form className="ml-3 sm:ml-9" onSubmit={(e) => handleSubmitGo(e)}>
              <input
                required
                type="number"
                className="w-11 border border-gray-500"
                placeholder=""
              ></input>
              <button className="font-bold ml-1" type="submit">
                Go
              </button>
            </form>
            <button
              className="bg-black text-white font-bold py-1 px-4 rounded-md ml-7 sm:ml-12 transition duration-300 ease-in-out transform hover:scale-105  focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg shadow-red-500/50 animate-spin-outline"
              onClick={() =>
                handleAiVideo(
                  selectTextYtVideo,
                  dispatch,
                  addListYt,
                  addShowMsgi,
                  addQueryInput,
                  sideBarShow
                )
              }
            >
              <span className=" text-red-500  bg-black bg-opacity-40 ">
                
                Ai-VIDEO
              </span>
            </button>
          { pageTextload && <button className="relative" onClick={handleQuestion} ><span className= 'text-xs text-white absolute right-0 hidden sm:block top-[-6px] z-50 p-[1px] rounded-l-md bg-black'>Beta✨</span>  <span className=" text-xs sm:text-sm text-nowrap  py-2  m-1 ml-9 px-3 hover:bg-black bg-blue-500 font-bold text-white rounded-md">Generate-MCQ</span></button>}
         
          </span>

          <div className=" hidden sm:flex justify-center ">
            <span className="pr-1 hover:cursor-pointer">
              <ZoomIn
                size={20}
                onClick={() => setWidth((prev) => prev + 100)}
              />{" "}
            </span>
            <span className="pl-1 hover:cursor-pointer">
              {" "}
              <ZoomOut
                size={20}
                onClick={() => setWidth((prev) => prev - 100)}
              />
            </span>
          </div>

          {pageNo < numPages && (
            <button
              onClick={nextPage}
              className=" relative p-1  top-[250px] sm:px-4 sm:py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
            >
              <CaretRight size={20} />
            </button>
          )}
        </div>

        {/* PDF Document Display */}
        <Document
          file={data}
          onLoadSuccess={({ numPages: numPagesInPdf }) =>
            setNumPages(numPagesInPdf)
          }
          loading={
            <div className="text-gray-500 absolute z-[250] font-bold bg-white p-2 rounded-md text-center top-0">
              PDF is loading...
            </div>
          }
          className="w-full  flex justify-center border border-gray-300 shadow-lg rounded-lg "
        >
          <div ref={pageRef}>
            <Page
              pageNumber={pageNo}
              onLoadSuccess={() => {setPageTextLoad(true)}}
              width={width}
              style={{ fontSize: "10px" }}
            />
          </div>
        </Document>
      </div>
      </div>



    </>
  );
});

export default ShowSimplePdf;
