import { baseApi } from '@/services/api/baseApi';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';
import { ApiResponse, AuthResponse } from '../types/authResponse.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
