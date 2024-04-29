import { useEffect } from "react"
import { useSelector } from "react-redux"
import { toggleForApi } from "./userKey"
import { useDispatch } from "react-redux"
import { translateApi } from "./aiResponseSlice"
const useTranslate=(selectTrans,sourceLang,targetLang)=>{
    const dispatch=useDispatch()
console.log(selectTrans)
if(!sourceLang){
    sourceLang='en'
   }
   if(!targetLang){
    targetLang='hi'
   }
   //not using selectkey trans right now beacuse its free api so not need key like earlier google trnaslte
    const selectKeyTrans=useSelector((store)=>store.userskey?.KeyLANG?.trans)
    console.log(selectKeyTrans)
    const selectToggleforApi=useSelector((store)=>store.userskey?.toggleToCallApi)
    const textGrab=useSelector((store)=>store.fileInformation?.text)
 console.log(textGrab,selectKeyTrans)
async function callingTransApi(){
    if(selectTrans){
        //
        console.log(selectTrans)
        console.log("bk")
        const url = `https://api.mymemory.translated.net/get?q=${textGrab}&langpair=${sourceLang}|${targetLang}`
       
        
        try {
            const response = await fetch(url);
            const result = await response.json();
           // const data = JSON.parse(result);
            console.log(result);
            const res=result?.responseData?.translatedText
           console.log(res)

         dispatch(translateApi(res))
        } catch (error) {
            console.error(error);
            console.log(error,"error")
        }



    }
}

 useEffect(()=>{
if(selectKeyTrans){
callingTransApi()
console.log("kk")
}
 },[selectToggleforApi])
 
}
export default useTranslate