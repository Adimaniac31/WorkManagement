// src/features/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/msg/chat`, { userMessage: message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to send message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    messages: [],
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push({ role: 'user', content: action.payload.userMessage });
        state.messages.push({ role: 'assistant', content: action.payload.aiMessage });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError } = chatSlice.actions;
export default chatSlice.reducer;

