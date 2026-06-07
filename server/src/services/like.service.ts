import Post from '../models/post.model.js';
import Like from '../models/like.model.js';

import ApiError from '../utils/ApiError.js';

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
  const updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }, { new: true });

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
  const updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
  return {
    likeCount: updatedPost?.likeCount || 0,
  };
};
