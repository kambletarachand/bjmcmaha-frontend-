 
// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // or provide a default user object
  // other auth-related properties
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // define your reducers here
  },
});

export const { /* your actions */ } = authSlice.actions;
export default authSlice.reducer;
