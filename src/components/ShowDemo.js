import { langugesConstant } from "../utils/langugesConstant";

import AiComponents from "./AiComponents";
import ShowPdf from "./ShowPdf";
import ShowSimplePdf from "./ShowSimplePdf";
import SelectionWord from "../utils/selectionWord";
import useStatusCheck from "../utils/useStatusCheck";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link ,Navigate ,Outlet ,useLocation,useNavigate} from "react-router-dom";
import useSupportLang from "../utils/useSupportLang";
//import { Outlet } from "react-bootstrap-icons";
//import { useSignBgOnRefresh } from "../utils/useBodybgDark"
const ShowDemo = () => {
  const { sign3, file3, file2, demo1, fileDisplay1 } =
    langugesConstant[useSupportLang()];
  const selectDarkToogle = useSelector(
    (store) => store.userInformation.darkModes
  );
  // useSignBgOnRefresh()
  const [sideBarShow, setSideBarShow] = useState(null);
  useStatusCheck();
  SelectionWord(setSideBarShow);
  let olddata =
    "https://firebasestorage.googleapis.com/v0/b/aipdf-375e4.appspot.com/o/path%2Fto%2FvFnr7xaXckVqklAYwqtOSUaZiCs2%2Fimpfile-not-del.pdf?alt=media&token=4b62ac1b-0158-44f1-ac54-429ec055c24b";
  let data =
    "https://firebasestorage.googleapis.com/v0/b/aipdf-375e4.appspot.com/o/path%2Fto%2FEgQ26O1NkGZZkQTq5KuCPOHHJ532%2Fsocial-issues-in-india--53498f83.pdf?alt=media&token=926b3ce0-6fd6-4523-b206-7dcbf1812823" ||
    olddata;

  const [dataUrlAdv, SetDataUrlAdv] = useState(null);
  
  const location=useLocation()
  function scroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    const modeLocal = localStorage.getItem("darkModes");
    if (selectDarkToogle) {
      document.body.style.backgroundColor = "#242a33";
    }
    //help when user refersh  showdemo pages
    if (modeLocal === "black") {
      document.body.style.backgroundColor = "#242a33";
    }

    return () => (document.body.style.backgroundColor = "white");
  }, []);


  return (
    <>
   
    {/**back button */}
      <Link to={"/"}>
        <div
          className={` ${dataUrlAdv ? `hidden` : ""}  bg-black text-center p-2 rounded-lg m-1 text-white w-24 m-auto text-sm  `}
        >
          {sign3}
        </div>
      </Link>

      <div className="">

        {/*to display 2nd-pdf--using this same component .-- please note-for new pdf display using route-method to display1st one */}
        <div
          className={` ${
            dataUrlAdv
              ? ` bg-white top-0 left-0 right-0 bottom-0 h-screen  absolute z-[999]`
              : ""
          }  `}
        >
          {dataUrlAdv && (
            <div className="absolute z-[1000] mt-9">
              {" "}
              {sideBarShow && <AiComponents />}
            </div>
          )}
          {dataUrlAdv && (
            <button
              className="  bg-red-600 font-semibold text-white p-1 rounded-lg top-[0px] sm:top-[100px] text-[11px] md:text-base fixed left-1 z-[50]"
              onClick={() => {
                SetDataUrlAdv(null); 
                setSideBarShow(null);
                scroll();
              }}
            >
              {fileDisplay1}
            </button>
          )}
          <div className=" mt-[70px] sm:mt-[50px] ">
            {" "}
            {dataUrlAdv && <ShowPdf data={dataUrlAdv} />}
          </div>
        </div>

        

  {/**to display buttons */}

        <div className="pt-4">
          <div className="text-center">
            <b className="">{demo1}</b>
            <div className=" grid grid-cols-2  sm:flex sm:flex-row sm:justify-center mt-6 p-20 sm:p-32 bg-gray-100 shadow-lg rounded-lg  w-4/5 h-48 sm:h-auto sm:w-1/2 m-auto ">
              <div className="">
             <Link to={"pdfPages"} state={{url:data}}>  <button
                  className="text-sm font-semibold sm:text-base font-serif bg-black p-2 text-white sm:hover:text-black rounded-lg m-2 mr-2 sm:backdrop sm:hover:bg-white sm:hover:transition-all duration-500 relative"
               
                >
                  <span className="text-white absolute top-[-5px] right-0 text-xs bg-red-500 p-[1px] rounded-md">
                    new
                  </span>
                  {file2}
                </button></Link> 
              </div>
              <div>
                <button
                  className="text-sm font-semibold sm:text-base font-serif bg-black p-2 text-white sm:hover:text-black rounded-lg m-2 mr-2 sm:hover:bg-white sm:hover:transition-all duration-500"
                  onClick={() => {
                    SetDataUrlAdv(data);
                  
                  }}
                >
                  {file3}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDemo;
