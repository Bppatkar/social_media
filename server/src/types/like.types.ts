import mongoose from 'mongoose';

export interface ILike {
  post: mongoose.Types.ObjectId;
  likedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILikeDocument extends ILike, mongoose.Document {}
