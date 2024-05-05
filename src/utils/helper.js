export const widthSetResponseBox=(setWidth,fontValue,valueToHideText)=>{
    
    //
    if(window.innerWidth<500){
        setWidth(50)
        fontValue=18 
        valueToHideText="hidden"
    }
if(window.innerWidth>500 && window.innerWidth<=632){
    setWidth(35)
    fontValue=18 
    valueToHideText=""
}
   if(window.innerWidth>632 && window.innerWidth<=816){
        
        setWidth(30)
        fontValue=18 
            valueToHideText=""
    }
    if(window.innerWidth>816 && window.innerWidth<=1024){
        setWidth(25)
        fontValue=18 
        valueToHideText=""
    }

if(window.innerWidth>1024){
    setWidth(20)
    fontValue=18 
    valueToHideText=""
}
}
