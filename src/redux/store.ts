// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productsSlice';
import registerReducer from './registerSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
