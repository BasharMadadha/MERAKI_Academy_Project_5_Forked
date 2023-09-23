import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlicer/auth'
import registerReducer  from './redux/RegisterSlicer/register';
const store = configureStore({
    reducer:{
        auth: authReducer,
        register:registerReducer
    }
})

export default store