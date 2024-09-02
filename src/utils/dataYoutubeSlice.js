import { createSlice } from "@reduxjs/toolkit";


const dataYoutubeSlice=createSlice(
    {
    
name:"ytslice",
initialState:{
listYt:null,
queryInput:null,
ytStatus:true,
showMsg:null
},
reducers:{
    addListYt:(state,action)=>{
state.listYt=action.payload
    },
addQueryInput:(state,action)=>{
    state.queryInput=action.payload
},
addShowLatestStatus:(state,action)=>{
    state.ytStatus=action.payload
},
addShowMsgi:(state,action)=>{
    state.showMsg=action.payload
}

}


    }
)

export default dataYoutubeSlice.reducer
export const {addListYt,addQueryInput,addShowLatestStatus,addShowMsgi} = dataYoutubeSlice.actions 