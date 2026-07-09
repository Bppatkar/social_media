import { baseApi } from '@/services/api/baseApi';
import type { ApiResponse, Post, User } from '@/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, string>({
      query: (userId) => ({
        url: `/auth/${userId}`,
      }),

      transformResponse: (response: ApiResponse<User>) => response.data,

      providesTags: (_result, _error, id) => [{ type: 'Profile', id }],
    }),

    updateProfile: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: '/auth/update-profile',
        method: 'PATCH',
        data: formData,
      }),

      transformResponse: (response: ApiResponse<User>) => response.data,

      invalidatesTags: ['Profile', 'Posts', 'Search'],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } = profileApi;
