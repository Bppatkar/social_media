import { baseApi } from '@/services/api/baseApi';
import type { ApiResponse } from '@/types/api.types';
import type { Post } from '@/types/post.types';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query<ApiResponse<Post[]>, void>({
      query: () => ({
        url: '/posts/feed',
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),

    createPost: builder.mutation<ApiResponse<Post>, FormData>({
      query: (body) => ({
        url: '/posts/create',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetFeedPostsQuery, useCreatePostMutation } = postApi;
