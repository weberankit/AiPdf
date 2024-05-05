import { useSelector } from "react-redux";
const sendData=(para , arrayData,selectUserEmail,dispatch,sendDataMail)=>{
    //const selectgeminiResponse=useSelector((store)=>store.giminiRes.responseArray)
   // console.log(selectgeminiResponse.join(","))
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
  dispatch( sendDataMail("all data is sent (please authorize formSubmit on your email if already done ignore it)") )

  setTimeout(()=>{
    
    dispatch(sendDataMail(null))},7000)
  } 
    
      data()
    
  };
  
export default sendData