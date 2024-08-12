// taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTasks = createAsyncThunk('plans/fetchPlans', async (userId) => {
  const token = getToken();
  const response = await axios.get(`${BACKEND_URL}/api/plan/get-tasks-plans/${userId}`,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ userId, taskName, planId, taskType }) => {
  const response = await axios.post(`${BACKEND_URL}/api/task/create-task/${userId}`, { taskName, planId, taskType });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ userId, taskId }) => {
  await axios.delete(`${BACKEND_URL}/api/task/delete-task/${userId}/${taskId}`);
  return taskId;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ userId, taskId, taskData }) => {
  const response = await axios.post(`${BACKEND_URL}/api/task/update-task/${userId}/${taskId}`, taskData);
  return response.data.task;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;

