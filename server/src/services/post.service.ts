import Post from '../models/post.model.js';
import ApiError from '../utils/ApiError.js';
import buildSearchQuery from '../utils/search.js';
import buildSortQuery from '../utils/sort.js';
import { invalidateFeedCacheService } from './feed.service.js';

//? Basic Structure of a service function
export const createPostService = async (
  content: string,
  image: string,
  ownerId: string
) => {
  
  const post = await Post.create({
    content,
    image,
    owner: ownerId,
  });
  await invalidateFeedCacheService();
  return post;
};

export const getFeedPostsService = async (
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

  // query
  const posts = await Post.find(searchFilter)
    .populate('owner', 'username email profileImage')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  // total count for pagination
  const totalPosts = await Post.countDocuments(searchFilter); // countDocument is mongoose method to count the document

  return {
    currentPage: page,
    totalPages: totalPosts === 0 ? 1 : Math.ceil(totalPosts / limit),
    // Math.ciel = (12/5) = 2.4 => 3
    totalPosts,
    posts,
  };
};

export const getSinglePostService = async (postId: string) => {
  const post = await Post.findById(postId).populate(
    'owner',
    'username email profileImage'
  );

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }
  return post;
};

export const updatePostService = async (
  postId: string,
  userId: string,
  content?: string,
  image?: string
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
  if (image) post.image = image;
  await post.save();
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

  await post.deleteOne();
  return post;
};
