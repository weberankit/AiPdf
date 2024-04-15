import {createSlice} from "@reduxjs/toolkit"

const userKey=  createSlice({
    name:"userKey",
    initialState:{
        keyGPT:null,
        KeyDICT:null,
        KeyLANG:null,
        toggleToCallApi:false
    },
    reducers:{
        KEYGPT:(state,action)=>{
            state.keyGPT=action.payload
       }
       ,
       KEYDICT:(state,action)=>{
            state.KeyDICT=action.payload
       },
       
       KEYLANG:(state,action)=>{
            state.KeyLANG=action.payload
       },
       toggleForApi:(state)=>{
        state.toggleToCallApi=!state.toggleToCallApi
       }
    }
})
export default userKey.reducer
export const {KEYGPT,KEYDICT,KEYLANG,toggleForApi} = userKey.actions