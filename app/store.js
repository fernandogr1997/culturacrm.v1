import { configureStore } from '@reduxjs/toolkit';
import credencialesSlice from './slices/credencialesSlice';

export const store = configureStore({
  reducer: {
    credenciales: credencialesSlice,
  },
})