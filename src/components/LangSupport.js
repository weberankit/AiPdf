import { addSupport } from "../utils/useStoreDataSlice";
import {useDispatch} from "react-redux"
import { langugesConstant } from "../utils/langugesConstant";
import useSupportLang from "../utils/useSupportLang";
const LangSupport=({close})=>{
  const {support1}=langugesConstant[useSupportLang()]
const dispatch=useDispatch()
    const supportedLanguages = [
        {language:"select",code:"en"},
           { language: "English", code: "en" },
             { language: "Hindi", code: "hi" },
          { language: "Bhojpuri", code: "bho" },
          
         
          { language: "German", code: "de" },
       
      { language: "French", code: "fr" },
          
          // Add more languages here if needed
      ];


function  handleSupport(item){
  //settingto local
    localStorage.setItem("supportLang",item)
    //dispatching value 
    dispatch(addSupport(item))
    //close component after select 
    close(false)
}


    return(
        <>
        <div>

        <div className="p-44 m-2 rounded-lg bg-gray-200 shadow-lg ">
<div className=" flex flex-row justify-center">
      <div><h1 className="  text-2xl font-serif text-black font-extrabold whitespace-nowrap">{support1}</h1></div>
        <div className="   pt-22 text-black">

        <select className="px-4 p-2  text-center ml-2 rounded-lg" onChange={(event) => handleSupport(event.target.value)}>
  {supportedLanguages.map((item,index) => (
    <option key={item.code} value={item.code} className="rounded-lg darkMode border  font-serif border-white text-white">
      {/*here we show only select not codevalue for 1st one i.e select */}
      {item.language}- {`${index!==0?item.code:""}`}
    </option>
  ))}
</select>
 </div>
</div>

        </div>


        </div>
        
        </>
    )
}

export default LangSupport