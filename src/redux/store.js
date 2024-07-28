import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export default store;