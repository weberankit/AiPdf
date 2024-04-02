//import React, { useEffect } from 'react';
//import ShowPdf from './components/ShowPdf';

import Body from "./components/Body";
import {Provider} from "react-redux"
import appStore from "./utils/mainSlice";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UploadFiles from "./components/UploadFiles";
import FileCart from "./components/FileCart";


const App = () => {
  
const appRouter=createBrowserRouter([
{
  path:"/",
  element:<Body/>,
  
  
},{
  path:"/upload",
  element:<UploadFiles/>
}
,
 {
      path:"/cart",
      element:<FileCart/>
    }

,

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
