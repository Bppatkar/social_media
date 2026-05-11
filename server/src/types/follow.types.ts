import mongoose from 'mongoose';

/* 
follower  = jisne follow kiya
following = jise follow kiya gaya
*/

export interface IFollow {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFollowDocument extends IFollow, mongoose.Document {}
