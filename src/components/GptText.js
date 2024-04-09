import { gptValue } from "../utils/aiManagment"
import {useDispatch} from "react-redux"
const GptText=()=>{
    const dispatch=useDispatch()
    return(
        <>
        <p>Gptfile</p>
        <button onClick={()=>{dispatch(gptValue(false))}}>close</button>
        </>
    )
}
export default GptText