import { useState } from "react";
import ShowSimplePdf from "./ShowSimplePdf"
import {Link, Outlet, useLocation} from 'react-router-dom';
import SelectionWord from "../utils/selectionWord";
import useStatusCheck from "../utils/useStatusCheck";
import useSupportLang from "../utils/useSupportLang";
import AiComponents from "./AiComponents";
import { langugesConstant } from "../utils/langugesConstant";
import {useSelector,useDispatch} from "react-redux"
import { addUrlPdf } from "../utils/useStoreDataSlice";
const Pages=()=>{
  const selectPdfUrl=useSelector((store)=>store.useDataSlice.pdfUrl)

  /* */ let olddata =
    "https://firebasestorage.googleapis.com/v0/b/aipdf-375e4.appspot.com/o/path%2Fto%2FvFnr7xaXckVqklAYwqtOSUaZiCs2%2Fimpfile-not-del.pdf?alt=media&token=4b62ac1b-0158-44f1-ac54-429ec055c24b";
  let pdataUrl =selectPdfUrl ||
    "https://firebasestorage.googleapis.com/v0/b/aipdf-375e4.appspot.com/o/path%2Fto%2FEgQ26O1NkGZZkQTq5KuCPOHHJ532%2Fsocial-issues-in-india--53498f83.pdf?alt=media&token=926b3ce0-6fd6-4523-b206-7dcbf1812823" ||
    olddata;
    
    const {  sign3 } = langugesConstant[useSupportLang()];
    const [sideBarShow, setSideBarShow] = useState(null);
    useStatusCheck();
    SelectionWord(setSideBarShow);
    const path=useLocation()
    const dispatch=useDispatch()

    if(selectPdfUrl){
    sessionStorage.setItem("cartPdfLink",selectPdfUrl)
    }
    const getPdfCartLink=sessionStorage.getItem("cartPdfLink") || ""

    let dataUrl = selectPdfUrl ||  getPdfCartLink
    console.log(dataUrl)
      if(path?.pathname==="/showDemo/pdfPages"){
        //when we play video and move back in showdemo then url lost aswe send froom link state
        //so to fix it provide default 
        dataUrl=pdataUrl
      }
    const pathgrab=path?.pathname?.split("/")?.slice(0)
   
 
  function handleClose(){
    //used to close the upladed pdf url set to null on redux --- 
    //on cart route using pdfurl to hide all other so making it null
    dispatch(addUrlPdf(null))
  }


    return(
        <>
 <Outlet/>
     <div>
          {dataUrl && (
            <div className="absolute z-[1000] mt-9">
             
              {sideBarShow && <AiComponents />}
            </div>
          )}
        {dataUrl && (
 <Link to={`/${pathgrab[1]}`} onClick={handleClose}> <button
    className="bg-red-600 font-semibold text-white p-1 rounded-lg top-[80px] sm:top-[100px] text-[11px] md:text-base fixed left-1 z-[500]"
   
  >
    {sign3}
  </button></Link>
)}

          <div className=" mt-[70px] sm:mt-[50px] ">
           
            {dataUrl && (<>
              <ShowSimplePdf data={dataUrl} printfileName={"demoPdf"} /> 
             
              </>
            )}
          </div>
        </div>


        </>
    )
}
export default Pages