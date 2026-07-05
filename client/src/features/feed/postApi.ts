import { baseApi } from '@/services/api/baseApi';
import type { ApiResponse, FeedResponse, Post } from '@/types';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query<ApiResponse<FeedResponse>, void>({
      query: () => ({
        url: '/posts/feed',
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),

    createPost: builder.mutation<ApiResponse<Post>, FormData>({
      query: (body) => ({
        url: '/posts/create',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<
      ApiResponse<Post>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['Posts'],
    }),

    deletePost: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),

    getUserPosts: builder.query<ApiResponse<FeedResponse>, string>({
      query: (userId) => ({
        url: `/posts/user/${userId}`,
      }),
      providesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetFeedPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetUserPostsQuery,
} = postApi;
