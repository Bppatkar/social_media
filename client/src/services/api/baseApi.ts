import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';

import type { AxiosError, AxiosRequestConfig } from 'axios';

import axiosInstance from '@/services/axios/axiosInstance';

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: unknown;
  params?: unknown;
};

const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    { status?: number; data: unknown }
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });

      return {
        data: result.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data ?? axiosError.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: axiosBaseQuery(),

  tagTypes: [
    'Auth',
    'User',
    'Post',
    'Posts',
    'Comment',
    'Follow',
    'Notification',
    'Profile',
  ],

  endpoints: () => ({}),
});
