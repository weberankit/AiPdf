import { getStorage, ref, getDownloadURL , deleteObject} from "firebase/storage";
import { toggler } from "../utils/userFiles";
import { useDispatch } from "react-redux";
import { textFile } from "../utils/userSlice";
//import { useSelector } from "react-redux"
const GetFilesFireBase=({slectfileMeta,SetMsg ,setUrl,setProUrl})=>{
const textAlertMsg="Please Download pdf after HighLight and don't refresh/close (as highlight lost) Because USING TRIAL VERSION"
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
        <div  className="w-2/3 m-auto" > 
        {
slectfileMeta && slectfileMeta.map((item)=>{
//  console.log(item,item._location.path )
  const fileName=item._location.path.split("/").pop()
  const textFileidentify=item._location.path.split(".").pop()
  //textFileidentify==="txt"?setTextBtn()
 // console.log(textFileidentify)
  return(
  <>
  <div key={textFileidentify+Date.now()+9} className="p-4 flex flex-row justify-between border  mt-2">

<div className="w-1/2">
<div className="w-[3.4rem] md:w-14">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ff0000" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
</div>
</div>


    <div className="w-1/2">

 <div >

 {
              //to open high level-pdf viewer
              textFileidentify !== "txt" &&  <button className=" bg-orange-600 hover:bg-yellow-500 text-black p-1 rounded-lg m-1 animate-pulse duration-1000 hover:animate-none text-sm md:text-base"  onClick={()=>{alert(textAlertMsg);handlePdf(item._location.path,setProUrl) ;
              handleReachTop(0);setUrl(null);  dispatch(textFile(null)) }}> Advance level pdf viewer</button>
            }
                  
     </div>

    <div className="font-semibold select-none m-1 text-sm">
    {fileName}</div>

               
</div>

<div className="w-1/2" >

            <div >

           
            
            

             { 
                   textFileidentify==="txt"?<button className="bg-green-500 text-white rounded-lg m-1 p-1 hover:bg-black text-sm md:text-base" onClick={()=>{handleText(item._location.path);setUrl(null);setProUrl(null);handleReachTop(0)}}>open text file</button> :  
                   <button className="bg-gray-600 text-white rounded-lg m-1 p-1 hover:bg-black text-sm md:text-base" onClick={()=>{ handlePdf(item._location.path ,setUrl);   handleReachTop(0);setProUrl(null) ;  dispatch(textFile(null))}}>  Simple pdf viewer</button>

                  }
            </div>

 

                     <button className="bg-red-600 text-white m-1 p-1 rounded-lg" onClick={()=>handleDelete(item._location.path )}>Delete files</button>
                     </div>
                     </div>
  
  
  </>)
})
}
</div>      
    )
}
export default GetFilesFireBase