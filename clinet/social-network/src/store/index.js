import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlicer";

export const store = configureStore({

    reducer: {
        user: userReducer, 
    },
});