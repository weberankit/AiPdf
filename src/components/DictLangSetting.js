import { useState } from "react";

const DictLangSetting=({closeProp,localSource,localTarget})=>{
    const [inValue,setInValue]=useState(null)
    const supportedLanguages = [
      {language:"select",code:"en"},
         { language: "English", code: "en" },
           { language: "Hindi", code: "hi" },
        { language: "Bhojpuri", code: "bho" },
        { language: "Arabic", code: "ar" },
        { language: "Chinese (Simplified)", code: "zh-Hans" },
        { language: "Chinese (Traditional)", code: "zh-Hant" },
       
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
<div className="w-5/6 ">
<div className="fixed bg-white text-black  top-0  w-full z-[160] text-center pb-44 h-[1100px]  overflow-y-scroll">
<button className="bg-orange-600 text-white p-2 rounded-lg m-2 float-left" onClick={()=>closeProp()}>Back</button>
  
   <div className="pt-28">
<h1 className="p-2 text-sm text-base font-bold  m-2"> check in the below list if not avail  <a className="text-blue-600" rel="noopener noreferrer" target="_blank" href="https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support" target="_blank"  > Visit link</a> and then only paste in the input box</h1>

  <p>Note:just select from these list it will set languages</p>
<div className="grid grid-cols-1 sm:grid-cols-2 mt-2 place-items-center">
<div className="w-5/6 p-2 border border-purple-500 mt-1">
    <p>Select your pdf Input language </p>
<select className="px-4 p-2  text-center" onChange={(event) => handleLang(event.target.value)}>
  {supportedLanguages.map((item) => (
    <option key={item.code} value={item.code}>
      {item.language}
    </option>
  ))}
</select>
</div>
<div className="w-5/6 p-2 border border-yellow-700 mt-1">
<p>Select Response output language </p>
<select className="p-2 px-4 text-center"  onChange={(event) => handTargetLang(event.target.value)}>
  {supportedLanguages.map((item) => (
    <option key={item.code} value={item.code}>
      {item.language}
    </option>
  ))}
</select></div>




</div>
<div className="mt-[80px]">
<input className="text-black p-2 rounded-md border border-black m-1" type="text" value={inValue} onChange={(e)=>setInValue(e.target.value.trim())} required placeholder=" type lang code"></input>
    <button className="bg-purple-500 text-white p-2 rounded-lg ml-2 hover:bg-yellow-500 m-1" onClick={()=>handleLang(inValue)}> set pdf source lang</button>
    <button className="bg-yellow-600 ml-3 p-2 rounded-lg mb-2 hover:bg-white m-1" onClick={()=> handTargetLang(inValue)}>set response output</button>

</div>



<button className="bg-black text-white p-2 rounded-lg m-2 text-center  md:hidden" onClick={()=>closeProp()}>back</button>


</div>
</div> 
</div>

</>
    )
}
export default DictLangSetting