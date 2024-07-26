// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice'; // Import your slice

const rootReducer = combineReducers({
  auth : authSlice
});

export default rootReducer;
