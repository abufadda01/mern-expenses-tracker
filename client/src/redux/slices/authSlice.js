import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth" ,
    initialState : {
        user : JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null,
        token : localStorage.getItem("token") ? localStorage.getItem("token") : null
    },
    reducers : {
        loginAction : (state , action) => {
            state.user = action.payload.user
            state.token = action.payload.token

        },
        logoutAction : (state , action) => {
            state.user = null
            state.token = null
        },
    }
})


export const {loginAction , logoutAction} = authSlice.actions

export default authSlice