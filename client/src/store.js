import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Path updated

const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  devTools: import.meta.env.MODE !== 'production',
});

export default store;