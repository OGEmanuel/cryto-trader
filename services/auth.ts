import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import {
  RegisterResponse,
  RegisterType,
  TwoFactorChallengeResponse,
  TwoFactorRecoveryResponse,
  TwoFactorSetupResponse,
  VerifyOtpResponse,
} from './constants/types';

type LoginResponse = RegisterResponse | TwoFactorChallengeResponse;

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}auth/`,
    prepareHeaders: async headers => {
      const token = await SecureStore.getItemAsync('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
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
      LoginResponse,
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
    setup2fa: builder.mutation<TwoFactorSetupResponse, any>({
      query: () => ({
        url: '2fa/setup',
        method: 'POST',
      }),
    }),
    enable2fa: builder.mutation<TwoFactorRecoveryResponse, { code: string }>({
      query: enable => ({
        url: '2fa/enable',
        method: 'POST',
        body: enable,
        invalidatesTags: ['Profile'],
      }),
    }),
    verify2fa: builder.mutation<
      RegisterResponse,
      {
        challengeId: string;
        code: string;
        recoveryCode: string;
      }
    >({
      query: verify => ({
        url: '2fa/verify',
        method: 'POST',
        body: verify,
      }),
    }),
    disable2fa: builder.mutation<
      TwoFactorRecoveryResponse,
      {
        password: string;
        code: string;
        recoveryCode: string;
      }
    >({
      query: disable => ({
        url: '2fa/disable',
        method: 'POST',
        body: disable,
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
  useSetup2faMutation,
  useEnable2faMutation,
  useVerify2faMutation,
  useDisable2faMutation,
} = auth;
