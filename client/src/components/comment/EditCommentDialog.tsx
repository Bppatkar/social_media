'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  commentSchema,
  type CommentSchema,
} from '@/lib/validations/comment.schema';

import { getApiError } from '@/utils/getApiError';

import { useUpdateCommentMutation } from '@/features/comment/commentApi';

import type { EditCommentDialogProps } from '@/types';

export default function EditCommentDialog({
  open,
  onOpenChange,
  comment,
}: EditCommentDialogProps) {
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const { register, handleSubmit, reset } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  useEffect(() => {
    reset({
      content: comment.content,
    });
  }, [comment, reset]);

  const onSubmit = async (values: CommentSchema) => {
    try {
      await updateComment({
        commentId: comment._id,
        postId: comment.post,
        body: {
          content: values.content,
        },
      }).unwrap();

      toast.success('Comment updated');

      onOpenChange(false);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea rows={5} {...register('content')} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
