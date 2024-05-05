import { useEffect } from "react";
import {  useDispatch } from "react-redux";

//import { selectedText } from "./userFiles";
import { SetselectedText } from "./userFiles";
const SelectionWord=(setSideBarShow)=>{

const dispatch=useDispatch()

function copyText(){
    const selection = window.getSelection();
    // Check if there's a selection and if it's not empty
    if (selection && selection.toString()) {
        let selectedText = selection.toString();
        // Dispatch an action with the selected text
        dispatch(SetselectedText(selectedText));
        setSideBarShow(true)
    }
}
     /*   
const handleSelectionChange = () => {

    document.addEventListener("mouseup",copyText)
    document.addEventListener("touchmove", copyText)
    document.addEventListener("touchstart", copyText)
  document.addEventListener("touchend", copyText)
};*/

// Add the event listener for selection change
useEffect(() => {
   // document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('selectionchange', copyText);
    // Cleanup function to remove the event listener when component unmounts
   /**/ return () => {
        //document.removeEventListener('selectionchange', handleSelectionChange);
        document.removeEventListener('selectionchange', copyText);
    };
}, []); // Empty dependency array ensures that the effect runs only once

}
export default SelectionWord