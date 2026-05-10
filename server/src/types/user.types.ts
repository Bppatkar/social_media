import mongoose from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, mongoose.Document {} // ye interface mongoose.Document ko extend kar rahi hai, jisme mongoose ke document ke sare properties aur methods available honge, jaise ki _id, save(), etc.
