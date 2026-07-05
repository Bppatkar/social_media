'use client';

import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  commentSchema,
  type CommentSchema,
} from '@/lib/validations/comment.schema';

import { getApiError } from '@/utils/getApiError';

import { useCreateCommentMutation } from '@/features/comment/commentApi';

interface Props {
  postId: string;
  onCommentAdded: () => void;
}

export default function CommentInput({ postId, onCommentAdded }: Props) {
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const { register, handleSubmit, reset } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: CommentSchema) => {
    try {
      await createComment({
        postId,
        body: {
          content: values.content,
        },
      }).unwrap();
      onCommentAdded();

      toast.success('Comment added');

      reset();
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Textarea
        rows={3}
        placeholder="Write your comment..."
        {...register('content')}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        <Send className="mr-2 h-4 w-4" />
        Comment
      </Button>
    </form>
  );
}
