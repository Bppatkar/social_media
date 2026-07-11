import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationPayload } from '@/types';

interface NotificationState {
  notifications: NotificationPayload[];
  unreadCount: number;
  connected: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  connected: false,
};

const notificationSlice = createSlice({
  name: 'notification',

  initialState,

  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },

    addNotification(state, action: PayloadAction<NotificationPayload>) {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },

    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },

    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setConnected,
  addNotification,
  setUnreadCount,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
