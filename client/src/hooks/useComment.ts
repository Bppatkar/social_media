import { useCreateCommentMutation } from '@/features/comment/commentApi';

export function useComment() {
  const [createComment, { isLoading }] = useCreateCommentMutation();

  return {
    createComment,
    isLoading,
  };
}