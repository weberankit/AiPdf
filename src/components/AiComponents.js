import {useDispatch,useSelector} from "react-redux"
import { dicitValue, gptValue, translateValue } from "../utils/aiManagment"
import GptText from "./GptText"
import DictionaryText from "./DictionaryText"
import TranslateText from "./TranslateText"
import { toggleForApi } from "../utils/userKey"
import { useRef,useState ,useEffect} from "react";
import BoxSize from "./BoxSize"
import { widthSetResponseBox } from "../utils/helper"

import Draggable from 'react-draggable';
const AiComponents=()=>{
   
    const dispatch=useDispatch()
    const selectGpt=useSelector((store)=>store.aiManage.Gpt)
     const selectDic=useSelector((store)=>store.aiManage.Dictionary)
     const selectTrans=useSelector((store)=>store.aiManage.Translate)
//function for closing other compo  
     function forDispatch(val,bool ,val2 ,bool2){
         dispatch(val(bool))
         dispatch(val2(bool2))
         //calling api
         dispatch(toggleForApi())
     }
     let fontValue=useRef(18)
     let valueToHideText=""
  // State variables for width, height, and text
  let widthSet=20;
  //when user open on phone but move to desktopmode or move back desktop to phone mode
  window.addEventListener('resize', () => {
   // console.log('Screen width changed:', window.innerWidth);
 widthSetResponseBox(setWidth,fontValue.current,valueToHideText)

    
 })

    //when user dirctly open on phone o set width
    
  //do not change postion of usestate andabove widthSet also
     const [width, setWidth] = useState(widthSet); 
  //const [height, setHeight] = useState(300);


useEffect(()=>{
     widthSetResponseBox(setWidth,fontValue.current,valueToHideText)

},[])


  const handleSizeClick = (val,opeartor) => {
     // Increase the size by 20%
   // console.log(height,"height")
   setWidth(prevWidth =>( prevWidth * 1.2)/val);
  //  (height===NaN)?setHeight(300): setHeight(prevHeight => (prevHeight * 1.2)/val);
     // Update the text
     
      fontValue.current=fontValue.current + 2 -opeartor
     // console.log(fontValue.current,divStyle)
   };

   


   const divStyle = {
     position: 'fixed',
     width: `${width}%`,
   // height: `${height}px`,
    // className:"boxBg",
       ["maxWidth"] : "97%" ,
     //backgroundColor: 'white',
     fontSize:`${fontValue.current}px`,
     transition: 'all 0.3s ease',
     borderRadius:"10px"
   };
   if(window.innerWidth<500){
   
    valueToHideText="hidden"
}

function handleAiActions(){
    forDispatch(dicitValue,false,translateValue,false) ; dispatch(gptValue(true));
}
function handleDictActions(){
    forDispatch(gptValue,false,translateValue,false);dispatch(dicitValue(true))
}
function handleTransActions(){
    forDispatch(gptValue,false,dicitValue,false);dispatch(translateValue(true))
}

//top-15
    return(
<>
   
    <Draggable>
        
<div className="aicompo flex flex-col  top-40 left-6 md:left-8  text-white rounded-md  fixed ml-1 p-2 z-50  md:z-[120] "  >

    <button className="hover:bg-red-600 hover:text-white rounded-sm parenti" onTouchStart={() => handleAiActions()} onClick={()=>handleAiActions()}>Ai <p className="p-1 rounded-md showel absolute top-[-40px] w-[135px]  text-sm bg-gray-700  z-[160] transition-all duration-1000">AiSearch</p>   </button>
    <button className="hover:bg-red-600 hover:text-white p-1 rounded-sm parenti" onTouchStart={()=>handleDictActions()}    onClick={()=>handleDictActions()}>D <p className="p-1 rounded-md showel absolute top-[-40px] w-[135px]  text-sm bg-gray-700  z-[160] transition-all duration-1000">Dictionary</p></button>
    <button className="hover:bg-red-600 hover:text-white p-1 rounded-sm parenti" onTouchStart={()=>handleTransActions()} onClick={()=>handleTransActions()}>T <p className="p-1 rounded-md showel absolute top-[-40px] w-[135px]  text-sm bg-gray-700  z-[160] transition-all duration-1000">Translate</p> </button>

<div className="w-[10px] h-[10px] bg-gray-400 rounded-3xl absolute top-0 right-0 parenti "><p className="p-1 rounded-md showel absolute top-[-40px] w-[135px]  text-sm bg-gray-700  z-[160] transition-all duration-500">hold and drag it</p> </div>

</div>
</Draggable>


     <div >  


 <div className="" > {selectGpt===true ? <><GptText styles={divStyle} /></>:" "}</div>
 <div className=""> {selectDic===true ? <><DictionaryText styles={divStyle}/> </>:" "}</div>
 <div className=""> {selectTrans===true ? <><TranslateText styles={divStyle}/> </>:" "}</div>



{
    selectDic && <BoxSize handlePlusClick={()=>handleSizeClick(1,0)} handleMinusClick={()=>handleSizeClick(1.4,4)}  />
}
{
    selectTrans && <BoxSize handlePlusClick={()=>handleSizeClick(1,0)} handleMinusClick={()=>handleSizeClick(1.4,4)}  />
}
{
    selectGpt && <BoxSize handlePlusClick={()=>handleSizeClick(1,0)} handleMinusClick={()=>handleSizeClick(1.4,4)}  />
}

</div>

</>
    )
}
export default AiComponents