import {createSlice} from "@reduxjs/toolkit"
//import { translate } from "pdf-lib"

const aiResponse = createSlice({
    name:"aiResponse",
    initialState:{
     
    
     dataDictRes:null,
     toggleExample:false,
     translResponse:null
    },
    reducers:{
    aiRes:(state,action)=>{
     state.dataDictRes=action.payload
    },
    toggleEg:(state)=>{
        state.toggleExample=!state.toggleExample
    },
    translateApi:(state,action)=>{
        state.translResponse=action.payload
    }
     

    }
})

export default aiResponse.reducer 
export const{aiRes,toggleEg,translateApi} = aiResponse.actions