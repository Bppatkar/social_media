import mongoose from 'mongoose';
import type { IPostDocument } from '../types/post.types.js';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    image: { type: String, required: false },
    imagePublicId: { type: String, default: '' },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.index({ owner: 1, createdAt: -1 }); // for user profile feed sorting
postSchema.index({ createdAt: -1 }); // for global feed sorting

const Post = mongoose.model<IPostDocument>('Post', postSchema);
export default Post;
