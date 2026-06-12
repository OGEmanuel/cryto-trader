import {
  UserProfileResponse,
  WatchlistResponse,
} from '@/screens/home/constants/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsMeta {
  count: number;
  unread: number;
}

export interface NotificationsResponse {
  data: Notification[];
  meta: NotificationsMeta;
}

export const profile = createApi({
  reducerPath: 'profile',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}me/`,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Notifications'],
  endpoints: builder => ({
    getNotifications: builder.query<NotificationsResponse, any>({
      query: () => 'notifications',
      providesTags: ['Notifications'],
    }),
    markAsRead: builder.mutation<any, { notificationId: string }>({
      query: mark => ({
        url: `notifications/${mark.notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
    readAll: builder.mutation({
      query: () => ({
        url: `notifications/read-all`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
    getWatchlist: builder.query<WatchlistResponse, any>({
      query: () => 'watchlist',
    }),
    getCurrentProfile: builder.query<UserProfileResponse, any>({
      query: () => '',
    }),
    updatePin: builder.mutation<
      any,
      {
        currentPin: string;
        newPin: string;
      }
    >({
      query: pin => ({
        url: `pin`,
        method: 'PATCH',
        body: pin,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useReadAllMutation,
  useGetWatchlistQuery,
  useGetCurrentProfileQuery,
  useUpdatePinMutation,
} = profile;
