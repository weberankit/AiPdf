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
       // console.log(file)
    
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
{ <div className="absolute top-[200px] left-0 right-0 h-[3rem] text-center">{ uploadProgress && <> <ShimmerEffect/>  <div className="text-black font-semibold ">{ `Upload Status ${uploadProgress}%` }</div></>}
</div>

}
    <h1 className="text-red-900 text-center">{error}</h1>
    
<div className="flex flex-row p-2">
<div className="flex flex-col justify-center   ">
    <form onSubmit={ (e)=>{ e.preventDefault()
   handleFileChange()}
     }>
      <div className="flex flex-row">
        <div className="text-5xl text-black w-1/2 ml-2">
          <p>Upload PDf Files EnjoY The power of AiPDF</p>
        </div>
      <div className="  p-6 m-1 rounded-md w-1/2   flex flex-row justify-between">
        <div className="bg-black text-white w-1/2 p-4 rounded-lg block h-44">
    <input type="file" accept=".pdf , .txt" onChange={handleFileChange} ></input>
    <p className="mt-2">pdf and txt mode only</p>
    <p>first read Instruction below</p>
    </div>
    <div className="w-1/2">
    <svg className="w-44" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"/></svg>
    </div>
    </div>
</div>

    <div className="text-center p-4">Please Read Instruction Below 
      
    </div>
    <div className="flex flex-row justify-between pt-12 ">
   <p className="text-white w-1/2 bg-violet-500 rounded-lg p-4 mr-1 text-sm font-bold">If your pdf is scanned images pdf then you need to convert 
    --'100mb'{<a className="underline text-blue-950" href="https://www.pdf2go.com/create-searchable-pdf" target="_blank">convert</a>} and then upload
   
  

   </p>
   <p className="text-white w-1/2 bg-pink-950 rounded-lg p-4 ml-1 text-sm font-bold"> If you want to Upload image then convert here first  {<a className="underline text-blue-950" href="  https://www.ocr2edit.com/convert-to-txt" target="_blank">convert</a>} and then upload
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