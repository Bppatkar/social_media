import { baseApi } from '@/services/api/baseApi';

type DashboardStats = {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
};

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({
        url: '/admin/dashboard',
      }),

      transformResponse: (response: {
        success: boolean;
        data: DashboardStats;
      }) => response.data,

      providesTags: ['Admin'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminApi;
