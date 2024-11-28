
import { useSelector,useDispatch } from "react-redux"
import { toggleEg } from "../utils/aiResponseSlice"
//import { sendAllDictData } from "../utils/useStoreDataSlice"
const DictiResponseApi=({data})=>{
const dispatch=useDispatch()
const selectSearchMsg=useSelector((store)=>store.ErrorSliced.searchMsg)

const selectRespDict=useSelector((store)=>store.aiRespond?.dataDictRes)

const selectToogleEg=useSelector((store)=>store.aiRespond?.toggleExample)


/*
if(data?.error?.message){
  
  return `please check ${data?.error?.message}`
}*/

    return(
        <>
          {selectSearchMsg&& <div className="bg-black text-center text-sm p-1 m-1 fixed text-white rounded-md"> {selectSearchMsg}</div>}
      
     { !data?.error?.message ? <> {(data?.message) ? <div className="p-2">{data?.message}</div> :
             data?.map((item,index)=>{
                return(
                   <div key={index} className="bg-[#758bfd] text-white p-2 rounded-lg  mb-1 border-b border-black font-serif">
                  <p className="bg-[#758bfd] text-white p-2 rounded-lg  mb-1 border-b border-black font-serif">  {item?.normalizedSource} : {item?.translations[0]?.displayTarget},{item?.translations[1]?.displayTarget},{item?.translations[2]?.displayTarget}
                   </p>
                 
                   </div>
                )
            })
        } </>  :<div className="text-xs text-white">sorry right now microsoft-rapid-api is not working . Meanwhile you can use below ones</div>}

        <div>
           
            <button className="bg-black text-sm  text-white  p-1 m-1 rounded-lg hover:bg-yellow-600" onClick={()=>dispatch(toggleEg())}>{!selectToogleEg===true ?"hide examples":"click here for definition"}</button>

{!selectToogleEg &&
  selectRespDict?.map((wordObj,index) =>{ 
    console.log(wordObj,"this is obk",index)
    return(
   
    <div key={index} className="bg-[#758bfd] text-white p-2 rounded-lg  mb-1 border-b border-black font-serif text-xs">
      <h5>{(wordObj[0]?.word)?wordObj[0]?.word:"not found"} ------
       { (wordObj[0]?.meanings[1]?.definitions[0]?.example) ? wordObj[0]?.meanings[1]?.definitions[0]?.example : wordObj[0]?.meanings[0]?.definitions[0]?.definition}</h5>
    </div>

  )})}
</div>

        </>
    )
}
export  default DictiResponseApi