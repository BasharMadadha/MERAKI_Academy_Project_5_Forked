import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isLogged: localStorage.getItem("token") ? true : false,
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.isLogged = false;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { setLogin, setUserId, setLogout, setEmail, setPassword } =
  authSlice.actions;
export default authSlice.reducer;