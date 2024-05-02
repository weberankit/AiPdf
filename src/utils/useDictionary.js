import {useSelector ,useDispatch} from "react-redux"
import { useEffect } from "react"
import { aiRes } from "./aiResponseSlice"
const useDictionary=(componValue,setData,sourceLang,targetLang)=>{
  if(!sourceLang){
    sourceLang='en'
   }
   if(!targetLang){
    targetLang='hi'
   }
   const dispatch=useDispatch()
console.log(sourceLang,"sourcelang")
    const selectKeyDict=useSelector((store)=>store.userskey?.KeyDICT?.dict)
    console.log(selectKeyDict)
    const selectToggleforApi=useSelector((store)=>store.userskey?.toggleToCallApi)
    const textGrab=useSelector((store)=>store.fileInformation?.text)
 console.log(textGrab)

 function SplitText(text){
     if(!textGrab)return
     const splitWord=text.trim().split(" ")
     console.log(splitWord)
     return splitWord
 } 
 
 
 const textWords=SplitText(textGrab)
 console.log(textWords)
 let data
 //enable user to get 5 words meaning at smae time

 if(textWords?.length>=5){
 data= [{ Text: textWords[0] },{Text:textWords[1]},{ Text: textWords[2] },{Text:textWords[3]},{ Text: textWords[4] }];
 }else if(textWords?.length>=4){
     data= [{ Text: textWords[0] },{Text:textWords[1]},{ Text: textWords[2] },{Text:textWords[3]}];
 }else if(textWords?.length>=3){
     data= [{ Text: textWords[0] },{Text:textWords[1]},{ Text: textWords[2] }];
 }else if(textWords?.length>=2){
     data= [{ Text: textWords[0] },{Text:textWords[1]}];
 }else{
     data= [{ Text: textWords[0] }];
 }

 async function callingApi() {
     // using compoValue so that when user mount on other component it does not call api of dicitionary unnecssary
 if(componValue === true){
   const url = `https://microsoft-translator-text.p.rapidapi.com/Dictionary/Lookup?to=${targetLang}&api-version=3.0&from=${sourceLang}`;
   
 
 
   const options = {
     method: 'POST',
     headers: {
       'content-type': 'application/json',
       'X-RapidAPI-Key': selectKeyDict,
       'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
     },
     body: JSON.stringify(data)
   };
 
   try {
     const response = await fetch(url, options);
     const result = await response.text();
    
      const data = JSON.parse(result);
      setData(data)

   } catch (error) {
     console.log(error);
   }
 
 }
 }
 


 async function callingFreeApi(item){
 
  const dataFetch= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`)
  const data= await dataFetch.json()
 // console.log(data)
  return data
   }
  async function callingExampleApi(){
const arrayResponse= textWords.map((item)=>callingFreeApi(item))
 const allPromise=await Promise.all(arrayResponse)
 //console.log(allPromise)

 dispatch(aiRes(allPromise)) 
  }
  
 useEffect(()=>{
 if(selectKeyDict){
     console.log("jj")
   callingApi()
   callingExampleApi()
 }


 },[selectToggleforApi])
 










}
export default useDictionary