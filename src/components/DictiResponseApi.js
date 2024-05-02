import { useSelector,useDispatch } from "react-redux"
import { toggleEg } from "../utils/aiResponseSlice"
const DictiResponseApi=({data})=>{
const dispatch=useDispatch()
const selectRespDict=useSelector((store)=>store.aiRespond?.dataDictRes)
//console.log(selectRespDict)
const selectToogleEg=useSelector((store)=>store.aiRespond?.toggleExample)
console.log(data?.message)
console.log(data?.error?.message)
if(data?.error?.message){
  
  return `please check ${data?.error?.message}`
}

    return(
        <>
        {(data?.message) ? <div className="p-2">{data?.message}</div> :
            data && data?.map((item)=>{
                return(
                   <div className="p-2 text-black">
                  <p>  {item?.normalizedSource} : {item?.translations[0]?.displayTarget},{item?.translations[1]?.displayTarget},{item?.translations[2]?.displayTarget}
                   </p>
                   </div>
                )
            })
        }

        <div>
           
            <button className="bg-black text-sm  text-white  p-1 m-1 rounded-lg hover:bg-yellow-600" onClick={()=>dispatch(toggleEg())}>{selectToogleEg===true ?"hide examples":"click for examples & def"}</button>

{selectToogleEg &&
  selectRespDict?.map((wordObj,index) =>{ 
    console.log(wordObj,"this is obk",index)
    return(
   
    <div key={wordObj?.word} className="text-black text-xs">
      <h5>{(wordObj[0]?.word)?wordObj[0]?.word:"not found"} ------
       { (wordObj[0]?.meanings[1]?.definitions[0]?.example) ? wordObj[0]?.meanings[1]?.definitions[0]?.example : wordObj[0]?.meanings[0]?.definitions[0]?.definition}</h5>
    </div>

  )})}
</div>

        </>
    )
}
export  default DictiResponseApi