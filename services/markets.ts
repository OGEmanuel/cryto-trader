import {
  AssetDetailsResponse,
  AssetsResponse,
  TrendingAssetsResponse,
} from '@/screens/home/constants/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CandlestickResponse, GetAssetsParams } from './constants/types';

export const markets = createApi({
  reducerPath: 'markets',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}market/`,
  }),
  endpoints: builder => ({
    getAssets: builder.query<AssetsResponse, GetAssetsParams>({
      query: ({ q, search, page = 1, limit = 10, sort, order }) => {
        const params = new URLSearchParams();

        if (q) params.append('q', q);
        if (search) params.append('search', search);
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        if (sort) params.append('sort', sort);
        if (order) params.append('order', order);

        return `assets?${params.toString()}`;
      },
    }),
    getAssetsSymbol: builder.query<AssetDetailsResponse, { symbol: string }>({
      query: symbol => `assets/${symbol.symbol}`,
    }),
    getTrending: builder.query<TrendingAssetsResponse, any>({
      query: () => 'trending',
    }),
    getPrices: builder.query({ query: () => 'prices' }),
    getCandles: builder.query<
      CandlestickResponse,
      { symbol: string; interval?: string; limit?: string }
    >({
      query: ({ symbol, interval = '1m', limit = '50' }) => {
        const params = new URLSearchParams();

        if (interval) params.append('interval', interval);
        if (limit) params.append('limit', String(limit));

        return `assets/${symbol}/candles?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetsSymbolQuery,
  useGetTrendingQuery,
  useGetPricesQuery,
  useGetCandlesQuery,
} = markets;
