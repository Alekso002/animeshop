import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import anime from './slices/animeSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    anime,
  },
});
