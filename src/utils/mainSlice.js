import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import userFiles from "./userFiles"
import aiManagment from "./aiManagment"
import userKey from "./userKey"
const appStore=configureStore({
reducer:{
userInformation:userSlice,
fileInformation:userFiles,
aiManage:aiManagment,
userskey:userKey
}

})

export default appStore