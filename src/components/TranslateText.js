import {useDispatch} from "react-redux"
import { translateValue } from "../utils/aiManagment"
const TranslateText=()=>{
const dispatch=useDispatch()
    return(
        <>

        <p>Translatefiles</p>


       <button onClick={()=>{dispatch(translateValue(false))}}>close</button>

        </>
    )
}
export default TranslateText