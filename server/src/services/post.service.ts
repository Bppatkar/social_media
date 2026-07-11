import Post from '../models/post.model.js';
import ApiError from '../utils/ApiError.js';
import { deleteSingleImageService } from './media.service.js';
import buildSearchQuery from '../utils/search.js';
import buildSortQuery from '../utils/sort.js';
import { invalidateFeedCacheService } from './feed.service.js';
import User from '../models/user.model.js';
import Like from '../models/like.model.js';
import { attachLikeStatus } from './post.util.js';
import { emitFeedUpdate } from '../socket/emitNotification.js';

export const createPostService = async (
  content: string,
  image: string,
  imagePublicId: string,
  ownerId: string
) => {
  const post = await Post.create({
    content,
    image,
    imagePublicId,
    owner: ownerId,
  });
  await invalidateFeedCacheService();
  emitFeedUpdate({
    entity: 'post',
    action: 'created',
    postId: post._id.toString(),
  });
  return post;
};

export const getFeedPostsService = async (
  userId: string,
  page: number,
  limit: number,
  search: string,
  sort: string,
  skip: number
) => {
  // search filter
  const searchFilter = buildSearchQuery('content', search);

  // sorting
  const sortOption = buildSortQuery(sort);

  // we use promise.all to Fetch posts and total count in parallel
  const [posts, totalPosts] = await Promise.all([
    Post.find(searchFilter)
      .populate('owner', 'username email profileImage')
      .sort(sortOption)
      .skip(skip)
      .limit(limit),
    Post.countDocuments(searchFilter),
  ]);

  const postWithLikedStatus = await attachLikeStatus(posts, userId);

  return {
    currentPage: page,
    totalPages: totalPosts === 0 ? 1 : Math.ceil(totalPosts / limit),
    // Math.ciel = (12/5) = 2.4 => 3
    totalPosts,
    posts: postWithLikedStatus,
  };
};

export const getSinglePostService = async (postId: string, userId: string) => {
  const [post, liked] = await Promise.all([
    Post.findById(postId).populate('owner', 'username email profileImage'),
    Like.exists({
      post: postId,
      likedBy: userId,
    }),
  ]);

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  return {
    ...post.toObject(),
    likedByCurrentUser: Boolean(liked),
  };
};

export const updatePostService = async (
  postId: string,
  userId: string,
  content?: string,
  image?: string,
  imagePublicId?: string
) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  // checking ownership
  if (post.owner.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to update this post');
  }

  if (content) post.content = content;

  if (image && imagePublicId) {
    // delete old cloudinary image
    if (post.imagePublicId) {
      await deleteSingleImageService(post.imagePublicId);
    }

    // save new image
    post.image = image;
    post.imagePublicId = imagePublicId;
  }

  await post.save();
  await invalidateFeedCacheService();
  emitFeedUpdate({ entity: 'post', action: 'updated', postId: postId });
  return post;
};

export const deletePostService = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  // checking ownership
  if (post.owner.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to delete this post');
  }

  // delete image from cloudinary if exists
  if (post.imagePublicId) {
    await deleteSingleImageService(post.imagePublicId);
  }

  await post.deleteOne();
  await invalidateFeedCacheService();
  emitFeedUpdate({ entity: 'post', action: 'deleted', postId: postId });
  return post;
};

export const getUserPostsService = async (
  userId: string,
  requestingUserId: string,
  page: number,
  limit: number,
  skip: number
) => {
  // const user = await User.findById(userId);

  // if (!user) {
  //   throw new ApiError(404, 'User not found');
  // }

  // const posts = await Post.find({ owner: userId })
  //   .populate('owner', 'username profileImage')
  //   .sort({ createdAt: -1 })
  //   .skip(skip)
  //   .limit(limit);

  // const totalPosts = await Post.countDocuments({ owner: userId });

  const [user, posts, totalPosts] = await Promise.all([
    User.findById(userId),
    Post.find({ owner: userId })
      .populate('owner', 'username profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments({ owner: userId }),
  ]);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const postWithLikedStatus = await attachLikeStatus(posts, requestingUserId);

  return {
    currentPage: page,
    totalPages: totalPosts === 0 ? 1 : Math.ceil(totalPosts / limit),
    totalPosts,
    posts: postWithLikedStatus,
  };
};
