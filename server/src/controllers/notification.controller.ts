import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';

import Notification from '../models/notification.model.js';

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const notificaiton = await Notification.find({
    recipient: req.user!.userId,
  })
    .populate('sender', 'username profileImage')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    data: notificaiton,
  });
};

export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: notification,
  });
};

export const getUnreadCount = async (req: AuthRequest, res: Response) => {
  const count = await Notification.countDocuments({
    recipient: req.user!.userId,
    isRead: false,
  });

  res.status(200).json({
    status: 'success',
    count,
  });
};
