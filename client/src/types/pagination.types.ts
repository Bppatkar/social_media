import type { Post } from './post.types';

export interface FeedResponse {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: Post[];
}
