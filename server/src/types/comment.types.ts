import mongoose from 'mongoose';

export interface IComment {
  content: string;
  post: mongoose.Types.ObjectId;
  commentedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, mongoose.Document {}
