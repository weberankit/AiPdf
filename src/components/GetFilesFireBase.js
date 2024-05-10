import { getStorage, ref, getDownloadURL , deleteObject} from "firebase/storage";
import { toggler } from "../utils/userFiles";
import { useDispatch ,useSelector} from "react-redux";
import { textFile } from "../utils/userSlice";
//import { useSelector } from "react-redux"
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import DisplaySimplePdf from "./DisplaySimplePdf"
import ShowSimplePdf from "./ShowSimplePdf"
import {useState,useEffect} from "react"
import {addUrlAdvPdf, addUrlPdf} from "../utils/useStoreDataSlice"
import Joyride from 'react-joyride'; // Import Joyride
//import tourSteps from "../utils/tourSteps"
import {SecondTourSteps} from "../utils/tourSteps"







const GetFilesFireBase=({slectfileMeta,SetMsg ,setPrintFileName})=>{
const textAlertMsg="Please Download pdf after HighLight and don't refresh/close (as highlight lost) Because USING TRIAL VERSION"
const textMessageAlert="your highlighted text will be saved remains even after refresh in your  browser so use same browser ( because using free resources)"  
const dispatch=useDispatch()
   const storage=getStorage()
 const [deleteIndication ,setDeleteIndication] = useState(null)
  async function handleText(path) {
    try {
      const url = await getDownloadURL(ref(storage, path));
      const response = await fetch(url);
  
      if (!response.ok) {
       // throw new Error(`Error fetching file: ${response.statusText}`);
      }
  
      const text = await response.text();
      dispatch(textFile(text));
  
    } catch (error) {
      console.error('Error fetching file:');
    }
  }
   
  function handlePdf(path){
      getDownloadURL(ref(storage, path))
    .then((url) => {
      console.log(url) 
   //setDispatch(url)
   dispatch(addUrlPdf(url))
    
      SetMsg(null)
    })
    .catch((error) => {
      SetMsg("sorry their is some issue")
      // Handle any errors
    });
  }
  //handleAdvPdf(item._location.path)
  function handleAdvPdf(path ){
    getDownloadURL(ref(storage, path))
  .then((url) => {
    console.log(url) 
 dispatch(addUrlAdvPdf(url))
 
    SetMsg(null)
  })
  .catch((error) => {
    SetMsg("sorry their is some issue")
    // Handle any errors
  });
}  




  //console.log(a)
  
  
function handleDelete(path){
  setDeleteIndication("Wait Deleting the file")
    const desertRef = ref(storage, path);
  
    // Delete the file
    deleteObject(desertRef).then((item) => {
      dispatch(toggler())
      // File deleted successfully
      //console.log(item,"Items")
      dispatch(textFile(null))
     // setText(null)
     dispatch(addUrlPdf(null))
     dispatch(addUrlAdvPdf(null))
      //setUrl(null)
      //indicate
      setDeleteIndication(null)
    }).catch((error) => {
      // Uh-oh, an error occurred!
      setDeleteIndication("sorry not able to delete file please check network and retry")
    });
  
  
  }
 
  
  function handleReachTop(value){
 return (  window.scrollTo({
  top: value,
  behavior: 'smooth' // Option for smooth scrolling
})

 )

  }


  function MangeAlertMsgAdvPdf(){
    let getItem=sessionStorage.getItem("alertAdv") || null
    console.log(getItem)

    if(!getItem){
    alert(textAlertMsg)
    sessionStorage.setItem("alertAdv","done")
    }

  }
  function MangeAlertMsgProPdf(){
    let getItemPro=sessionStorage.getItem("alertPro") || null
    console.log(getItemPro)

    if(!getItemPro){
    alert(textMessageAlert)
    sessionStorage.setItem("alertPro","done")
    }

  }

//console.log("myurl",myurl)
/**/

const [lastStep,setLastStep] =useState(false)
useEffect(()=>{
  let tourSecond=localStorage.getItem("SecondtourCompleted")
  if(!tourSecond){
    if(slectfileMeta){
  setLastStep(true)
}
  }

},[])


const handleTourComplete = () => {
  // Set a flag in local storage indicating that the tour has been completed
  localStorage.setItem('SecondtourCompleted', 'true');
//  alert("j")
};

    return(
      <>
    {lastStep  && <Joyride 
          steps={SecondTourSteps} 
          continuous={true}
           //showProgress={true}
            showSkipButton={true}
             run={lastStep}
             callback={handleTourComplete} // Set a callback to mark tour as completed
             
             />}
<div className="step-1"></div>

    {deleteIndication &&  <div className="text-center  text-red-600 bg-black w-1/2 m-auto rounded-md  text-sm animate-pulse fixed  left-0 right-0">{deleteIndication}</div>}
        <div  className="w-2/3 m-auto  " > 
        {
slectfileMeta && slectfileMeta.map((item)=>{
//  console.log(item,item._location.path )
  const fileName=item._location.path.split("/").pop()
  const textFileidentify=item._location.path.split(".").pop()
  //textFileidentify==="txt"?setTextBtn()
 // console.log(textFileidentify)
 setPrintFileName(fileName)



  return(
  <>





  <div key={textFileidentify+Date.now()+9} className=" p-4 flex flex-row justify-between border  mb-14">

<div className="w-1/2">
<div className="w-[3.4rem] md:w-14">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ff0000" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
</div>
</div>


    <div className={`w-1/2 `}>

 <div >

 {
              //to open high level-pdf viewer
              textFileidentify !== "txt" &&  <button className=" bg-orange-600 hover:bg-yellow-500 text-black p-1 rounded-lg m-1 animate-pulse duration-1000 hover:animate-none text-sm md:text-base"  onClick={()=>{MangeAlertMsgAdvPdf();handleAdvPdf(item._location.path) ;
              handleReachTop(0);dispatch(addUrlPdf(null));  dispatch(textFile(null)) }}> Advance level pdf viewer</button>
            }
                  
     </div>

    <div className="font-semibold select-none m-1 text-sm">
    {fileName}</div>

               
</div>

<div className="w-1/2" >

            <div >

           
            
            

             { 
                   textFileidentify==="txt"?<button className="bg-green-500 text-white rounded-lg m-1 p-1 hover:bg-black text-sm md:text-base" onClick={()=>{handleText(item._location.path);dispatch(addUrlPdf(null));dispatch(addUrlAdvPdf(null));handleReachTop(0)}}>open text file</button> :  
                   <button className="bg-gray-600 text-white rounded-lg m-1 p-1 hover:bg-black text-sm md:text-base animate-pulse" onClick={()=>{ MangeAlertMsgProPdf();handlePdf(item._location.path);   handleReachTop(0);dispatch(addUrlAdvPdf(null)) ;  dispatch(textFile(null))}}>  Pro pdf viewer</button>

                  }
            </div>

 

                     <button className="bg-red-600 text-white m-1 p-1 rounded-lg" onClick={()=>{handleDelete(item._location.path )}}>Delete files</button>
                     </div>
                     </div>
  
  
  </>)
})
}
</div>    


</>  
    )
}
export default GetFilesFireBase