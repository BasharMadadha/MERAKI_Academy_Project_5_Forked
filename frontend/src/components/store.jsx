import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlicer/auth'
import registerReducer  from './redux/RegisterSlicer/register';
import navReducer from './redux/navSlicer/nav'
const store = configureStore({
    reducer:{
        auth: authReducer,
        register:registerReducer,
        nav:navReducer
    }
})

export default store