import { baseApi } from '@/services/api/baseApi';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';
import type { AuthResponse } from '../types/authResponse.types';
import type { MeResponse } from '../types/meResponse.types';
import { ApiResponse } from '@/types/api.types';

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

    me: builder.query<ApiResponse<MeResponse>, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth', 'User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
