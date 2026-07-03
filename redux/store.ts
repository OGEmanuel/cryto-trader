import challengeIDReducer from '@/screens/auth/store/challenge-store';
import recoveryReducer from '@/screens/home/profile/security/store/recovery-store';
import countryControlReducer from '@/screens/kyc/store/country-selector';
import documentControlReducer from '@/screens/kyc/store/document-selector';
import kycDetailsControlReducer from '@/screens/kyc/store/kyc-details';
import pageControlReducer from '@/screens/kyc/store/page-control';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { auth } from '../services/auth';
import { markets } from '../services/markets';
import { profile } from '../services/profile';
import { wallet } from '../services/wallet';

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [markets.reducerPath]: markets.reducer,
    [profile.reducerPath]: profile.reducer,
    [wallet.reducerPath]: wallet.reducer,
    recovery: recoveryReducer,
    challengeId: challengeIDReducer,
    pageControl: pageControlReducer,
    countryControl: countryControlReducer,
    documentControl: documentControlReducer,
    kycDetailsControl: kycDetailsControlReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      auth.middleware,
      markets.middleware,
      profile.middleware,
      wallet.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
