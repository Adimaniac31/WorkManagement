import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => localStorage.getItem('access_token');
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch tasks for a specific user and plan
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ({ userId, planId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/get-tasks/${userId}/${planId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchDailyTasks = createAsyncThunk('tasks/fetchDailyTasks', async ({ userId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/get-daily-tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure it returns an array
  } catch (error) {
    if (error.response.status === 404) {
      return []; // Return an empty array on 404
    }
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Fetch weekly tasks for a specific user
export const fetchWeeklyTasks = createAsyncThunk('tasks/fetchWeeklyTasks', async ({ userId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/get-week-tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure it returns an array
  } catch (error) {
    if (error.response.status === 404) {
      return []; // Return an empty array on 404
    }
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});


// Create a new task
export const createTask = createAsyncThunk('tasks/createTask', async ({ userId, taskName, planId, taskType }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/task/create-task/${userId}`, { taskName, planId, taskType }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ userId, taskId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    await axios.delete(`${BACKEND_URL}/api/task/delete-task/${userId}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ userId, taskId, taskName, completionStatus, taskType }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/task/update-task/${userId}/${taskId}`, 
      { taskName, completionStatus, taskType }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Fetch today's tasks for a specific user
export const fetchTodaysTasks = createAsyncThunk('tasks/fetchTodaysTasks', async ({ userId }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BACKEND_URL}/api/task/get-todays-tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.tasks; // Ensure that the backend returns today's tasks in an array
  } catch (error) {
    if (error.response.status === 404) {
      return []; // Return an empty array on 404
    }
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});
// Update today's task
export const updateTodaysTask = createAsyncThunk('tasks/updateTodaysTask', async ({ userId, taskId, completionStatus }, { rejectWithValue }) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/task/update-todays-tasks/${userId}/${taskId}`, 
      { completionStatus }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Adjust based on your backend response
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Create the task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    dailyTasks: [],
    weeklyTasks: [],
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
      .addCase(fetchDailyTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dailyTasks = action.payload.tasks;
      })
      .addCase(fetchDailyTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchWeeklyTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklyTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weeklyTasks = action.payload.tasks;
      })
      .addCase(fetchWeeklyTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task);
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
      })
      .addCase(fetchTodaysTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodaysTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTodaysTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTodaysTask.fulfilled, (state, action) => {
        // Update logic for today's tasks
        state.tasks = action.payload;
      })
      .addCase(updateTodaysTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;




