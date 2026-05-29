import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { auth } from '../services/auth';
import { markets } from '../services/markets';

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [markets.reducerPath]: markets.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(auth.middleware, markets.middleware),
});

setupListeners(store.dispatch);
