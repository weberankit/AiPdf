import { createSlice } from "@reduxjs/toolkit";




const useStoreDataSlice=createSlice({
    name:"data",
    initialState:{
       
        dictiDataTosendMail:[]
    },
    reducers:{
   //filter the value
   sendAllDictData:(state,action)=>{
    let data=action.payload
    if(data?.message){
        state.dictiDataTosendMail.push(`${data?.message}`)
    }else{
   data && data?.map((item)=>{

        state.dictiDataTosendMail.push(`${item?.normalizedSource} : ${(item?.translations[0]?.displayTarget)?item?.translations[0]?.displayTarget:"😔"},${(item?.translations[1]?.displayTarget)?item?.translations[1]?.displayTarget:"😔"},${(item?.translations[2]?.displayTarget)?item?.translations[2]?.displayTarget:"😔"}`)
       
    })
}


 
   }

    }
})
export default useStoreDataSlice.reducer
export const {sendAllDictData}=useStoreDataSlice.actions