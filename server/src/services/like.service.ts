import Post from '../models/post.model.js';
import Like from '../models/like.model.js';

import ApiError from '../utils/ApiError.js';
import { createNotificationService } from './notification.service.js';
import { emitNotification } from '../socket/emitNotification.js';
import { buildNotificationSender } from '../utils/buildNotificationSender.js';
import type { PopulatedNotificationSender } from '../types/notification.types.js';

export const likePostService = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const existingLike = await Like.findOne({ post: postId, likedBy: userId });
  if (existingLike) {
    throw new ApiError(400, 'You have already liked this post');
  }

  // await Like.create({ post: postId, likedBy: userId });

  // await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
  // const updatedPost = await Post.findById(postId);

  await Like.create({ post: postId, likedBy: userId });
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: 1 } },
    { new: true }
  );

  if (post.owner.toString() !== userId) {
    const notification = await createNotificationService(
      post.owner.toString(),
      userId,
      'like',
      postId
    );

    const populatedNotification = await notification.populate<{
      sender: PopulatedNotificationSender;
    }>('sender', 'username profileImage');

    emitNotification({
      recipientId: post.owner.toString(),
      notification: {
        id: populatedNotification._id.toString(),
        type: populatedNotification.type,
        sender: buildNotificationSender(populatedNotification.sender),
        createdAt: populatedNotification.createdAt,
      },
    });
  }

  return {
    likeCount: updatedPost?.likeCount || 0,
  };
};

export const unlikePostService = async (postId: string, userId: string) => {
  const like = await Like.findOne({ post: postId, likedBy: userId });
  if (!like) {
    throw new ApiError(400, 'You have not liked this post');
  }
  await Like.deleteOne({ post: postId, likedBy: userId });
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: -1 } },
    { new: true }
  );
  return {
    likeCount: updatedPost?.likeCount || 0,
  };
};
