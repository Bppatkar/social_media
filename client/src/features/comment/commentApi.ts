import { baseApi } from '@/services/api/baseApi';

import type { ApiResponse, Comment, CommentsResponse } from '@/types';

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===============================
    // Get Comments
    // ===============================

    getComments: builder.query<CommentsResponse, string>({
      query: (postId) => ({
        url: `/comments/${postId}`,
      }),

      transformResponse: (response: ApiResponse<CommentsResponse>) =>
        response.data,

      providesTags: (_result, _error, postId) => [
        { type: 'Comment', id: postId },
      ],
    }),

    // ===============================
    // Add Comment
    // ===============================

    createComment: builder.mutation<
      Comment,
      {
        postId: string;
        body: { content: string };
      }
    >({
      query: ({ postId, body }) => ({
        url: `/comments/${postId}`,
        method: 'POST',
        data: body,
      }),

      transformResponse: (response: ApiResponse<Comment>) => response.data,

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comment', id: arg.postId },
        'Posts',
      ],
    }),

    // ===============================
    // Update Comment
    // ===============================

    updateComment: builder.mutation<
      Comment,
      {
        commentId: string;
        body: { content: string };
        postId: string;
      }
    >({
      query: ({ commentId, body }) => ({
        url: `/comments/${commentId}`,
        method: 'PATCH',
        data: body,
      }),

      transformResponse: (response: ApiResponse<Comment>) => response.data,

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),

    // ===============================
    // Delete Comment
    // ===============================

    deleteComment: builder.mutation<
      void,
      {
        commentId: string;
        postId: string;
      }
    >({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),

      transformResponse: () => undefined,

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comment', id: arg.postId },
        'Posts',
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
