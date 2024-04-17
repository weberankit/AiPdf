
import {useSelector,useDispatch} from "react-redux"
import { KEYDICT,KEYGPT,KEYLANG } from "./userKey"

const useStatusCheck=()=>{
    const dispatch=useDispatch()



const selectingAllkeyVaues=useSelector((store)=>store.userskey)
//if no value is used then pass default key value
if(!selectingAllkeyVaues.keyGPT)dispatch(KEYGPT({gpt:"default",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyDICT)dispatch(KEYDICT({dict:"249cfc4f8bmsh14ca1ab5bea4ba2p184ad5jsn725f9495ed5a",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyLANG)dispatch(KEYLANG({trans:"9b670f90b8msh17cdfaa605e1b15p1e5aadjsn5f813caa0f26",msg:"using default key"}));

}

export default useStatusCheck