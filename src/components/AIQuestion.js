import { useLocation ,Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector ,useDispatch} from "react-redux"
import DisplayOption from "./DisplayOption"
import { addGenQuestion } from "../utils/genarateQuestionSlice"
const AIQuestion=()=>{
  const location=useLocation()
  let withoutUploadCsshandle=false
  const [controlSlide ,setControlSlide] =useState(0)  
  const refershStoredData=JSON.parse(sessionStorage.getItem("question")) 
  const selectGeneratedData=useSelector((store)=>store.useGenartedQues.questiondata) || refershStoredData
 
//storing in seesion if user refersh page 
if(selectGeneratedData){
  sessionStorage.setItem("question",JSON.stringify(selectGeneratedData))
}
const dispatch=useDispatch()





  let TotalLength=selectGeneratedData?.length-1
    //for css
    if(location?.pathname=="/withoutUpload/Questions"){
        //since we don't want to close the withouupload pdf so in route we have make it childeren 
        //also  here if we are at question pae we want to cover the page
     withoutUploadCsshandle=true
    }

    const pathgrab=location?.pathname?.split("/")?.slice(0)
    let backPathDynamic=`${pathgrab[1]}/pdfPages`
    if(location?.pathname === `/withoutUpload/Questions`){
      backPathDynamic ='withoutUpload'
    }

   function handleNext(){
     setControlSlide((prev)=>prev>=TotalLength?prev=0:prev+1)
   }
   function handlePrev(){
  
   setControlSlide((prev)=>{
  
    if(prev==0){
      return  prev=TotalLength
    }
    return prev-1
   })
   }
   //when user back then we have to null the question
   // reduxstore so when user open new pdf it will no show old data for even 100 ms
   function handleDataUserBack(){
    dispatch(addGenQuestion(null))
    //also we have to clear seesion store which used for show data when page refersh
    sessionStorage.removeItem("question")
   }

   if(!selectGeneratedData){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="text-center">
          <div className="flex justify-center">
          <span class="loaderquestionFallback"></span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Loading, please wait...</h1>
          <p className="mt-2 text-sm text-white">
            We're preparing your content. Thank you for your patience!
          </p>
        </div>
      </div>
    );
   }


          return (
            <>
              <div
                className={`${
                  withoutUploadCsshandle
                    ? "fixed z-[3000] h-[100vh] sm:h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm"
                    : "flex justify-center py-16"
                }`}
              >
                <div className=" w-full h-[100vh] overflow-scroll  max-w-4xl p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                  <Link onClick={handleDataUserBack} to={`/${backPathDynamic}`}>
                    <button className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold mb-6 transition duration-300 ease-in-out transform hover:scale-105">
                      Back
                    </button>
                  </Link>
          
                  
                  <div className="relative w-full h-[100hv] sm:h-[80vh] ">
  {selectGeneratedData &&
    selectGeneratedData.map((item, index) => (
      <div
        key={index}
        className={`absolute top-0 left-0 w-full h-full transition-all duration-500 transform ${
          index === controlSlide
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        }`}
      >
        <div className="text-2xl font-bold text-gray-800 mb-5">
          {item?.question}
        </div>
        <div className="space-y-4">
          <DisplayOption item={item} index={index} />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="text-white bg-gray-500 hover:bg-gray-600 px-5 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    ))}
</div>


                </div>
              </div>
            </>
          );
          


}







export default AIQuestion