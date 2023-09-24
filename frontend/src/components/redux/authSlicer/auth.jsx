import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  userInfo:JSON.parse(localStorage.getItem("userInfo")) || null,
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
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    setLogout: (state) => {
      state.token = null;
      state.isLogged = false;
      state.userId = null;
      state.userInfo = null;
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
export const { setLogin, setUserId, setLogout, setEmail, setPassword,setUserInfo } =
  authSlice.actions;
export default authSlice.reducer;