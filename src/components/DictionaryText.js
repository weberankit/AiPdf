import {useDispatch} from "react-redux"

import { dicitValue } from "../utils/aiManagment"
const DictionaryText=()=>{
    const dispatch=useDispatch()
    return(
        <>
        <p>dictionary file</p>
        <button onClick={()=>{dispatch(dicitValue(false))}}>close</button>
        </>
    )
}
export default DictionaryText