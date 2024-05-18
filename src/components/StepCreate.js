import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToogleNav } from "../utils/useStoreDataSlice"
const StepCreate=({data,last,links})=>{
const dispatch=useDispatch()
dispatch(addToogleNav())


    return(
        <>
        <div className="p-4 w-full">
       <Link to="/setting"><button className="fixed left-0 p-1 rounded-lg bg-black text-white px-2">Back to setting</button></Link> 
       <div className="text-sm font-semibold m-4 p-2 mt-8"> If you face any difficulty for creating key <a href="mailto:impmessageweb@gmail.com" target="_blank" rel="noopener noreferrer"><button className="p-2 rounded-lg bg-black text-white hover:bg-yellow-400 text-xs">contact   </button></a> </div>
      <div className="pt-10">
        
        <p className="p-1 bg-blue-700 text-white rounded-sm inline-block">Please note that it took hardly  max to max 2 minutes to create this</p>
        <p><span className="p-2 m-1 font-bold text-base">Step-1:</span> follow the below step <span className="font-bold text-black">after</span> visit  on this <a className="text-blue-800 underline" href={links} rel="noopener noreferrer" target="_blank"> link </a> </p>
       {data.map((item,index)=>{
        return(<>
       <div className="p-2 m-4 border border-yellow-700"> <span className="p-2 m-1 font-bold text-base animate-pulse mb-2">Step-{index+2}</span> <img className="w-[90%] m-auto" alt="step-image" src={item} loading="lazy"></img></div>
        
        
        </>)
       })}
       <div className="border border-yellow-700">  <span className="p-2 m-1 font-bold text-base animate-pulse">Step-10 : Note go to the <Link className="p-1 px-2 rounded-sm bg-black text-white" to={"/setting"}>Setting</Link> and follow beolw step</span><img src={last} alt="final-step " loading="lazy"></img></div>
        
        
        </div>  
        
        </div>
        <div className="w-2/3 p-4 m-auto mb-10 mt-4 bg-yellow-800 ">yes you Have completed all steps Now you are using this web by using your key that means you can use it for Enogh times</div>
        <p className="p-10 font-semibold text-sm">whenever if your key expires either you can purchase it or use the above process</p>
        </>
    )
}
export default StepCreate