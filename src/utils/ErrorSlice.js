import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice=createSlice({
    name:"errors",
    initialState:{
        gptResponseError:null,
        loginEmailMsg:false,
        firebaseError:null,
        sendDataMsg:null,
        searchMsg:null
      
    },
    reducers:{
    gptError:(state,action)=>{
        state.gptResponseError=action.payload
    },
    loginMsg:(state,action)=>{
    state.loginEmailMsg=!state.loginEmailMsg
    },
    fireBaseErr:(state,action)=>{
        state.firebaseError=action.payload
    },
    sendDataMail:(state,action)=>{
        state.sendDataMsg=action.payload
    } ,
    addSearchMsg:(state,action)=>{
        state.searchMsg=action.payload
    }

    }
})
export default ErrorSlice.reducer
export const {gptError,loginMsg,fireBaseErr,sendDataMail,addSearchMsg}=ErrorSlice.actions