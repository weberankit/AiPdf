import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice=createSlice({
    name:"errors",
    initialState:{
        gptResponseError:null,
        loginEmailMsg:false
    },
    reducers:{
    gptError:(state,action)=>{
        state.gptResponseError=action.payload
    },
    loginMsg:(state,action)=>{
    state.loginEmailMsg=!state.loginEmailMsg
    }

    }
})
export default ErrorSlice.reducer
export const {gptError,loginMsg}=ErrorSlice.actions