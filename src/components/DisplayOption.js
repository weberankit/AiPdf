
const DisplayOption=({item,index})=>{

   
          function handleChange(e,ans){
             const getValues=parseInt( e?.target?.value)
           //A,B --help to find which is not clicked
            const converted=String.fromCharCode(65 + getValues)
           if(ans?.toLowerCase()!==converted?.toLowerCase()){
              //get element user clicked but not match with correct-ans
              const element=document.getElementById(`${index}qe-${getValues}`)
              if(!element)return;
            element.style.border="red solid 1px" 
            element.style.borderRadius="10px"  
            
          } 
          //whatever user-click always show correct anser
          //conver ans--into numbers so to find  element by id
           const correctAns = ans.toUpperCase().charCodeAt(0) - 65;
           const element=document.getElementById(`${index}qe-${correctAns}`)
           if(!element)return;
          element.style.border="green solid 1px"
         element.style.borderRadius="10px"  
          
    
        }
    
     
    
    
        return(
            <>
             {item?.options?.map((option, optIndex) => {
                                    return (
                                      <label key={optIndex} className={`   flex items-center text-lg text-gray-700`} id={`${index}qe-${optIndex}`}>
                                        <input
                                          type="radio"
                                          name={`question-${index}`}
                                          value={optIndex}
                                          onChange={(e) => handleChange(e, item?.correctAnswer,index)}
                                          className={`  mr-4 w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500`}
                                          checked={false}
                                          
                                        />
                                        <span className={` sm:hover:text-blue-600`}>{option }</span>
                                      </label>
                                    );
                                  })}
            </>
        )
    }
export default DisplayOption    