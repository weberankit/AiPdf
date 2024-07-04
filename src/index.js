import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function toDisableInspect(){
document.addEventListener('contextmenu', (e) => e.preventDefault());
/*keyCode.charCodeAt(0) converts the first character of the keyCode string to its corresponding ASCII code.
For example, if keyCode is 'I', then keyCode.charCodeAt(0) will return 73, which is the ASCII code for I
*/
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    e.keyCode === 123 || // F12
    ctrlShiftKey(e, 'I') ||  // Ctrl + Shift + I
    ctrlShiftKey(e, 'J') ||  // Ctrl + Shift + J
    ctrlShiftKey(e, 'C') ||  // Ctrl + Shift + C
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) // Ctrl + U
  )
    return false; // Prevent default action for these key combinations
};
}
toDisableInspect()














const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//