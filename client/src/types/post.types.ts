export interface Owner {
  _id: string;
  username: string;
  email?: string;
  profileImage?: string;
}

export interface Post {
  _id: string;
  content: string;
  image?: string;
  imagePublicId?: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;

  owner: Owner;
}

export interface PostCardProps {
  post: Post;
  variants?: 'feed' | 'profile';
  isOwner: boolean;
}
