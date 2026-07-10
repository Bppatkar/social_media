import type {
  PopulatedNotificationSender,
  NotificationSenderPayload,
} from '../types/notification.types.js';

export const buildNotificationSender = (
  sender: PopulatedNotificationSender
): NotificationSenderPayload => ({
  _id: sender._id.toString(),
  username: sender.username,
  ...(sender.profileImage && {
    profileImage: sender.profileImage,
  }),
});
