
import Body from "./components/Body";
import {Provider} from "react-redux"
import appStore from "./utils/mainSlice";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UploadFiles from "./components/UploadFiles";
import FileCart from "./components/FileCart";
import Setting from "./components/Setting";
import { lazy,Suspense} from "react"
import Error from "./components/Error";
import useCheckOnline from "./utils/useCheckOnline";
import ResetEmailPassword from "./components/ResetEmailPassword";
 import Sign from "./components/Sign"; 
import { useState,useEffect,useCallback } from "react";
import { contextSpinLogin } from "./utils/helper";
import AIQuestion from "./components/AIQuestion";
import LayoutDemo from "./layoutPage/LayoutDemo";
import Pages from "./components/Pages";
import LayoutMain from "./layoutPage/LayoutMain";
import AdvPdfView from "./components/AdvPdfView";
import PdfView from "./components/PdfView";


const StepsAi=lazy(()=>import("./components/AiKeyCreateStep"))
const StepDict=lazy(()=>import("./components/DicctKeyStep"))
const DemoPage=lazy(()=>import("./components/ShowDemo"))
const WithoutUploads=lazy(()=>import("./components/WithoutUpload"))
 const VideoPlay=lazy(()=>import("./components/VideoPlay"))



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
errorElement:<Error/>,
},

{
  path:"/sign",
  element:<Sign/>
},

{
  path:"/upload",
  element:<UploadFiles />
},

{
  path:"/setting",
  element:<Setting/>
},

{
path:"aiKey",
element:(  <Suspense fallback={<div><h1  className="text-center font-bold animate-pulse">loading....please wait</h1></div>}><StepsAi/></Suspense>)
},

{
  path:"dictKey",
  element:(<Suspense fallback={<h1  className="text-center font-bold">loading....please wait</h1>}><StepDict/></Suspense>)
},

{
  path:"/reset",
  element:<ResetEmailPassword/> 
},

{
path:"/showDemo",
element:<LayoutDemo/>,
  children:[
    {
      path:"",
      element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><DemoPage/></Suspense>
    },

    {
      path:"pdfPages",
      element:<Pages/>,
      children:[
        {
         path:"videoplay/:id",
         element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><VideoPlay/></Suspense>
        },
      ]
    }
    ,
    {
      path:"Questions",
      element:<AIQuestion/>
    }

  ]
},

{
path:"/cart",
element:<LayoutMain/>,
children:[
{
  path:"",
  element:<FileCart/>
},
{
  path:"pdf2",
  element:<AdvPdfView/>
},
{
  path:"pdfPages",
  element:<Pages/>,
  children:[
   {
     path:"videoplay/:id",
     element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><VideoPlay/></Suspense>,
    },
  ]
},
{
  path:"textView",
  element:<PdfView/>
}
,
{
  path:"Questions",
  element:<AIQuestion/>
}

]
},

{
  path:"/withoutUpload",
  element:<LayoutMain/>,
  children:[
    {
      path:"",
      element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><WithoutUploads/></Suspense>,
      children:[
         {
      path:"videoplay/:id",
      element:<Suspense fallback={<h1 className="text-center font-bold">loading....please wait</h1>}><VideoPlay/></Suspense>,
         },

          {
      path:"Questions",
      element:<AIQuestion/>
         }
      ]
    },

    
   
  ]
}

])


//using in InitalPage-compo and In body compo(to update about login)
//firebase take some time to check user-login or not on slow network so indication shoing
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





