import { createSlice } from "@reduxjs/toolkit";

const geminiResponseSlice=createSlice({
    name:"responseAi",
initialState:{
    responseArray:[],
    userQuery:null
},
reducers:{
addgiminRes:(state,action)=>{
    state.responseArray.push(action.payload)
},
addUserQuery:(state,action)=>{
    state.userQuery=action.payload
}

}


})
export const {addgiminRes,addUserQuery} = geminiResponseSlice.actions
export default geminiResponseSlice.reducer
