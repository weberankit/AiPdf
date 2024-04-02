import { getStorage, ref, getDownloadURL , deleteObject} from "firebase/storage";
import { toggler } from "../utils/userFiles";
import { useDispatch } from "react-redux";
import { textFile } from "../utils/userSlice";
//import { useSelector } from "react-redux"
const GetFilesFireBase=({slectfileMeta,SetMsg ,setUrl,setProUrl})=>{

   const dispatch=useDispatch()
   const storage=getStorage()

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
   
  
  function handlePdf(path ,set){
      getDownloadURL(ref(storage, path))
    .then((url) => {
   set(url)
     // console.log(url)
      SetMsg(null)
    })
    .catch((error) => {
      SetMsg("sorry their is some issue")
      // Handle any errors
    });
  }
  //console.log(a)
  
  
function handleDelete(path){
    const desertRef = ref(storage, path);
  
    // Delete the file
    deleteObject(desertRef).then((item) => {
      dispatch(toggler())
      // File deleted successfully
      //console.log(item,"Items")
      dispatch(textFile(null))
     // setText(null)
      setUrl(null)
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  
  
  }
 
  
  function handleReachTop(value){
 return (  window.scrollTo({
  top: value,
  behavior: 'smooth' // Option for smooth scrolling
})

 )

  }
  



    return(
        <>
        {
slectfileMeta && slectfileMeta.map((item)=>{
//  console.log(item,item._location.path )
  const fileName=item._location.path.split("/").pop()
  const textFileidentify=item._location.path.split(".").pop()
  //textFileidentify==="txt"?setTextBtn()
 // console.log(textFileidentify)
  return(
  <>
  <div className="p-4 bg-gray-500">
    <div>
    {fileName}</div>
                <div className="bg-white" >
                  { 
                   textFileidentify==="txt"?<button onClick={()=>{handleText(item._location.path);setUrl(null);setProUrl(null);handleReachTop(0)}}>click to open text file</button> :  
                   <button onClick={()=>{ handlePdf(item._location.path ,setUrl);   handleReachTop(0);setProUrl(null) ;  dispatch(textFile(null))}}>Click here to open pdf</button>

                  }</div>
            <div className="bg-sky-500">
            {
              //to open high level-pdf viewer
              textFileidentify !== "txt" &&  <button onClick={()=>{handlePdf(item._location.path,setProUrl) ;
              handleReachTop(0);setUrl(null);  dispatch(textFile(null)) }}>click to open High-level pdf viwer</button>
            }</div>

 

                     <button onClick={()=>handleDelete(item._location.path )}>Delete files</button>
                     </div>
  
  
  </>)
})
}
</>      
    )
}
export default GetFilesFireBase