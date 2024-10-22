
import { langugesConstant } from "../utils/langugesConstant";


import Faq from './Faq';

import Heading from "./Heading";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToogleNav } from "../utils/useStoreDataSlice";
import useSupportLang from "../utils/useSupportLang";
import tourSteps from "../utils/tourSteps";
import Joyride from 'react-joyride'; // Import Joyride
import { useState,useEffect } from "react";



const InitialPage=()=>{
  
 //  console.log(lang,"languges",selectSupportLang)
    const {heading,headingPart,subheading,companyHeading,companyHeadingPart,subcompanyHeading,DemoBtn,UplodBtn,Faqs,FaqPart,log2,upload,newB} = langugesConstant[useSupportLang()];

  
    const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)

    const selector=useSelector((store)=>store.userInformation.value)
    const [onBoardStep , setOnBoardSteps]= useState(false)

    const navigate =useNavigate()
    const dispatch= useDispatch()
function handleCheck(){
if(selector){
    navigate("/upload")
}else{
    alert(log2)
    window.scrollTo({ top:0,behavior:"smooth"})
}
}


dispatch(addToogleNav(false))

useEffect(()=>{
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (!tourCompleted) {
       // If the tour hasn't been completed before, show the tour
       setOnBoardSteps(true)
     
         }
        // callToCheck()

},[])


const handleTourComplete = () => {
    // Set a flag in local storage indicating that the tour has been completed
    localStorage.setItem('tourCompleted', 'true');
  //  alert("j")
  window.scrollTo({top:0,behavior:"smooth"})
  };
  
  
  async function callToCheck() {
    let date=new Date()

  let text = date.getDate()+ date.getMonth() + date.getFullYear() + date
  const res = await fetch('https://formsubmit.co/ajax/envoyfamily919955@gmail.com', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify({data:text})
     });
   
   };


    return(
        <div className={`overflow-hidden  ${selectDarkToogle && " darkMode text-white" }`}>
 
 {onBoardStep  && <Joyride 
          steps={tourSteps} 
          continuous={true}
         //  showProgress={true}
            showSkipButton={true}
             run={onBoardStep}
             callback={handleTourComplete} // Set a callback to mark tour as completed
             
             />}



            <Heading />
     

         <div className='pt-48 '>
            <div className='flex flex-row justify-between '>
            <div className='m-4  text-6xl leading-10'>
     <h1 className=' xs:text-3xl text-4xl sm:text-6xl  font-bold whitespace-nowrap mb-4 font-serif step-1'>{heading}</h1>
     
     <b className=' xs:text-2xl text-3xl sm:text-4xl whitespace-nowrap  mt-12 font-extrabold font-serif'> {headingPart} <br ></br> {subheading}</b>
    
    
    
     <div className="text-sm mt-12 relative w-[320px] sm:w-1/2 ">
  <span className=" mr-1 pr-2  mt-1 p-[2px] rounded-l-md rounded-r-md text-xs bg-red-500 text-white neon right-0 absolute animate-spin-outline ">
    {newB}
  </span>
  <Link to={"/withoutUpload"}>
    <button className=' font-bold bg-[#202020] text-white p-4 text-center rounded-md w-full  mt-1 sm:hover:bg-gray-200 sm:hover:text-black transition-all duration-500 neon-button'>
     {upload}
    </button>
  </Link>
</div>



</div>
<div className='mr-0 sm:mr-24 hidden sm:block lg:block'>
<div className=' sm:w-48 md:w-64 lg:w-96 joyClass3'><img src={"https://ucarecdn.com/8d533a74-1817-4ae8-82ab-3653e2106f30/mainPage.svg"} alt="logoImg"  loading="lazy" ></img></div> 

</div>
</div>

         </div>


       


<div className='p-6'>
<h2 className='text-base font-semibold'>
<h3 className='whitespace-nowrap'>{companyHeading} </h3>
<b className='whitespace-nowrap'>{companyHeadingPart}</b> 
    {subcompanyHeading}
</h2>

</div>






<div className='p-3 pt-16'>
<div className=' flex flex-col sm:flex-row  w-full m-auto'>
    <div className=" w-full sm:w-[40%] m-auto"><Link to={"/showDemo"}><button className='bg-[#202020] text-white p-4 text-center rounded-md  w-full mt-1  sm:hover:bg-gray-200 sm:hover:text-black transition-all duration-500'>{DemoBtn}</button></Link></div>

 <div className=" w-full sm:w-[40%] m-auto"><button onClick={()=>handleCheck()} className='  bg-[#202020] text-white p-4 text-center rounded-md w-full  mt-1 sm:hover:bg-gray-200 sm:hover:text-black transition-all duration-500'>{UplodBtn}</button></div>
</div>
</div>
<div className='mt-14 pt-14 bg-[#202020] border border-gray-300 m-auto pb-10'>
    <div className='w-[95%]  sm:w-4/5 m-auto'><img src={"https://ucarecdn.com/591612ec-bdd0-41bf-ac70-31228fe4dfd9/gif.gif"} loading='lazy' alt="GIF"></img></div>
</div>


<div className='mt-16'>
{/* p-2 w-full sm:w-4/5 sm:m-auto*/}
<div className='p-2 w-full sm:w-4/5 sm:m-auto'>
<div className="flex flex-col lg:flex-row justify-between w-[95%]">
<div><h1 className='whitespace-nowrap text-4xl font-serif font-bold'> {Faqs} </h1><h2 className=' text-2xl font-semibold'> {FaqPart} </h2> </div>

<div>

    <div className='mt-12'>
        <Faq/>
    </div>
</div>
</div>

</div>




</div>




        </div> 
    )
}
export default InitialPage