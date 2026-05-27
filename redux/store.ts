import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { markets } from '../services/markets';

export const store = configureStore({
  reducer: {
    [markets.reducerPath]: markets.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(markets.middleware),
});

setupListeners(store.dispatch);
