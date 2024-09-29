import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  charName: '',
  password: '',
  feeling: localStorage.getItem('feeling') || '',
  userId: localStorage.getItem('userId') || '',
  status: 'idle',  // This will track the overall status
  error: ''
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}api/auth/signup`, userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err.message);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}api/auth/signin`, userData, { withCredentials: true });
    localStorage.setItem('access_token', response.data.token);
    localStorage.setItem('feeling', response.data.user.feeling);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue(err.message);
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await axios.get(`${BACKEND_URL}api/auth/signout`);
    localStorage.removeItem('access_token');
    localStorage.removeItem('feeling');
    localStorage.removeItem('userId');
    return;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('access_token');
    await axios.delete(`${BACKEND_URL}api/auth/delete-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('feeling');
    localStorage.removeItem('userId');
    return;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

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
      localStorage.setItem('feeling', action.payload);
    },
    clearError(state) {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded';
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
      })
      .addCase(signOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = 'succeeded';
        state.userId = '';
        state.feeling = '';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';  // Set status to loading when deleteUser is pending
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';  // Set status to succeeded when deleteUser is fulfilled
        state.userId = '';
        state.feeling = '';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCharName, setPassword, setFeelings, clearError } = authSlice.actions;

export default authSlice.reducer;