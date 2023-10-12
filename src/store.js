import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./features/UserDataSlice"
const store = configureStore({
    reducer: {
        user: userDetailSlice
    }
})

export default store