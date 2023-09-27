import { createSlice } from "@reduxjs/toolkit";


const notifSlice = createSlice({
  name: "notif",
  initialState:{
    notification: []
  },
  reducers: {
    newnotif: (state, action) => {
      state.usersSearch = action.payload;
    },
  },
});
export const {setUsersSearch} =
  notifSlice.actions;
export default notifSlice.reducer;