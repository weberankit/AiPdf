import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import { addgiminRes ,addUserQuery} from "./geminiResponseSlice";
import { gptError } from "./ErrorSlice";
import { addSearchMsg } from "./ErrorSlice";
  const useGpt=(compoValue)=>{
 


const selectKeyGPT=useSelector((store)=>store.userskey?.keyGPT?.gpt)
console.log(selectKeyGPT)

 // Access your API key (see "Set up your API key" above) 
 const genAI = new GoogleGenerativeAI(selectKeyGPT);
const dispatch=useDispatch()
//not using selectkey trans right now beacuse its free api so not need key like earlier google trnaslte

const selectToggleforApi=useSelector((store)=>store.userskey?.toggleToCallApi)
const textGrab=useSelector((store)=>store.fileInformation?.text)
console.log(textGrab)
const userAsk=useSelector((store)=>store.giminiRes?.userQuery)
console.log(userAsk)
 async function run() {
if(compoValue === true && textGrab){
  dispatch(addSearchMsg("searching start..."))
  try{
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = `
       you have to act as explaination expert and your response languages must be in input languages.
      explain on this context ${textGrab} in 60 words with a example on it and must include the answer of this question
     ${userAsk?userAsk:"explain"} in inverted comma at top of answer .
      `
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    dispatch(addSearchMsg(null))
   dispatch(addgiminRes(text))
   //stting value null after some sc so its not effect response
   setTimeout(()=>{dispatch(addUserQuery(null))},2000)
   
   dispatch(gptError(null))
  }catch(error){
    console.log(error,error.reason,"   ",error.message["GoogleGenerativeAI Error"])
    dispatch(addSearchMsg(null))
    dispatch(gptError(error.message +" " + " refresh page"))
  }
}
  }
  


 useEffect(()=>{
if(selectKeyGPT){
run();
}

 },[selectToggleforApi])
}

export default useGpt