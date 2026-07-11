'use client';

import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNotification, setConnected } from './notificationSlice';
import type { NotificationPayload } from '@/types';
import { notificationApi } from './notificationApi';

export default function NotificationListener() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket();

    const handleConnect = () => {
      console.log('Socket connected', socket.id);
      dispatch(setConnected(true));

      if (user?._id) {
        socket.emit('join', user._id);
      }
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
      dispatch(setConnected(false));
    };

    const handleNotification = (notification: NotificationPayload) => {
      console.log('Received notification:', notification);
      dispatch(addNotification(notification));
      dispatch(notificationApi.util.invalidateTags(['Notification']));
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('notification', handleNotification);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('notification', handleNotification);
    };
  }, [dispatch, isAuthenticated, user?._id]);

  return null;
}
