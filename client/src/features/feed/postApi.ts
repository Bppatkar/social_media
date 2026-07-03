import { baseApi } from '@/services/api/baseApi';
import type { ApiResponse, FeedResponse, Post } from '@/types';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query<ApiResponse<FeedResponse>, void>({
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

    updatePost: builder.mutation<
      ApiResponse<Post>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

    getSinglePost: builder.query<ApiResponse<Post>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),

    getUserPosts: builder.query<ApiResponse<FeedResponse>, string>({
      query: (userId) => ({
        url: `/posts/user/${userId}`,
      }),
      providesTags: ['Post'],
    }),
  }),
});

export const {
  useGetFeedPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetSinglePostQuery,
  useGetUserPostsQuery,
} = postApi;
