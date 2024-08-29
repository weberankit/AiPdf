
import {useSelector,useDispatch} from "react-redux"
import { KEYDICT,KEYGPT,KEYLANG } from "./userKey"

const useStatusCheck=()=>{
    const dispatch=useDispatch()

   

const selectingAllkeyVaues=useSelector((store)=>store.userskey)
//if no value is used then pass default key value
if(!selectingAllkeyVaues.keyGPT)dispatch(KEYGPT({gpt:"AIzaSyB8dNlZY_A8Iv6GXHetD0NazcmuMHl54Ro",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyDICT)dispatch(KEYDICT({dict:"e210f23be3msh3e034747f16c4dap1c6f18jsnf8dd7ef348cd",msg:"using default key"}));
if(!selectingAllkeyVaues.KeyLANG)dispatch(KEYLANG({trans:"9b670f90b8msh17cdfaa605e1b15p1e5aadjsn5f813caa0f26",msg:"using default key"}));

}

export default useStatusCheck