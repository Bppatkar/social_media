'use client';

import LoadingState from '../feedback/LoadingState';
import EmptyState from '../feedback/EmptyState';
import ErrorState from '../feedback/ErrorState';
import CommentCard from './CommentCard';

import { useGetCommentsQuery } from '@/features/comment/commentApi';

interface Props {
  postId: string;
  onCommentDeleted: () => void;
}

export default function CommentList({ postId, onCommentDeleted }: Props) {
  const { data, isLoading, isError } = useGetCommentsQuery(postId);
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!data || !data.comments?.length) {
    return (
      <EmptyState
        title="No comments yet."
        description="Be the first to comment!"
      />
    );
  }

  return (
    <div className="space-y-4">
      {data.comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} onCommentDeleted={onCommentDeleted} />
      ))}
    </div>
  );
}
