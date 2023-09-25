import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlicer/auth'
import registerReducer  from './redux/RegisterSlicer/register';
import navReducer from './redux/navSlicer/nav'
import friendReducer from './redux/frinedSlicer/friends'
const store = configureStore({
    reducer:{
        auth: authReducer,
        register:registerReducer,
        nav:navReducer,
        friends: friendReducer,
    }
})

export default store