import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';

import ApiError from '../utils/ApiError.js';

import buildSearchQuery from '../utils/search.js';
import buildSortQuery from '../utils/sort.js';

export const addCommentService = async (
  postId: string,
  userId: string,
  content: string
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const comment = await Comment.create({
    post: postId,
    commentedBy: userId,
    content: content.trim(),
  });

  post.commentCount += 1;
  await post.save();

  const createdComment = await Comment.findById(comment._id).populate(
    'commentedBy',
    'username profileImage'
  );

  return createdComment;
};

export const getPostCommentsService = async (
  postId: string,
  page: number,
  limit: number,
  skip: number,
  search: string,
  sort: string
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const searchFilter = search
    ? { post: postId, ...buildSearchQuery('content', search) }
    : { post: postId };

  const sortOption = buildSortQuery(sort);

  const comments = await Comment.find(searchFilter)
    .populate('commentedBy', 'username  profileImage')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalComments = await Comment.countDocuments(searchFilter);

  return {
    currentPage: page,
    totalPages: totalComments === 0 ? 1 : Math.ceil(totalComments / limit),
    totalComments,
    comments,
  };
};

export const deleteCommentService = async (
  commentId: string,
  userId: string
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }
  // ownership check
  if (comment.commentedBy.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to delete this comment');
  }

  const post = await Post.findById(comment.post);

  if (post && post.commentCount > 0) {
    post.commentCount -= 1;
    await post.save();
  }

  await comment.deleteOne();

  return { message: 'Comment deleted successfully' };
};

export const updateCommentService = async (
  commentId: string,
  userId: string,
  content: string
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }

  // ownership check
  if (comment.commentedBy.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to update this comment');
  }

  comment.content = content.trim();
  await comment.save();

  const updatedComment = await Comment.findById(commentId).populate(
    'commentedBy',
    'username profileImage'
  );
  return updatedComment;
};
