import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlicer/auth";
import registerReducer from "./redux/RegisterSlicer/register";
import navReducer from "./redux/navSlicer/nav";
import friendReducer from "./redux/frinedSlicer/friends";
import notifReducer from "./redux/notifSlicer/notification";
import cardsReducer  from "./redux/cardSlicer/card";
import postsReducer from "./redux/postSlicer/post"
import notificationReducer from './redux/notifSlicer/notification';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    nav: navReducer,
    friends: friendReducer,
    notif: notifReducer,
    cards: cardsReducer,
    posts: postsReducer,
    notifications: notificationReducer
  },
});

export default store;
