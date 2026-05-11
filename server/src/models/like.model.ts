import mongoose from 'mongoose';
import type { ILikeDocument } from '../types/like.types.js';

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
likeSchema.index({ post: 1, likedBy: 1 }, { unique: true });

const Like = mongoose.model<ILikeDocument>('Like', likeSchema);
export default Like;
