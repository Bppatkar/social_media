export interface FollowUser {
  _id: string;
  username: string;
  profileImage?: string;
}

export interface FollowItem {
  _id: string;
  follower?: FollowUser;
  following?: FollowUser;
  createdAt: string;
}

export interface FollowResponse {
  follow: FollowItem;
  isFollowing: boolean;
}

export interface UnfollowResponse {
  isFollowing: boolean;
}

export interface FollowersResponse {
  currentPage: number;
  totalPages: number;
  totalFollowers: number;
  followers: FollowItem[];
}

export interface FollowingResponse {
  currentPage: number;
  totalPages: number;
  totalFollowing: number;
  following: FollowItem[];
}
