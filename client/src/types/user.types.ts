export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  bio?: string;
  profileImage?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  isCurrentUser: boolean;
}
