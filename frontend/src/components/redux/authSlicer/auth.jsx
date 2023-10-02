import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  isLogged: localStorage.getItem("token") ? true : false,
  email: "",
  password: "",
  users: JSON.parse(localStorage.getItem("users")) || null,
  user_id: localStorage.getItem("user_id") || null,
  toggleProf: localStorage.getItem("toggleProf") ? true : false,
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
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
    setUser_id: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
    setToggleProf: (state, action) => {
      state.toggleProf = action.payload;
      localStorage.setItem("toggleProf", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.isLogged = false;
      state.userId = null;
      state.userInfo = null;
      state.toggleProf = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userInfo");
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  setLogin,
  setUsers,
  setUserId,
  setLogout,
  setEmail,
  setPassword,
  setUserInfo,
  setUser_id,
  setToggleProf,
} = authSlice.actions;
export default authSlice.reducer;
