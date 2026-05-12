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
  if (!content) {
    throw new ApiError(400, 'Content is required');
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const comment = await Comment.create({
    post: postId,
    commentedBy: userId,
    content,
  });

  post.commentCount += 1;
  await post.save();

  return comment;
};

export const getPostCommentsService = async (
  postId: string,
  page: number,
  limit: number,
  skip: number,
  search: string,
  sort: string
) => {
  const searchFilter = search
    ? { post: postId, ...buildSearchQuery('content', search) }
    : { post: postId };

  const sortOption = buildSortQuery(sort);

  const comments = await Comment.find(searchFilter)
    .populate('commentedBy', 'username email profileImage')
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
