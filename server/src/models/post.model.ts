import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    image: { type: String, required: false },
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

postSchema.index({ owner: 1, createdAt: -1 });

const Post = mongoose.model('Post', postSchema);
export default Post;
