import mongoose from 'mongoose';
import type { ICommentDocument } from '../types/comment.types.js';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
commentSchema.index({ post: 1 , createdAt: -1 });

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema);
export default Comment;
