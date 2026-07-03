import Like from '../models/like.model.js';

export const attachLikeStatus = async (posts: any[], userId: string) => {
  const postIds = posts.map((post) => post._id);

  const likedPosts = await Like.find({
    likedBy: userId,
    post: { $in: postIds },
  }).select('post');

  const likedPostIds = new Set(likedPosts.map((like) => like.post.toString()));

  return posts.map((post) => ({
    ...post.toObject(),
    likedByCurrentUser: likedPostIds.has(post._id.toString()),
  }));
};
