// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming you will combine your reducers in rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
