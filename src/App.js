//import React, { useEffect } from 'react';
//import ShowPdf from './components/ShowPdf';

import Body from "./components/Body";
import {Provider} from "react-redux"
import appStore from "./utils/mainSlice";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UploadFiles from "./components/UploadFiles";
import FileCart from "./components/FileCart";
import Setting from "./components/Setting";
import AiKeyCreateStep from "./components/AiKeyCreateStep";
import {lazy,Suspense} from "react"
import DicctKeyStep from "./components/DicctKeyStep";
import Error from "./components/Error";
import useCheckOnline from "./utils/useCheckOnline";
import ResetEmailPassword from "./components/ResetEmailPassword";
  const StepsAi=lazy(()=>import("./components/AiKeyCreateStep"))
 const StepDict=lazy(()=>import("./components/DicctKeyStep"))
const App = () => {
  const modeNetwork=useCheckOnline()
  console.log(modeNetwork,"thidddddd")
const appRouter=createBrowserRouter([
{
  path:"/",
  element:<Body/>,
  errorElement:<Error/>
  
  
},{
  path:"/upload",
  element:<UploadFiles/>
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

element:(  <Suspense fallback={<h1>loading....please wait</h1>}><StepsAi/></Suspense>)
}
,

{
  path:"dictKey",
  element:(<Suspense fallback={<h1>loading....please wait</h1>}><StepDict/></Suspense>)
},

,{
  path:"/reset",
  element:<ResetEmailPassword/> 
},
])



    return (
      <>
      {!modeNetwork && <p className="bg-red-600 text-white p-1 m-1 ">please check your network</p>}
          <Provider store={appStore}>
 <RouterProvider router={appRouter}>


 </RouterProvider>




 </Provider>
      </>
       
    );
};

export default App;
