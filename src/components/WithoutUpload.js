
import { useState ,useEffect} from "react";
import useSupportLang from "../utils/useSupportLang";
//import { langugesConstant } from "../utils/langugesConstant";
import ShowSimplePdf from "./ShowSimplePdf";
import AiComponents from "./AiComponents";
import SelectionWord from "../utils/selectionWord";
import useStatusCheck from "../utils/useStatusCheck";
import { Link,Outlet } from "react-router-dom";
//import { useDispatch} from "react-redux";
import {onAuthStateChanged ,getAuth} from "firebase/auth"
//import { infoUser } from "../utils/userSlice";
//import { loadingState } from "../utils/userSlice";
import { langugesConstant } from "../utils/langugesConstant";
import useKeyUpdate from "../utils/useKeyUpdate";
import { useSelector } from "react-redux";


const WithoutUpload = () => {
   const { upPage1, upPage2, upPage3, upPage4 ,nav1,showPdf6,fileOpen} = langugesConstant[useSupportLang()];
   const getUrlFromLocal=null
   
   const [fileCustom, setFileCustom] = useState(getUrlFromLocal);
//-   const [sideBarShow, setSideBarShow] = useState(null);
   const [message, setMessage] = useState(false);
   let countFreeTrial = localStorage.getItem("check") || null;
 //console.log(countFreeTrial)
   // const dispatch = useDispatch();
   // const selector = useSelector((store) => store.userInformation.value);
   //const selectUsrDetail=useSelector(store=>store?.userInformation?.value)
   const readDataToggle=useSelector((store)=>store.aiManage?.readDataToggle)
   const auth = getAuth();
 const [userId , setUserId] =useState()
   useEffect(() => {
     // each visit check login or not
     let loginApi = onAuthStateChanged(auth, (user) => {
       if (user?.emailVerified) {
         // const {uid, email, displayName, photoURL} = user;
         // dispatch(infoUser({uid: uid, email: email, displayName: displayName}));
         // dispatch(loadingState(null));

         //user visit after sigin so no need to provide free trial msg
        //-- localStorage.setItem("check", null);
        setUserId(user?.uid)
       } else {
         // User is signed out
         // not login so free trial 3-times
       // console.log(countFreeTrial)
          setMessage(true);
         if (!countFreeTrial || countFreeTrial == 'NaN') {
           localStorage.setItem("check", 4);
          
         }
       }
     });
   }, []);
 
   const [sideBarShow , setSideBarShow]=useState(null)
   useStatusCheck()
   SelectionWord(setSideBarShow)
 //calling for updating api key fromfirebase
useKeyUpdate(userId,readDataToggle)

   const handleFileChange = (e) => {
     const file = e.target.files[0];
     let maxSize = 300 * 1024 * 1024; // 300 MB
 
     if (!["application/pdf"].includes(file?.type)) {
       alert(upPage3);
       e.target.value = "";
       return false;
     } else if (file?.size > maxSize) {
       alert(upPage4);
       e.target.value = "";
       return false;
     }
     // only 3 times without login
     if (countFreeTrial && message) {
       if (countFreeTrial <= 1) {
         alert("please signin to use it");
         e.target.value = "";
         return false;
       }
 
       let cal = countFreeTrial - 1;
       localStorage.setItem("check", cal);
     }
 
     const url = URL.createObjectURL(file);
     setFileCustom(url);
     //console.log(url,url["blob"])
     
   };
 //console.log(sideBarShow)


   return (
     <div className="">
      <Outlet/>
       {!fileCustom && (
         <Link to="/">
           <button className="text-center bg-black text-white p-2 rounded-md absolute">
             {nav1}
           </button>
         </Link>
       )}
       {fileCustom && (
         <div
           className="text-center p-2 bg-red-600 rounded-md fixed hover:cursor-pointer top-10 text-white z-[200]"
           onClick={() => setFileCustom(null)}
         >
           {showPdf6}
         </div>
       )}
       {!fileCustom && (
         <div className="min-h-screen bg-gray-400 flex flex-col justify-center items-center p-4">
          
           <h1 className="text-white text-2xl mb-4">{fileOpen}</h1>
           <input
             type="file"
             id="fileUpload"
             accept=".pdf"  
             className="hidden"
             onChange={handleFileChange}
           />
           <label
             htmlFor="fileUpload"
             className="bg-white text-black font-semibold py-2 px-4 rounded cursor-pointer mb-4 text-center"
           >
             {upPage2}
           </label>
           {message && (
  <div className="font-bold text-center text-white">
    {countFreeTrial > 1
      ? `${countFreeTrial-1}-times you can use without signing in` 
      : "Please sign in, you have already used it 3 times"
    }
  </div>
)}




         </div>
       )}
       { fileCustom &&  sideBarShow &&  <div className="mt-9"> <AiComponents /></div>}
       {fileCustom && <ShowSimplePdf data={fileCustom} />}
     </div>
   );
 };
 
 export default WithoutUpload; 