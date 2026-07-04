export interface SearchUser {
  _id: string;
  username: string;
  bio?: string;
  profileImage?: string;
  role: 'user' | 'admin';
  isFollowing: boolean;
}

export type SuggestedUser = SearchUser;

export interface SearchResponse {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  users: SearchUser[];
}
