import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import planSlice from '../features/planSlice';
import taskSlice from '../features/taskSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  plans: planSlice,
  tasks: taskSlice,
});

export default rootReducer;