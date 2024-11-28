import { useState } from "react"
import { CaretDown,CaretLeft} from 'react-bootstrap-icons';
import { langugesConstant } from "../utils/langugesConstant";
import useSupportLang from "../utils/useSupportLang";
const Faq=()=>{
    
    const {qs1,ans1,qs2,ans2,qs3,ans3,qs4,ans4,qs5,ans5} = langugesConstant[useSupportLang()]
const [show,setShow] =useState(2)  
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
{/*
{Questions.map((item,index)=>{
    return(
    <div key={index}>
        <div className="mt-3 rounded-lg  shadow-lg border border-white">
    {index === show ?<div className="flex flex-row justify-between cursor-pointer" onClick={()=>setShow(null)}> <div className=" p-2 text-xl font-bold fontFaq font-serif" > {item.ques}</div> <button  className="bg-[#8a60f6] p-1 mt-4 mb-4 text-center rounded-2xl" ><CaretLeft/></button>  </div>
     :
     <div className="flex flex-row justify-between  cursor-pointer" onClick={()=>setShow(index)}><div   className="p-2 text-xl font-bold fontFaq font-serif">{item.ques} </div> <button  className="bg-[#8a60f6] p-1 mt-4 mb-4 text-center rounded-2xl" ><CaretDown/> </button></div> }
   
   {index===show && <div className="p-1 pl-2 text-base font-sans  font-extralight"> {item.ans}</div>}
    </div>
</div>


    )
})}*/
}
{Questions.map((item, index) => {
  return (
    <div key={index} className='mt-3 rounded-lg shadow-lg bg-yellow-500 border border-yellow-600'>
      <div className='flex flex-row justify-between cursor-pointer' onClick={() => setShow(index === show ? null : index)}>
        <div className='p-2 text-xl font-bold fontFaq font-serif text-white'>{item.ques}</div>
        <button className={`bg-orange-600 h-8 p-2 mt-2 mr-1 mb-4  text-center rounded-2xl ${index === show ? 'rotate-180' : ''}`}>
          {index === show ? <CaretLeft className='text-white ' /> : <CaretDown className='text-white ' />}
        </button>
      </div>

      {index === show && (
        <div className='p-1 pl-2 text-base font-sans font-extralight text-white'>{item.ans}</div>
      )}
    </div>
  );
})}



        </>
    )
}

export default Faq