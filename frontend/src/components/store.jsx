import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlicer/auth";
import registerReducer from "./redux/RegisterSlicer/register";
import navReducer from "./redux/navSlicer/nav";
import friendReducer from "./redux/frinedSlicer/friends";
import notifReducer from "./redux/notifSlicer/notif";
import cardsReducer  from "./redux/cardSlicer/card";
import postsReducer from "./redux/postSlicer/post"
const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    nav: navReducer,
    friends: friendReducer,
    notif: notifReducer,
    cards: cardsReducer,
    posts: postsReducer
  },
});

export default store;
