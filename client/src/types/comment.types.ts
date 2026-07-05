import type { Owner } from '@/types';

export interface Comment {
  _id: string;
  content: string;
  post: string;
  commentedBy: Owner;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  currentPage: number;
  totalPages: number;
  totalComments: number;
  comments: Comment[];
}

export interface DeleteCommentResponse {
  message: string;
}

export interface EditCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: Comment;
}

export interface DeleteCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: Comment;
  onCommentDeleted: () => void;
}

export interface CommentCardProps {
  comment: Comment;
}

export interface CommentInputProps {
  postId: string;
}

export interface CommentListProps {
  postId: string;
}
