import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getAdminDashboardStatsService = async () => {
  const [totalUsers, totalPosts, totalComments, totalLikes] = await Promise.all(
    [
      User.countDocuments(),
      Post.countDocuments(),
      Comment.countDocuments(),
      Like.countDocuments(),
    ]
  );
  return { totalUsers, totalPosts, totalComments, totalLikes };
};
