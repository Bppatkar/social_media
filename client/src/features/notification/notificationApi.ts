import { baseApi } from '@/services/api/baseApi';

import type {
  NotificationResponse,
  UnreadCountResponse,
  MarkNotificationReadResponse,
} from '@/types';

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, void>({
      query: () => ({
        url: '/notifications',
      }),

      providesTags: ['Notification'],
    }),

    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => ({
        url: '/notifications/unread-count',
      }),

      providesTags: ['Notification'],
    }),

    markNotificationAsRead: builder.mutation<
      MarkNotificationReadResponse,
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),

      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationAsReadMutation,
} = notificationApi;
