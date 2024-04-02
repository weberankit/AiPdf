import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import userFiles from "./userFiles"
const appStore=configureStore({
reducer:{
userInformation:userSlice,
fileInformation:userFiles
}

})

export default appStore