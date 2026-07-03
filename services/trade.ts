import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import {
  ExecuteQuoteResponse,
  QuoteResponse,
  SwapQuoteResponse,
} from './constants/types';

export const trade = createApi({
  reducerPath: 'trade',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}trade/`,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    createTrade: builder.mutation<
      SwapQuoteResponse,
      {
        type: string;
        fromAsset: string;
        toAsset: string;
        fromAmount: number;
      }
    >({
      query: create => ({
        url: `quotes`,
        method: 'POST',
        body: create,
      }),
    }),
    getQuoteDetails: builder.query<QuoteResponse, { quoteId: string }>({
      query: ({ quoteId }) => {
        return `quotes/${quoteId}`;
      },
    }),
    executeTrade: builder.mutation<
      ExecuteQuoteResponse,
      {
        quoteId: string;
        pin: string;
      }
    >({
      query: create => ({
        url: `execute`,
        method: 'POST',
        body: create,
      }),
    }),
  }),
});

export const {
  useCreateTradeMutation,
  useGetQuoteDetailsQuery,
  useExecuteTradeMutation,
} = trade;
