import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';

import Notification from '../models/notification.model.js';
import ApiError from '../utils/ApiError.js';

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const notifications = await Notification.find({
    recipient: req.user!.userId,
  })
    .populate('sender', 'username profileImage')
    .populate('post', 'content image')
    .select('-__v')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    data: notifications,
  });
};

export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user!.userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

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

export const markAllNotificationsAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  await Notification.updateMany(
    {
      recipient: req.user!.userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'All notifications marked as read',
  });
};
