import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { auth } from '../services/auth';
import { markets } from '../services/markets';
import { profile } from '../services/profile';
import recoveryReducer from '@/screens/home/profile/security/store/recovery-store';
import challengeIDReducer from '@/screens/auth/store/challenge-store';

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [markets.reducerPath]: markets.reducer,
    [profile.reducerPath]: profile.reducer,
    recovery: recoveryReducer,
    challengeId: challengeIDReducer 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      auth.middleware,
      markets.middleware,
      profile.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
