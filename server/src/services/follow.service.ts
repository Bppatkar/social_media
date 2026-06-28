import Follow from '../models/follow.model.js';
import User from '../models/user.model.js';

import ApiError from '../utils/ApiError.js';

import buildSortQuery from '../utils/sort.js';

import { getIo } from '../socket/socket.js';
import { createNotificationService } from './notification.service.js';

export const followUserService = async (
  followerId: string,
  followingId: string
) => {
  // if followerId and followingId are same, throw error
  if (followerId === followingId) {
    throw new ApiError(400, 'You cannot follow yourself');
  }

  const user = await User.findById(followingId);
  if (!user) {
    throw new ApiError(404, 'User to follow not found');
  }

  const existingFollow = await Follow.findOne({
    follower: followerId,
    following: followingId,
  });
  if (existingFollow) {
    throw new ApiError(400, 'You are already following this user');
  }

  const follow = await Follow.create({
    follower: followerId,
    following: followingId,
  });

  const notification = await createNotificationService(
    followingId,
    followerId,
    'follow'
  );

  try {
    const io = getIo();

    io.to(followingId).emit('notification', {
      id: notification._id.toString(),
      type: notification.type,
      sender: followerId,
      createdAt: notification.createdAt,
    });
  } catch {
    // Ignore during tests or when socket server isn't running.
    new ApiError(500, 'Ignored error: Failed to emit notification event');
  }

  const populatedFollow = await Follow.findById(follow._id).populate(
    'following',
    'username profileImage'
  );

  return { follow: populatedFollow, isFollowing: true };
};

export const unfollowUserService = async (
  followerId: string,
  followingId: string
) => {
  const follow = await Follow.findOne({
    follower: followerId,
    following: followingId,
  });
  if (!follow) {
    throw new ApiError(404, 'Follow not found');
  }
  await follow.deleteOne();
  return { isFollowing: false };
};

export const getFollowersService = async (
  userId: string,
  page: number,
  limit: number,
  skip: number,
  sort: string
) => {
  const sortOption = buildSortQuery(sort);

  // const followers = await Follow.find({ following: userId })
  //   .populate('follower', 'username  profileImage')
  //   .sort(sortOption)
  //   .skip(skip)
  //   .limit(limit);

  // const totalFollowers = await Follow.countDocuments({ following: userId });

  const [followers, totalFollowers] = await Promise.all([
    Follow.find({ following: userId })
      .populate('follower', 'username profileImage')
      .sort(sortOption)
      .skip(skip)
      .limit(limit),

    Follow.countDocuments({
      following: userId,
    }),
  ]);
  return {
    currentPage: page,
    totalPages: totalFollowers === 0 ? 1 : Math.ceil(totalFollowers / limit),
    totalFollowers,
    followers,
  };
};

export const getFollowingService = async (
  userId: string,
  page: number,
  limit: number,
  skip: number,
  sort: string
) => {
  const sortOption = buildSortQuery(sort);

  const [following, totalFollowing] = await Promise.all([
    Follow.find({ follower: userId })
      .populate('following', 'username profileImage')
      .sort(sortOption)
      .skip(skip)
      .limit(limit),
    Follow.countDocuments({ follower: userId }),
  ]);

  return {
    currentPage: page,
    totalPages: totalFollowing === 0 ? 1 : Math.ceil(totalFollowing / limit),
    totalFollowing,
    following,
  };
};
