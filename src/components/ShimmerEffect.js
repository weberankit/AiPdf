const ShimmerEffect=()=>{

    const res=new Array(1).fill(undefined);
   // console.log(res)
  
      return(
     <div className="flex flex-wrap sm:m-2 p-4 justify-center">
       { res.map((item , index)=>{
      //using index is not ecommend but here its ok as it is shimmer 2nd- bg-gray-400
       return(
       <div key={index} className=" sm:m-3.5  px-36 md:pl-96 py-1 animate-pulse  bg-gray-400 pt-4 rounded-2xl">
        <div className="flex flex-col">
          <div className=" w-full h-4 rounded-md bg-white bg-g"></div>
          
        </div>
      </div>
       )
     }) 
  }
     </div>
      )

}
export default ShimmerEffect