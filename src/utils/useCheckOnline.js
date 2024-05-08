import { useState ,useEffect} from "react";

const useCheckOnline=()=>{
const [online , setOnline]=useState(true)


useEffect(()=>{
    const handleOnline = () => {
        setOnline(true);
        console.log("Online");
      };
  
      const handleOffline = () => {
        setOnline(false);
        console.log("Offline");
      };
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };

},[])

return online

}
export default useCheckOnline;