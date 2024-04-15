import {useDispatch,useSelector} from "react-redux"
import { dicitValue, gptValue, translateValue } from "../utils/aiManagment"
import GptText from "./GptText"
import DictionaryText from "./DictionaryText"
import TranslateText from "./TranslateText"
import { toggleForApi } from "../utils/userKey"
const AiComponents=()=>{
    const dispatch=useDispatch()
    const selectGpt=useSelector((store)=>store.aiManage.Gpt)
     const selectDic=useSelector((store)=>store.aiManage.Dictionary)
     const selectTrans=useSelector((store)=>store.aiManage.Translate)
//function for closing other compo  
     function forDispatch(val,bool ,val2 ,bool2){
         dispatch(val(bool))
         dispatch(val2(bool2))
         dispatch(toggleForApi())
     }

    

    return(
<>
<div className="flex flex-col  top-10 bg-red-950 z-50 fixed">
    <button onClick={()=>{forDispatch(dicitValue,false,translateValue,false) ; dispatch(gptValue(true)); }}>GpT</button>
    <button onClick={()=>{forDispatch(gptValue,false,translateValue,false);dispatch(dicitValue(true))}}>Dictionary</button>
    <button onClick={()=>{forDispatch(gptValue,false,dicitValue,false);dispatch(translateValue(true))}}>Tranlate</button>
</div>


<div >
 <div className="absolute right-0 z-50 "> {selectGpt===true ? <><GptText/></>:" "}</div>
 <div className=""> {selectDic===true ? <><DictionaryText/> </>:" "}</div>
 <div className="absolute right-0 z-50 "> {selectTrans===true ? <><TranslateText/> </>:" "}</div>
</div>

</>
    )
}
export default AiComponents