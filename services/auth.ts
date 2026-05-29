import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type RegisterType = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type RegisterResponse = {
  data: RegisterResponseData;
};

export type RegisterResponseData = {
  user: User;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string;
  expiresInSeconds: number;
  refreshTokenExpiresAt: string;
};

export type User = {
  id: string;
  role: 'customer' | 'admin' | string;
  fullName: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected' | string;
  avatarUrl: string | null;
  watchlist: string[];
  settings: UserSettings;
  createdAt: string;
};

export type UserSettings = {
  language: string;
  fiatCurrency: string;
  theme: 'light' | 'dark' | 'system' | string;
  pushNotifications: boolean;
  biometricEnabled: boolean;
};

export type OtpData = {
  message: string;
  demoCode: string;
  expiresInSeconds: number;
};

export type VerifyOtpResponse = {
  data: OtpData;
};

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}auth/`,
  }),
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterType>({
      query: register => ({
        url: 'register',
        method: 'POST',
        body: register,
      }),
    }),
    login: builder.mutation<
      RegisterResponse,
      {
        loginType: 'email';
        identifier: string;
        password: string;
      }
    >({
      query: register => ({
        url: 'login',
        method: 'POST',
        body: register,
      }),
    }),
    refresh: builder.mutation<
      RegisterResponse,
      {
        refreshToken: string;
      }
    >({
      query: refresh => ({
        url: 'refresh',
        method: 'POST',
        body: refresh,
      }),
    }),

    requestOtp: builder.mutation<VerifyOtpResponse, { email: string }>({
      query: request => ({
        url: 'otp/request',
        method: 'POST',
        body: request,
      }),
    }),
    verifyOtp: builder.mutation<any, { email: string; code: string }>({
      query: verify => ({
        url: 'otp/verify',
        method: 'POST',
        body: verify,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useRefreshMutation,
} = auth;
