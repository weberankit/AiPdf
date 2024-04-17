import {useDispatch,useSelector} from "react-redux"
import { dicitValue, gptValue, translateValue } from "../utils/aiManagment"
import GptText from "./GptText"
import DictionaryText from "./DictionaryText"
import TranslateText from "./TranslateText"
import { toggleForApi } from "../utils/userKey"
import { useRef,useState } from "react";
import BoxSize from "./BoxSize"
const AiComponents=()=>{
   
    const dispatch=useDispatch()
    const selectGpt=useSelector((store)=>store.aiManage.Gpt)
     const selectDic=useSelector((store)=>store.aiManage.Dictionary)
     const selectTrans=useSelector((store)=>store.aiManage.Translate)
    // const selectToggleforApi=useSelector((store)=>store.userskey?.toggleToCallApi)
//function for closing other compo  
     function forDispatch(val,bool ,val2 ,bool2){
         dispatch(val(bool))
         dispatch(val2(bool2))
         dispatch(toggleForApi())
     }
     let fontValue=useRef(18)
  // State variables for width, height, and text
  let widthSet=20;
  //when user open on phone but move to desktopmode or move back desktop to phone mode
  window.addEventListener('resize', () => {
    console.log('Screen width changed:', window.innerWidth);
    if(window.innerWidth>500){
        
        setWidth(20)
        fontValue.current=18 
    }
    //
    if(window.innerWidth<500){
        setWidth(50)
        fontValue.current=18 
    }
    
 })
    //when user dirctly open on phone o set width
 if(window.innerWidth<500){
     //   console.log(window.innerWidth)
       widthSet=50
    }
  const [width, setWidth] = useState(widthSet); 
  //const [height, setHeight] = useState(300);


  const handleSizeClick = (val,opeartor) => {
     // Increase the size by 20%
   // console.log(height,"height")
   setWidth(prevWidth =>( prevWidth * 1.2)/val);
  //  (height===NaN)?setHeight(300): setHeight(prevHeight => (prevHeight * 1.2)/val);
     // Update the text
     
      fontValue.current=fontValue.current + 2 -opeartor
      console.log(fontValue.current,divStyle)
   };

   


   const divStyle = {
     position: 'fixed',
     width: `${width}%`,
   // height: `${height}px`,

       ["max-width"] : "97%" ,
     backgroundColor: 'lightblue',
     fontSize:`${fontValue.current}px`,
     transition: 'all 0.3s ease'
   };
   

    return(
<>
<div className="flex flex-col  top-10 bg-red-950 z-50 fixed" >


    <button onClick={()=>{forDispatch(dicitValue,false,translateValue,false) ; dispatch(gptValue(true)); }}>GpT</button>
    <button onClick={()=>{forDispatch(gptValue,false,translateValue,false);dispatch(dicitValue(true))}}>Dictionary</button>
    <button onClick={()=>{forDispatch(gptValue,false,dicitValue,false);dispatch(translateValue(true))}}>Tranlate</button>
</div>



     <div >


 <div className="" > {selectGpt===true ? <><GptText styles={divStyle} /></>:" "}</div>
 <div className=""> {selectDic===true ? <><DictionaryText styles={divStyle}/> </>:" "}</div>
 <div className=""> {selectTrans===true ? <><TranslateText styles={divStyle}/> </>:" "}</div>

{ /*selectToggleforApi && (
 <div className="right-0 z-45 fixed text-white" >
       
       <div className="parent cursor-pointer bg-black inline-block mr-1"  onClick={()=>handleSizeClick(1,0)}>plus<p className="element absolute  top-20 bg-gray-700 ">to increse response box size</p></div>
       <div className="parent cursor-pointer  bg-black inline-block"  onClick={()=>handleSizeClick(1.4,4)}>minus<p className="element absolute top-0 bg-gray-700 ">to decrease response box size</p></div>
              
          </div>
)*/
}

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