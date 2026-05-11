import Post from '../models/post.model.js';
import ApiError from '../utils/ApiError.js';

//? Basic Structure of a service function
export const createPostService = async (
  content: string,
  image: string,
  ownerId: string
) => {
  if (!content) {
    throw new ApiError(400, 'Content is required');
  }
  const post = await Post.create({
    content,
    image,
    owner: ownerId,
  });
  return post;
};

export const getFeedPostsService = async () => {
  const posts = await Post.find()
    .populate('owner', 'username email profilePicture')
    .sort({ createdAt: -1 });
  return posts;
};

export const getSinglePostService = async (postId: string) => {
  const post = await Post.findById(postId).populate(
    'owner',
    'username email profilePicture'
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
