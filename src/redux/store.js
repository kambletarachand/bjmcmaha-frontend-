 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Ensure the correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
