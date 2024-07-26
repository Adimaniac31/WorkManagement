import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  charName: '',
  password: '',
  feeling: '',
  status: 'idle',
  error: null
};

// Define async thunk for signup
export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      // Return the error message from the server response
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err.message);
  }
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCharName(state, action) {
      state.charName = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setFeelings(state, action) {
      state.feeling = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally handle success (e.g., clear form or redirect)
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCharName, setPassword, setFeelings } = authSlice.actions;

export default authSlice.reducer;

