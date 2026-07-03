import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { WalletOverviewResponse } from './constants/types';

export const wallet = createApi({
  reducerPath: 'wallet',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}wallet/`,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getWallet: builder.query<WalletOverviewResponse, any>({
      query: () => '',
    }),
  }),
});

export const { useGetWalletQuery } = wallet;
