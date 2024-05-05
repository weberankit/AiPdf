import { getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";
import ShimmerEffect from "./ShimmerEffect";
import {  useSelector ,useDispatch} from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {uploadFile} from "../utils/hooksHelper"
import { gptValue,dicitValue,translateValue } from "../utils/aiManagment";

const UploadFiles=()=>{
  const navigate=useNavigate()
  const dispatch=useDispatch()
   //preventing from nwanted call of api when user reuses any 3 features
     //so basically closing component when user move to other page
     dispatch(translateValue(false))
     dispatch(dicitValue(false))
     dispatch(gptValue(false))
    
  const [filePath,setFilePath]=useState("")
  const[uploadProgress,setUploadProgress]=useState(null)
const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
const [error,setError] = useState("")
//console.log(selectUsrDetail)
// Get a reference to the storage service, which is used to create references in your storage bucket

    const handleFileChange = (e) => {
    
        const file = e.target.files[0];
        let maxSize = 300 * 1024 * 1024; // 300 MB

  if (!['application/pdf', 'text/plain'].includes(file?.type)) {
    alert('Please select either a PDF or TXT file.');
    file.value = '';
    return false;
  } else if (file?.size > maxSize) {
    alert('File size exceeds the maximum allowed limit (300MB) please contact me.');
    file.value = '';
    return false; 
  }
       console.log(file)
    
    // console.log(e.target.files,file)
        // Reset file input value to empty string
        //e.target.value = '';
        setFilePath(file)
        uploadFile(file,selectUsrDetail,setUploadProgress,navigate,setError)

       // uploadFile(file)
       
        
      };

    
     

   /**
    * <div>{uploadProgress && <> <ShimmerEffect/>  { `upload percentage ${uploadProgress}%` }</>}</div>
    <h1>{error}</h1>
    
    * 
    */


    return(
<>
{ <div className="absolute top-[120px] left-0 right-0 h-[3rem] sm:text-center">{uploadProgress && <>  <ShimmerEffect/>  <div className="text-black font-semibold text-center mr-24 sm:mr-0 ">Upload Status <em className="text-green-500">{uploadProgress}% </em></div></>}
</div>

}
    <h1 className="text-red-900 text-center">{error}</h1>
    
<div className="flex flex-row p-2 overflow-hidden pl-10 sm:pl-20 md:pl-2">
<div className="flex flex-col justify-center   ">
    <form onSubmit={ (e)=>{ e.preventDefault()
   handleFileChange()}
     }>
      <div className="flex flex-col md:flex-row w-full">
        <div className="text-2xl sm:text-3xl md:text-5xl text-black w-1/2 sm:w-3/4 md:w-1/2 ml-2">
          <p>upload pdf files enjoy the power of AiPDF</p>
          <p className="text-xs m-1 underline font-semibold animate-bounce hover:animate-none pt-4"><a target="_blank" rel="noopener noreferrer"  href="https://drive.google.com/file/d/1PxR3R5llnmp3yMlWdhFJf0BWsUQoVNdV/view?usp=sharing">click here to know how to use it</a></p>
        </div>
      <div className="  p-6 m-1 rounded-md w-1/2   flex flex-row justify-between">
        <div className="bg-black text-white w-2/3 sm:w-1/2 p-4 rounded-lg block h-44">
    <input className="text-xs md:text-base" type="file" accept=".pdf , .txt"  onChange={handleFileChange} ></input>
    <p className="mt-2 text-xs md:text-base">pdf and txt mode only</p>
    <p className="text-xs md:text-base">first read Instruction below</p>
    </div>
    <div className="w-1/2">
    <svg className="w-28 sm:w-44" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"/></svg>
    </div>
    </div>
</div>

    <div className="md:text-center p-4 ">Please Read Instruction Below 
      
    </div>
    <div className="flex flex-col md:flex-row justify-center md:justify-between pt-12 ">
   <p className=" text-white    bg-violet-500 rounded-lg p-4  md:mr-1 text-sm font-bold w-1/2  mb-2 ml-6 md:ml-0">If your pdf is scanned images pdf then you need to convert 
    --'100mb'{<a className="underline text-blue-950" rel="noopener noreferrer" href="https://www.pdf2go.com/create-searchable-pdf" target="_blank">convert</a>} and then upload
   
  

   </p>
   <p className="text-white w-1/2 bg-pink-950 rounded-lg p-4 md:ml-1 text-sm font-bold  mb-10 md:mb-2 ml-6"> If you want to Upload image then convert here first  {<a className="underline text-blue-950" rel="noopener noreferrer" href="  https://www.ocr2edit.com/convert-to-txt" target="_blank">convert</a>} and then upload
   </p>
</div>
 

    </form>
   

</div>
<div>

</div>
</div>

</>
    )
}
export default UploadFiles