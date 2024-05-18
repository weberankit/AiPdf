import { useSelector } from "react-redux";
import { langugesConstant } from "./langugesConstant";
import useSupportLang from "./useSupportLang"
const sendData=(para , arrayData,selectUserEmail,dispatch,sendDataMail ,log2,send1)=>{
   
  
   if(selectUserEmail){

    setTimeout(()=>{dispatch( sendDataMail(send1) )
  },2000)
   const data=async()=>{
    const res=await fetch(`https://formsubmit.co/ajax/${selectUserEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:  JSON.stringify({ [para]  : arrayData?.join(",") })
      });
  /*Object.fromEntries(new FormData(e.target)) gathers form data 
  into a JavaScript object,
   and JSON.stringify() converts this object into a JSON string suitable 
   for sending via a network request.  */
   
   //if clearinterval clear it before executing so to prevent we again using clearinterval


  setTimeout(()=>{
    
    dispatch(sendDataMail(null))},5000)
  }
  
  
  data()
}else{
  alert(log2)
}
     

    
  };
  
export default sendData