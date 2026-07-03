'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { useUpdatePostMutation } from '@/features/feed/postApi';

import { getApiError } from '@/utils/getApiError';
import { toast } from 'sonner';
import type { Post } from '@/types';

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

export default function EditPostDialog({
  open,
  onOpenChange,
  post,
}: EditPostDialogProps) {
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  useEffect(() => {
    setContent(post.content);
    setImage(null);
  }, [post]);

  // Create and cleanup preview URL
  useEffect(() => {
    if (!image) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleSubmit = async () => {
    if (!content.trim() && !image) {
      toast.error('Post cannot be empty');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('content', content);

      if (image) {
        formData.append('image', image);
      }

      await updatePost({
        id: post._id,
        body: formData,
      }).unwrap();

      toast.success('Post updated successfully');

      onOpenChange(false);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <Textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
          />

          {post.image && !image && (
            <Image
              src={post.image}
              alt="Current Post"
              width={700}
              height={500}
              className="rounded-xl border border-white/10"
            />
          )}

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={700}
              height={500}
              className="rounded-xl border border-white/10"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            <Pencil className="mr-2 h-4 w-4" />

            {isUpdating ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
