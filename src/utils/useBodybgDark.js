import {useEffect} from "react"
import {useSelector ,useDispatch} from "react-redux"
import { addDarkMode } from '../utils/userSlice';

const useBodybgDark=()=>{
    const selectDarkToogle=useSelector((store)=>store.userInformation.darkModes)

    useEffect(()=>{
        if(selectDarkToogle){
          document.body.style.backgroundColor = "#242a33"
        }else{
          document.body.style.backgroundColor = "white"
        }
      },[selectDarkToogle])
  

}
export default useBodybgDark

export const useSignBgOnRefresh=()=>{
    const dispatch=useDispatch()
    useEffect(() => {
        const getDefaultDark=localStorage.getItem("darkModes")
        if(getDefaultDark){
        if(getDefaultDark === "white"){
        dispatch(addDarkMode(false))
        }
        if(getDefaultDark === "black"){
          dispatch(addDarkMode(true))
        }
        }
      },[])
}