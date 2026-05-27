import { AssetsResponse } from '@/screens/home/constants/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetAssetsParams = {
  q?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'symbol' | 'priceUsd' | 'change24h' | 'minBuyUsd';
  order?: 'asc' | 'desc';
};

export const markets = createApi({
  reducerPath: 'markets',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  endpoints: builder => ({
    // getCrypto: builder.query({ query: id => `posts/${id}` }),
    // getSymbol: builder.query({ query: symbol => `market/assets/${symbol}` }),
    getAssets: builder.query<AssetsResponse, GetAssetsParams>({
      query: ({ q, search, page = 1, limit = 10, sort, order }) => {
        const params = new URLSearchParams();

        if (q) params.append('q', q);
        if (search) params.append('search', search);
        if (page) params.append('page', String(page));
        if (limit) params.append('limit', String(limit));
        if (sort) params.append('sort', sort);
        if (order) params.append('order', order);

        return `market/assets?${params.toString()}`;
      },
    }),
    getAssetsSymbol: builder.query({
      query: symbol => `market/assets/${symbol}`,
    }),
    getTrending: builder.query({ query: () => 'market/trending' }),
    getPrices: builder.query({ query: () => 'market/prices' }),
    // createPost: builder.mutation({
    //   query: newPost => ({
    //     url: 'posts',
    //     methods: 'POST',
    //     body: newPost,
    //   }),
    // }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetsSymbolQuery,
  useGetTrendingQuery,
  useGetPricesQuery,
} = markets;
