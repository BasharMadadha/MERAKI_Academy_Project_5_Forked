import { createSlice } from "@reduxjs/toolkit";


const notifSlice = createSlice({
  name: "notification",
  initialState:{
    notification: []
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
export const {setNotification} =
  notifSlice.actions;
export default notifSlice.reducer;