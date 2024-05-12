import {Link} from "react-router-dom"
import { useState } from "react"
const Demo=()=>{

const [skip , setSkip]=useState(0)
    return(
  
      <>  







        <div> <h1 className="text-center bg-black text-white p-2"> <Link to="/"><button className="bg-red-600 p-2 m-1 rounded-md">back</button></Link> , please check the  video/pdf   to understand how it work  </h1></div>
        <div className="w-4/5 sm:w-1/2 m-auto pt-28">
<div className="flex flex-col  justify-between ">
    <div>
        <iframe 
        className="w-full rounded-2xl shadow-lg hover:cursor-pointer h-96"
        frameborder="0"
         width="100%"
          height="100%"
          
            src={`https://geo.dailymotion.com/player/xqoji.html?video=x8ydplo&playlist=x8ccmi&mute=true&loop=true&startTime=${skip} `}
            allowfullscreen
            webkitallowfullscreen
            allow="autoplay; fullscreen; picture-in-picture;" 
            title="Demo Video">

            </iframe>
            <p>click on video for more controll   ,  <span className="bg-black p-1 m-1 rounded-md text-xs text-white font-semibold cursor-pointer" onClick={()=>setSkip(80)}>jump to main features</span></p>
</div>
<div className="pt-4 "><a href="https://drive.google.com/file/d/12-f2caSfdYKkLCuQc6-evHSj9dzRhhfs/view?usp=sharing" target="_blank"  rel="noopener noreferrer"><button className=" bg-black text-white p-2 rounded-lg w-18 ">Instruction Pdf</button></a></div>
</div>


<Link to={"/"}><div className="bg-black animate-pulse p-2 w-1/2 rounded-md text-white mt-28 text-center  m-auto hover cursor-pointer" >Go to the Upload Page</div></Link>
  
</div>
</>
    )
}

export default Demo