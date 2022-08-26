
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        login: false,
        data: [],
        status: null,
        user: null,
        error: null
    },
    reducers: {
        loginToggle(state, action) {
            state.login = !action.payload
        },
        authUser(state, action) {
            state.user = action.payload
        }
    },
  
})

export const {loginToggle, authUser} = loginSlice.actions
export default loginSlice.reducer