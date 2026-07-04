import { baseApi } from '@/services/api/baseApi';
import { ApiResponse } from '@/types';

export interface SearchUser {
  _id: string;
  username: string;
  bio?: string;
  profileImage?: string;
  role: 'user' | 'admin';
  isFollowing: boolean;
}

interface SearchResponse {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  users: SearchUser[];
}


export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<SearchResponse, string>({
      query: (q) => ({
        url: '/search',
        params: { q },
      }),

      transformResponse: (response: ApiResponse<SearchResponse>) => response.data,
    }),
  }),
});

export const { useSearchUsersQuery } = searchApi;
