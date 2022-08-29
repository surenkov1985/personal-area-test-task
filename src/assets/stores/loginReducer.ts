
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        modal: false,
        data: [],
        status: null,
        user: null,
        error: null
    },
    reducers: {
        modalToggle(state, action) {
            state.modal = !action.payload
        },
        authUser(state, action) {
            state.user = action.payload
        },
        updateUser(state, action) {
            state.data = action.payload
        }
    },
  
})

export const {modalToggle, authUser, updateUser} = loginSlice.actions
export default loginSlice.reducer