import { createSlice } from "@reduxjs/toolkit";

const userFiles=createSlice({
    name:"userfiles",
    initialState:{
        arry:null,
        toogle:false,
        file:null,
        fileMeta:{},
        text:null
    },
    reducers:{
        filesUser:(state,action)=>{
            state.arry=action.payload
        },
        toggler:(state,action)=>{
            state.toogle=!state.toogle
        },
        addFile:(state,action)=>{
          state.file=action.payload
        },
        SetselectedText:(state,action)=>{
            state.text=action.payload
        }

/*
        addFileMeta:(state,action)=>{
            console.log(action.payload,"ACTION")

            const data=action.payload
            const {fullPath,name,size}=data
            if(state.fileMeta[data.generation]){

            }else{
               state.fileMeta[data.generation]={fullPath,name,size} ;
            }

            //state.fileMeta.push(action.payload)
        }*/
    }
})

export default userFiles.reducer
export const {filesUser,toggler,addFile ,SetselectedText} = userFiles.actions