import {createSlice} from "@reduxjs/toolkit"

const aiResponse = createSlice({
    name:"aiResponse",
    initialState:{
     
    
     dataDictRes:null,
     toggleExample:false
    },
    reducers:{
    aiRes:(state,action)=>{
     state.dataDictRes=action.payload
    },
    toggleEg:(state)=>{
        state.toggleExample=!state.toggleExample
    }
     

    }
})

export default aiResponse.reducer 
export const{aiRes,toggleEg} = aiResponse.actions