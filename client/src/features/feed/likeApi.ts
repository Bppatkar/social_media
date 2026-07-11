import { baseApi } from '@/services/api/baseApi';
import { ApiResponse, LikeResponse } from '@/types';

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<ApiResponse<LikeResponse>, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'POST',
      }),

      invalidatesTags: ['Posts'],
    }),

    unlikePost: builder.mutation<ApiResponse<LikeResponse>, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;
