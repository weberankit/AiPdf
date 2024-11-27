import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { pdfjs } from "react-pdf";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}











const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//