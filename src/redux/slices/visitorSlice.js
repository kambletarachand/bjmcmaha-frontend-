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
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVisitor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVisitor.fulfilled, (state, action) => {
        state.loading = false;
        state.visitor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginVisitor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
