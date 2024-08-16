import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('access_token');
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTasks = createAsyncThunk('plans/fetchTasks', async ({userId, planId}, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/get-tasks/${userId}/${planId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // console.error("API Error in fetchTasks:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ userId, taskName, planId, taskType }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/task/create-task/${userId}`, 
      { taskName, planId, taskType }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // console.error("API Error in createTask:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ userId, taskId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    await axios.delete(`${BACKEND_URL}/api/task/delete-task/${userId}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return taskId;
  } catch (error) {
    // console.error("API Error in deleteTask:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ userId, taskId, taskData }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/task/update-task/${userId}/${taskId}`, 
      { taskData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.task;
  } catch (error) {
    // console.error("API Error in updateTask:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
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
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.tasks);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;


