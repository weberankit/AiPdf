import { useState } from "react";

const DictLangSetting=({closeProp,localSource,localTarget})=>{
    const [inValue,setInValue]=useState(null)
    const supportedLanguages = [
        { language: "Arabic", code: "ar" },
        { language: "Chinese (Simplified)", code: "zh-Hans" },
        { language: "Chinese (Traditional)", code: "zh-Hant" },
        { language: "English", code: "en" },
           { language: "Hindi", code: "hi" },
        { language: "Bhojpuri", code: "bho" },
        { language: "German", code: "de" },
     
    { language: "Italian", code: "it" },
        { language: "Japanese", code: "ja" },
        { language: "Korean", code: "ko" },
        { language: "Portuguese", code: "pt" },
        { language: "Russian", code: "ru" },
        { language: "Spanish", code: "es" },
        { language: "Turkish", code: "tr" }
        // Add more languages here if needed
    ];
function handleLang(lang){
localStorage.setItem(localSource,lang)
}
function handTargetLang(lang){
    localStorage.setItem(localTarget,lang)
    }


    return(
<>
<div className="fixed bg-black text-white overflow-y-scroll top-0 h-[600px] w-full z-[55] ">
   <button onClick={()=>closeProp()}>close</button>
   <div className="">
here is some languges support
<input className="text-black" type="text" value={inValue} onChange={(e)=>setInValue(e.target.value)}></input>
    <button className="bg-blue-500 text-white p-2 rounded-lg ml-2" onClick={()=>handleLang(inValue)}>s</button>
    <button className="bg-blue-500 ml-3 p-2 rounded-lg" onClick={()=> handTargetLang(inValue)}>R</button>
<div className="text-white ">if your lang is not in list below then visit link   check the code  and paste code in input value
     <a className="text-blue-600" href="https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support" target="_blank"  > Visit link</a></div>

click on s for source lang nd click on R for response language
{supportedLanguages.map((item)=>{
    return(
        <div className="">
            {item.language} <button  className="bg-purple-600 p-2 rounded-lg m-2" onClick={()=>handleLang(item.code)}> s</button>
            <button className="bg-green-700 p-2 rounded-lg" onClick={()=>handTargetLang(item.code)}>R</button>
            </div>
    )
})}

</div>
</div> </>
    )
}
export default DictLangSetting