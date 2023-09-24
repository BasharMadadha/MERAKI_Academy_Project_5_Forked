import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
  name: "nav",
  initialState:{
    usersSearch: []
  },
  reducers: {
    setUsersSearch: (state, action) => {
      state.usersSearch = action.payload;
    },
  },
});
export const {setUsersSearch} =
  navSlice.actions;
export default navSlice.reducer;