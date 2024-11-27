
import { Outlet } from "react-router-dom"
import Heading from "../components/Heading"
const LayoutMain=()=>{
    return(
        <>
       {/**I know we can use same component but earlier i have used so right now I am using this samw */} 
        <Outlet/>
        
        </>
    )
}
export default LayoutMain