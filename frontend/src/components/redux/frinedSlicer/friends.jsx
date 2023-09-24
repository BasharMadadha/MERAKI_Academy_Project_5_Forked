import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   friends: [],
  };
  const freindSlicer =createSlice({
    name: "friends",
    initialState,
    reducers: {
      addFriend: (state, action) => {
        state.friends.push(action.payload);
      },
      deleteFriend: (state, action) => {
        state.friends = state.friends.filter(
          (friend) => friend.id!== action.payload
        );
      },
    },
  })

  export const {addFriend,deleteFriend} = 
  freindSlicer.actions
  export default freindSlicer.reducer