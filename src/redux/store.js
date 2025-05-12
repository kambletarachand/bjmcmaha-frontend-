 
import { configureStore } from "@reduxjs/toolkit";
import visitorReducer from "./slices/visitorSlice"; // Ensure the correct path

const store = configureStore({
  reducer: {
     visitor: visitorReducer,
  },
});

export default store;
