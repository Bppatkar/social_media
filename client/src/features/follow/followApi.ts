import { baseApi } from '@/services/api/baseApi';
import {
  ApiResponse,
  FollowersResponse,
  FollowingResponse,
  FollowResponse,
  UnfollowResponse,
} from '@/types';

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<FollowResponse, string>({
      query: (userId) => ({
        url: `/follows/${userId}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<FollowResponse>) =>
        response.data,

      invalidatesTags: (_result, _error, userId) => [
        { type: 'Profile', id: userId },
        'Profile',
        'Follow',
        'Posts',
      ],
    }),

    unfollowUser: builder.mutation<UnfollowResponse, string>({
      query: (userId) => ({
        url: `/follows/${userId}`,
        method: 'DELETE',
      }),

      transformResponse: (response: ApiResponse<UnfollowResponse>) =>
        response.data,

      invalidatesTags: (_result, _error, userId) => [
        { type: 'Profile', id: userId },
        'Profile',
        'Follow',
        'Posts',
      ],
    }),

    getFollowers: builder.query<FollowersResponse, string>({
      query: (userId) => ({
        url: `/follows/followers/${userId}`,
      }),

      transformResponse: (response: ApiResponse<FollowersResponse>) =>
        response.data,

      providesTags: (_result, _error, id) => [
        { type: 'Follow', id: `followers-${id}` },
      ],
    }),

    getFollowing: builder.query<FollowingResponse, string>({
      query: (userId) => ({
        url: `/follows/following/${userId}`,
      }),

      transformResponse: (response: ApiResponse<FollowingResponse>) =>
        response.data,

      providesTags: (_result, _error, id) => [
        { type: 'Follow', id: `following-${id}` },
      ],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = followApi;
