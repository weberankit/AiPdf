
import Body from "./components/Body";

import {Provider} from "react-redux"
import appStore from "./utils/mainSlice";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UploadFiles from "./components/UploadFiles";
import FileCart from "./components/FileCart";
import Setting from "./components/Setting";
//import AiKeyCreateStep from "./components/AiKeyCreateStep";
import {createContext, lazy,Suspense, useContext} from "react"
//import DicctKeyStep from "./components/DicctKeyStep";
import Error from "./components/Error";
import useCheckOnline from "./utils/useCheckOnline";
import ResetEmailPassword from "./components/ResetEmailPassword";
//import Demo from "./components/Demo";
//import ShowDemo from "./components/ShowDemo";
//import Joyride from 'react-joyride'; // Import Joyride
//import ShowDemo from "./components/ShowDemo";
//import {useState ,useEffect} from "react"
//import tourSteps from "./utils/tourSteps"
 import Sign from "./components/Sign"; 
import { useState,useEffect,useCallback } from "react";
//import { Lines } from 'react-preloaders';
import { contextSpinLogin } from "./utils/helper";

  const StepsAi=lazy(()=>import("./components/AiKeyCreateStep"))
 const StepDict=lazy(()=>import("./components/DicctKeyStep"))
 const DemoPage=lazy(()=>import("./components/ShowDemo"))
 //const FileLazy=lazy(()=>import("./components/FileCart"))

const App = () => {
  const modeNetwork=useCheckOnline()
 
  const callBackToUnLoad=useCallback(toLoad,[])
  function toLoad() {
    document.getElementById("loading-overlay").style.display = "none";
  }
  // Hide the loading indicator when the page has fully loaded
 window.addEventListener("load", callBackToUnLoad);
 
 useEffect(()=>{
 
 // Hide the loading indicator when the page has fully loaded
 //to ensure 100% 
document.getElementById("loading-overlay").style.display = "none";




 //removing it when unmounted --


  return(()=>window.removeEventListener("load",callBackToUnLoad))
 },[])






const appRouter=createBrowserRouter([
{
  path:"/",
  element:<Body />,
  errorElement:<Error/>
  
  
},

{
  path:"/sign",
  element:<Sign/>
}

,

{
  path:"/upload",
  element:<UploadFiles />
}
,
 {
      path:"/cart",
      element:<FileCart/>,
     
    }

,{
  path:"/setting",
  element:<Setting/>
},
{path:"aiKey",

element:(  <Suspense fallback={<h1  className="text-center font-bold">loading....please wait</h1>}><StepsAi/></Suspense>)
}
,

{
  path:"dictKey",
  element:(<Suspense fallback={<h1  className="text-center font-bold">loading....please wait</h1>}><StepDict/></Suspense>)
},

,{
  path:"/reset",
  element:<ResetEmailPassword/> 
},


{
  path:"/showDemo",
  element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><DemoPage/></Suspense>
}

])

//const useContextSpinLogin=useContext(contextSpinLogin)
const [spin,setSpin]=useState({spin:false})

    return (
      <>
      {!modeNetwork && <p className="bg-red-600 text-white p-1 m-1 ">please check your network</p>}
     < contextSpinLogin.Provider value={{spin,setSpin}}>
          <Provider store={appStore}>
 <RouterProvider router={appRouter}>
 
 </RouterProvider>




 </Provider>
</contextSpinLogin.Provider >

      </>
       
    );
};

export default App;





