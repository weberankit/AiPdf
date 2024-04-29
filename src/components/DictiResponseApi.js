import { useSelector,useDispatch } from "react-redux"
import { toggleEg } from "../utils/aiResponseSlice"
const DictiResponseApi=({data})=>{
const dispatch=useDispatch()
const selectRespDict=useSelector((store)=>store.aiRespond?.dataDictRes)
//console.log(selectRespDict)
const selectToogleEg=useSelector((store)=>store.aiRespond?.toggleExample)
console.log(data)

    return(
        <>
        {data?.message ? <div className="p-2">{data?.message}</div>:
            data && data?.map((item)=>{
                return(
                   <div className="p-2">
                  <p>  {item?.normalizedSource} : {item?.translations[0]?.displayTarget},{item?.translations[1]?.displayTarget},{item?.translations[2]?.displayTarget}
                   </p>
                   </div>
                )
            })
        }

        <div>
           
            <button className="bg-blue-800 p-1 m-1 rounded-md" onClick={()=>dispatch(toggleEg())}>{selectToogleEg===true ?"hide examples":"click for examples & def"}</button>

{selectToogleEg &&
  selectRespDict?.map((wordObj,index) =>{ 
    console.log(wordObj,"this is obk",index)
    return(
   
    <div key={wordObj?.word} className="text-white text-xs">
      <h5>{(wordObj[0]?.word)?wordObj[0]?.word:"not found"} ------
       { (wordObj[0]?.meanings[1]?.definitions[0]?.example) ? wordObj[0]?.meanings[1]?.definitions[0]?.example : wordObj[0]?.meanings[0]?.definitions[0]?.definition}</h5>
    </div>

  )})}
</div>

        </>
    )
}
export  default DictiResponseApi