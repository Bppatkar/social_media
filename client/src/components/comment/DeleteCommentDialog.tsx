'use client';

import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { getApiError } from '@/utils/getApiError';

import { useDeleteCommentMutation } from '@/features/comment/commentApi';

import type { DeleteCommentDialogProps } from '@/types';

export default function DeleteCommentDialog({
  open,
  onOpenChange,
  comment,
  onCommentDeleted,
}: DeleteCommentDialogProps) {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const handleDelete = async () => {
    try {
      await deleteComment({
        commentId: comment._id,
        postId: comment.post,
      }).unwrap();

      onCommentDeleted();
      toast.success('Comment deleted');

      onOpenChange(false);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-zinc-400">
          Are you sure you want to delete this comment?
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
