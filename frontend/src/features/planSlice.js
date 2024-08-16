// planSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('access_token');
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createPlan = createAsyncThunk('plans/createPlan', async ({ userId, planType, planName }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/plan/create-plan/${userId}`, { planType, planName }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || error.message); // Return error message
  }
});

export const deletePlan = createAsyncThunk('plans/deletePlan', async ({ userId, planId }) => {
  const token = getToken();
  try {
    await axios.delete(`${BACKEND_URL}/api/plan/delete-plan/${userId}/${planId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return planId;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || error.message); // Return error message
  }
});

export const fetchPlans = createAsyncThunk('plans/fetchPlans', async ({ userId }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/plan/get-plans/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.plans;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || error.message); // Return error message
  }
});

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPlan.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePlan.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(plan => plan.id !== action.payload);
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default planSlice.reducer;




