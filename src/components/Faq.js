import { useState } from "react"
import { CaretDown,CaretLeft} from 'react-bootstrap-icons';
import { langugesConstant } from "../utils/langugesConstant";
import useSupportLang from "../utils/useSupportLang";
const Faq=()=>{
    
    const {qs1,ans1,qs2,ans2,qs3,ans3,qs4,ans4,qs5,ans5} = langugesConstant[useSupportLang()]
const [show,setShow] =useState(0)  
const Questions=[
    {ques:qs1,
     ans:ans1   
    },
    {
        ques:qs2,
        ans:ans2
    },
    {
        ques:qs3,
        ans:ans3
    },
    {
        ques:qs4,
        ans:ans4
    },
    {
        ques:qs5,
        ans:ans5
    }
]

    return(
        <>

{Questions.map((item,index)=>{
    return(<>
    <div>
        <div className="mt-3 rounded-lg  shadow-lg border border-white">
    {index === show ?<div className="flex flex-row justify-between cursor-pointer" onClick={()=>setShow(null)}> <div className=" p-2 text-xl font-bold fontFaq font-serif" > {item.ques}</div> <button  className="bg-[#8a60f6] p-1 mt-4 mb-4 text-center rounded-2xl" ><CaretLeft/></button>  </div>
     :
     <div className="flex flex-row justify-between  cursor-pointer" onClick={()=>setShow(index)}><div   className="p-2 text-xl font-bold fontFaq font-serif">{item.ques} </div> <button  className="bg-[#8a60f6] p-1 mt-4 mb-4 text-center rounded-2xl" ><CaretDown/> </button></div> }
   
   {index===show && <div className="p-1 pl-2 text-base font-sans  font-extralight"> {item.ans}</div>}
    </div>
</div>


    </>)
})}


        </>
    )
}

export default Faq