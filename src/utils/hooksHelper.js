import {onAuthStateChanged ,getAuth} from "firebase/auth"
import {ref,listAll ,getStorage ,uploadBytes,uploadBytesResumable} from "firebase/storage"
//import { fireBaseErr } from "./ErrorSlice";

export function callUserInfoOnRefresh(navigate,selectUsrDetail,dispatch,infoUser,SetMsg,fireBaseErr){
    const auth = getAuth();
 
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            navigate("/");
          //  console.log("use")
          }
        
    
          if(!selectUsrDetail){
          //   console.log(user,"USER")
             //newly
             if(!user)return
             if(!user.emailVerified){
              navigate("/")
              return
             }
             const {uid ,email,displayName}= user ;
         //    console.log(uid,email)
             dispatch(infoUser({uid:uid ,email:email,displayName:displayName}))
             SetMsg(null)
            //call function will call initally when page refersh amd  it does not have user detail
            //so call function have firebase error .
            //so after that callrefersh function call so we have to remove the call function firebase error 
             if(fireBaseErr){
                setTimeout(()=>{dispatch(fireBaseErr(null))},3000) 
             }
         
           //dispatch(fireBaseErr(null))
        }
    
        });
    
    }


export    function call(storage,directoryPath,dispatch,addFile,SetMsg,fireBaseErr){
        const check= listAll(ref(storage, directoryPath))
            .then((res) => {
              // Filter out only PDF files
            //  console.log(res,"res")
              const pdfFiles = res.items.filter((item) => item.name.endsWith('.pdf') || item.name.endsWith('.txt'));
           //   console.log(pdfFiles,"pdfFiles")
               dispatch(addFile(pdfFiles))
       pdfFiles.length===0?SetMsg("your have not uploaded any file ,use correct login id"):SetMsg(null)
              //setPdfFiles(pdfFiles);
            //  console.log(pdfFiles)
         
          //  pdfFiles.length===0?dispatch(fireBaseErr("your have not uploaded any file use correct login id")):dispatch(fireBaseErr(null))
           if(fireBaseErr) { dispatch(fireBaseErr(null))}
            })
            .catch((error) => {
              console.error('Error getting PDF files:', error);
            //  SetMsg("sorry not getting your details from firebase")
            if(fireBaseErr){
               dispatch(fireBaseErr("sorry not getting your details, check your internet"))
            }
           
            
            })
          
       console.log(check,"checking")
       //check.then((item)=>console.log(item))
          }


export const uploadFile = (fileData,selectUsrDetail,setUploadProgress,navigate,setError) => {
    // Create a reference to the path where you want to upload the file
    const storage = getStorage();
 const storageRef = ref(storage, `path/to/${selectUsrDetail.uid}/${fileData.name}`);
    // Upload the file using the uploadBytes function
const checkingUpload = uploadBytes(storageRef, fileData);
 const uploadTask = uploadBytesResumable(storageRef, fileData);
 uploadTask.on('state_changed', 
 (snapshot) => {
   // Observe state change events such as progress, pause, and resume
   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
   setUploadProgress('Upload is ' + Math.floor( progress) + '% done')
   switch (snapshot.state) {
     case 'paused':
       console.log('Upload is paused');
       setUploadProgress('Upload is paused')
       break;
     case 'running':
       console.log('Upload is running');
       break;
   }
 }, (error) => {
  // Handle unsuccessful uploads
  console.log(error,"error")
},)
//console.log(checkingUpload )
checkingUpload.then((item)=>{
  console.log(item)
  navigate("/cart")
}).catch((error)=>{
  console.log(error,"error")
  setError("their is some issue")
})
console.log(checkingUpload)
 return checkingUpload
  
  };
 




