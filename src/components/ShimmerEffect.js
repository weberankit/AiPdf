const ShimmerEffect=()=>{

    const res=new Array(1).fill(undefined);
   // console.log(res)
  
      return(
     <div className="flex flex-wrap m-2 p-4 justify-center">
       { res.map((item , index)=>{
      //using index is not ecommend but here its ok as it is shimmer 2nd- bg-gray-400
       return(
       <div key={index} className=" m-3.5 px-2 py-5 animate-pulse  bg-gray-700 pt-4">
        <div className="flex flex-col">
          <div className=" w-screen h-52 rounded-md bg-gray-800 bg-g"></div>
          
        </div>
      </div>
       )
     }) 
  }
     </div>
      )

}
export default ShimmerEffect