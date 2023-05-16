import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/userSlice'
import contentReducer from'../features/contents/contentSlice'
export default configureStore({
    reducer: {
        users: userReducer,
        contents:contentReducer

    }
})