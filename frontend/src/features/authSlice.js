import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  charName: '',
  password: '',
  feeling: '',
  userId: localStorage.getItem('userId') || '', // Add userId to the initial state
  status: 'idle',
  error: ''
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Define async thunk for signup
export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      // Return the error message from the server response
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err.message);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/signin`, userData , {withCredentials: true});
    localStorage.setItem('access_token', response.data.token);
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
    },
    clearError(state) {
      state.error = '';
    },
    signOut(state) {
      state.userId = '';
      localStorage.removeItem('userId');
      localStorage.removeItem('access_token');
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
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload.user.id;
        state.feeling = action.payload.user.feeling;
        localStorage.setItem('userId', action.payload.user.id);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCharName, setPassword, setFeelings, clearError, signOut} = authSlice.actions;

export default authSlice.reducer;


