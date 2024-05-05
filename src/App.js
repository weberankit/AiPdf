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

  const StepsAi=lazy(()=>import("./components/AiKeyCreateStep"))
 const StepDict=lazy(()=>import("./components/DicctKeyStep"))
const App = () => {
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
}
])




    return (
      <>
          <Provider store={appStore}>
 <RouterProvider router={appRouter}>


 </RouterProvider>




 </Provider>
      </>
       
    );
};

export default App;
