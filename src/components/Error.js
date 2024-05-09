import {Link} from "react-router-dom"
const Error=()=>{
    return(
        <>
        <div className="p-10 text-center pt-40">
            <p className="text-black font-bold  ">Sorry! Something went Wrong </p>
            <Link to={"/"}> <div className="text-white text-center font-bold text-sm bg-red-600 rounded-lg p-3 py-2 inline-block ">Back to Home</div></Link> 
            <div className="text-sm font-semibold m-4 p-2"> please Report the Error your 1 minute will improve this website <a href="mailto:impmessageweb@gmail.com" target="_blank" rel="noopener noreferrer"><button className="p-2 rounded-lg bg-black text-white hover:bg-yellow-400 text-xs">Report  </button></a> </div>
        </div>
        </>
    )
}
export default Error