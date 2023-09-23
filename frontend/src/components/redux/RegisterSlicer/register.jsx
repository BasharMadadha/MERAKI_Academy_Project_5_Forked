import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
    email: '',
    image: '',
}
const  registerSlice = createSlice({
    name:'register',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
    },
})
export const {setUsername, setPassword, setEmail, setImage}=
registerSlice.actions

export default registerSlice.reducer