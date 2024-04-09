import {createSlice} from "@reduxjs/toolkit"

const aiFile = createSlice({
    name:"aiFiles",
    initialState:{
     Gpt:null,
     Dictionary:null,
     Translate:null,
     keyfromFirebase:null,
    
     readDataToggle:true
    },
    reducers:{
    gptValue:(state,action)=>{
     state.Gpt=action.payload
    },
    dicitValue:(state,action)=>{
        state.Dictionary=action.payload
    },
    translateValue:(state,action)=>{
        state.Translate=action.payload
    }
     ,
     keyFireBase:(state,action)=>{
       state.keyfromFirebase=action.payload
       
     },
     readToggle:(state)=>{
        state.readDataToggle=!state.readDataToggle
     },
     

    }
})

export default aiFile.reducer 
export const{gptValue,dicitValue,translateValue,keyFireBase,readToggle} = aiFile.actions