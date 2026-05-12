import Follow from '../models/follow.model.js';
import User from '../models/user.model.js';

import ApiError from '../utils/ApiError.js';

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

  await Follow.create({ follower: followerId, following: followingId });

  return { message: 'User followed successfully' };
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
  return { message: 'User unfollowed successfully' };
};

export const getFollowersService = async (userId: string) => {
  const followers = await Follow.find({ following: userId }).populate(
    'follower',
    'username email profileImage'
  );
  return followers;
};

export const getFollowingService = async (userId: string) => {
  const following = await Follow.find({ follower: userId }).populate(
    'following',
    'username email profileImage'
  );
  return following;
};
