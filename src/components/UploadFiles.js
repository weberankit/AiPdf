import { getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";
import ShimmerEffect from "./ShimmerEffect";
import {  useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {uploadFile} from "../utils/hooksHelper"
const UploadFiles=()=>{
  const navigate=useNavigate()
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

    
     

   


    return(
<>

<div>
    <form onSubmit={ (e)=>{ e.preventDefault()
   handleFileChange()}
     }>
    <input type="file" onChange={handleFileChange} ></input>
   <p>please note that if your pdf files is scanned images i.e you are not able to select text then
    plz first click here to up tp 100mb mention pdf languags its free tool {<a href="https://www.pdf2go.com/create-searchable-pdf" target="_blank">convert</a>} and then upload
   
   or you can also use this for file size less than 15mb  plz mention pdf languges its free tool{<a href="https://www.ilovepdf.com/ocr-pdf" target="_blank">convert</a>}

   </p>
   <p>please note that if your files is  image then
    plz first click here to  {<a href="  https://www.ocr2edit.com/convert-to-txt" target="_blank">convert</a>} and then upload
   </p>

 

    </form>
   <div>{uploadProgress && <> <ShimmerEffect/>  { `upload percentage ${uploadProgress}%` }</>}</div>
    <h1>{error}</h1>
    

</div>


</>
    )
}
export default UploadFiles