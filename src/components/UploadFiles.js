import {langugesConstant} from "../utils/langugesConstant"
import Heading from "./Heading";
import { getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";
import ShimmerEffect from "./ShimmerEffect";
import {  useSelector ,useDispatch} from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
//import Header from "./Header"; 
import {uploadFile} from "../utils/hooksHelper"
import { gptValue,dicitValue,translateValue } from "../utils/aiManagment";
import { callUserInfoOnRefresh } from "../utils/hooksHelper";
import { infoUser } from "../utils/userSlice";
import { fireBaseErr } from "../utils/ErrorSlice"
import { addToogleNav } from "../utils/useStoreDataSlice";
import useBodybgDark from "../utils/useBodybgDark"
import useSupportLang from "../utils/useSupportLang";
//import ShowSimplePdf from "./ShowSimplePdf";
//import ShowSimpl
const UploadFiles=({step1stClass , stepThird })=>{

  const {upPage1,upPage2,upPage3,upPage4} =langugesConstant[useSupportLang()]
  const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)
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

//slectfiles
//const [customUrl , setCustomUrl] = useState()




// Get a reference to the storage service, which is used to create references in your storage bucket

    const handleFileChange = (e) => {
    
        const file = e.target.files[0];
        let maxSize = 300 * 1024 * 1024; // 300 MB

  if (!['application/pdf', 'text/plain'].includes(file?.type)) {
    alert(upPage3);
    file.value = '';
    return false;
  } else if (file?.size > maxSize) {
    alert(upPage4);
    file.value = '';
    return false; 
  }
      // console.log(file)
    
    // console.log(e.target.files,file)
        // Reset file input value to empty string
        //e.target.value = '';
     //   console.log(URL.createObjectURL(file))
     //  const urlt= URL.createObjectURL(file)
      // setCustomUrl(urlt)
      setFilePath(file)
     uploadFile(file,selectUsrDetail,setUploadProgress,navigate,setError)



    // <showSimplePdf data={URL.createObjectURL(file)}/>  
       // uploadFile(file)
       
        
      };

    
     

   /**
    * <div>{uploadProgress && <> <ShimmerEffect/>  { `upload percentage ${uploadProgress}%` }</>}</div>
    <h1>{error}</h1>
    
    * 
    */
//calling pages on refresh and also protecting when user play with url without login

   useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
   },[])
   useEffect(()=>{
    //alert("ll")  
    //-earlier- callUserInfoOnRefresh(navigate,selectUsrDetail,setUserInfo)
    callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser,setError,fireBaseErr)
    dispatch(addToogleNav())
    },[])

////black bg when upload pages is refresh changing the outer box bg to black
// because in filecart body bg is black so it remain when we move to upload page 
//but on refersh of upload page it does not have body colour so used same function that we had ised in filecart 
   
   // useBodybgDark()


    return(
<div className={``}>

<Heading/>



{ <div className="absolute top-[120px] left-0 right-0 h-[3rem] sm:text-center">{uploadProgress && <>  <ShimmerEffect/>  <div className="text-black font-semibold text-center  sm:mr-0 ">{upPage1}<em className="text-green-500">{uploadProgress} </em></div></>}
</div>

}
    
<div className=" text-center  pt-60 md:pt-36 mb-4">
  <div className="w-3/4 m-auto">
    <div className={` ${selectDarkToogle ?"darkMode " :"bg-gray-100"}     shadow-lg p-10 md:p-40 border border-dashed border-gray-600  w-full`}>
      <div className="p-6">
    <form onSubmit={ (e)=>{ e.preventDefault()
   handleFileChange()}
     }>
    
        
   
    <input id="files" name="file" type="file" accept=".pdf , .txt"  onChange={handleFileChange} ></input>
   <label for="files" className={` ${step1stClass} bg-white p-1 rounded-lg m-1 inputfile hover:bg-gray-300 hover:text-black transition-all duration-500`}>
      <div className="p-4 m-1 bg-gray-200 shadow-sm cursor-pointer "><h1 className="  text-3xl font-extrabold leading-0 md:leading-6 font-serif ">{upPage2}</h1></div>
    </label>
    <h1 className="text-red-900 text-center font-semibold ">{error}</h1>

</form>
</div>
</div>
</div>
   </div>




</div>
    )
}
export default UploadFiles