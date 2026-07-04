import User from '../models/user.model.js';
import Follow from '../models/follow.model.js';
import buildSearchQuery from '../utils/search.js';

export const searchUsersService = async (
  currentUserId: string,
  search: string,
  page: number,
  limit: number,
  skip: number
) => {
  const filter = {
    _id: { $ne: currentUserId },
    ...buildSearchQuery('username', search),
  };

  const [users, totalUsers] = await Promise.all([
    User.find(filter)
      .select('username profileImage bio role')
      .skip(skip)
      .limit(limit),

    User.countDocuments(filter),
  ]);

  const following = await Follow.find({
    follower: currentUserId,
    following: {
      $in: users.map((u) => u._id),
    },
  });

  const followingIds = new Set(following.map((f) => f.following.toString()));

  return {
    currentPage: page,

    totalPages: totalUsers === 0 ? 1 : Math.ceil(totalUsers / limit),

    totalUsers,

    users: users.map((user) => ({
      ...user.toObject(),

      isFollowing: followingIds.has(user._id.toString()),
    })),
  };
};

export const suggestUsersService = async (currentUserId: string, limit = 5) => {
  // user already followed

  const following = await Follow.find({ follower: currentUserId }).select(
    'following'
  );

  const excludingIds = [currentUserId, ...following.map((f) => f.following)];

  const users = await User.aggregate([
    {
      $match: {
        _id: { $nin: excludingIds },
      },
    },
    {
      $sample: { size: limit },
    },
    { $project: { username: 1, profileImage: 1, bio: 1, role: 1 } },
  ]);

  return users.map((user) => ({ ...user, isFollowing: false }));
};
