import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import planSlice from '../features/planSlice';
import taskSlice from '../features/taskSlice';
import chatSlice from '../features/chatSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  plans: planSlice,
  tasks: taskSlice,
  chats: chatSlice
});

export default rootReducer;