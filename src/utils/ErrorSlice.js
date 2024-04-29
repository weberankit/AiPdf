import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice=createSlice({
    name:"errors",
    initialState:{
        gptResponseError:null
    },
    reducers:{
    gptError:(state,action)=>{
        state.gptResponseError=action.payload
    }
    }
})
export default ErrorSlice.reducer
export const {gptError}=ErrorSlice.actions