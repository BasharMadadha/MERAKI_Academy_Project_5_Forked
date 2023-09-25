import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  
  };
  const friendSlice =createSlice({
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
      getUserFriends: (state, action) => {
        state.friends = action.payload;
       
      },
    },
  })

  export const {addFriend,deleteFriend,getUserFriends} = 
  friendSlice.actions
  export default friendSlice.reducer;