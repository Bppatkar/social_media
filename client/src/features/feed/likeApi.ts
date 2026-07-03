import { baseApi } from '@/services/api/baseApi';
import { ApiResponse, LikeResponse } from '@/types';

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<ApiResponse<LikeResponse>, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'POST',
      }),

      invalidatesTags: ['Post'],
    }),

    unlikePost: builder.mutation<ApiResponse<LikeResponse>, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;
