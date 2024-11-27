import { createSlice } from "@reduxjs/toolkit";

const genarateQuestionSlice=createSlice(
    {
        name:"questionslice",
        initialState:{
            questiondata:null
        },
        reducers:{
            addGenQuestion:(state,action)=>{
            state.questiondata = action.payload
        }
        }
    }
)
export default genarateQuestionSlice.reducer
export const {addGenQuestion} = genarateQuestionSlice.actions