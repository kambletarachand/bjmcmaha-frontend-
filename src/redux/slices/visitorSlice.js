
// src/redux/visitorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  visitor: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Thunk for login
export const loginVisitor = createAsyncThunk(
  'visitor/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8989/api/visitors/request/login`, {
        email,
        password,
      });

      const visitor = response.data;

      // Check if email is verified
      if (!visitor.verified) {
        return rejectWithValue('Email not verified. Please check your inbox.');
      }

      return visitor;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed. Please try again.');
    }
  }
);

const visitorSlice = createSlice({
  name: 'visitor',
  initialState,
  reducers: {
    logoutVisitor: (state) => {
      state.visitor = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVisitor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginVisitor.fulfilled, (state, action) => {
        state.loading = false;
        state.visitor = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginVisitor.rejected, (state, action) => {
        state.loading = false;
        state.visitor = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logoutVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
