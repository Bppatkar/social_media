import mongoose from 'mongoose';

export interface IPost {
  content: string;
  image?: string;
  owner: mongoose.Types.ObjectId;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, mongoose.Document {}
