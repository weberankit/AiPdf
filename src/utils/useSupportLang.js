import { useSelector } from "react-redux"
const useSupportLang=()=>{
    const selectSupportLang=useSelector((store)=>store.useDataSlice.support)
   let  lang = selectSupportLang || localStorage.getItem("supportLang") || "en"
    return lang
}
export default useSupportLang