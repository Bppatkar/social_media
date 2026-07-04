import { baseApi } from '@/services/api/baseApi';
import { ApiResponse, SearchResponse, SuggestedUser } from '@/types';

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<SearchResponse, string>({
      query: (q) => ({
        url: '/search',
        params: { q },
      }),
      transformResponse: (response: ApiResponse<SearchResponse>) =>
        response.data,
      providesTags: ['Search'],
    }),
    getSuggestedUsers: builder.query<SuggestedUser[], void>({
      query: () => ({
        url: '/search/suggestions',
      }),

      transformResponse: (response: ApiResponse<SuggestedUser[]>) =>
        response.data,

      providesTags: ['Search'],
    }),
  }),
});

export const { useSearchUsersQuery, useGetSuggestedUsersQuery } = searchApi;
