import mongoose from 'mongoose';
import type { IFollowDocument } from '../types/follow.types.js';

const followSchema = new mongoose.Schema(
  {
    // follower ka matlab jo user follow kar raha hai [jo hamko follow kar raha hai]
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // following ka matlab jo user follow ho raha hai [jise ham follow kar rahe hai]
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
followSchema.index({ follower: 1, following: 1 }, { unique: true }); // prevent duplicate follows
followSchema.index({ following: 1 }); // for efficient querying of followers
followSchema.index({ follower: 1 }); // for efficient querying of following

const Follow = mongoose.model<IFollowDocument>('Follow', followSchema);
export default Follow;
