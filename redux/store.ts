import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { auth } from '../services/auth';
import { markets } from '../services/markets';
import { profile } from '../services/profile';

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [markets.reducerPath]: markets.reducer,
    [profile.reducerPath]: profile.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      auth.middleware,
      markets.middleware,
      profile.middleware,
    ),
});

setupListeners(store.dispatch);
