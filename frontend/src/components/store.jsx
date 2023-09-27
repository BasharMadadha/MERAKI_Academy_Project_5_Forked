import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlicer/auth'
import registerReducer  from './redux/RegisterSlicer/register';
import navReducer from './redux/navSlicer/nav'
import friendReducer from './redux/frinedSlicer/friends'
import notifReducer from './redux/notifSlicer/notif'
const store = configureStore({
    reducer:{
        auth: authReducer,
        register:registerReducer,
        nav:navReducer,
        friends: friendReducer,
        notif: notifReducer
    }
})

export default store