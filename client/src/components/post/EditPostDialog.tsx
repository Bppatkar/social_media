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

import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from '@/features/feed/postApi';

import { getApiError } from '@/utils/getApiError';
import { toast } from 'sonner';

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
}

export default function EditPostDialog({
  open,
  onOpenChange,
  postId,
}: EditPostDialogProps) {
  const { data, isLoading } = useGetSinglePostQuery(postId, {
    skip: !open,
  });

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (data?.data) {
      setContent(data.data.content);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('content', content);

      if (image) {
        formData.append('image', image);
      }

      await updatePost({
        id: postId,
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

        {isLoading ? (
          <p className="py-10 text-center text-zinc-400">Loading...</p>
        ) : (
          <div className="space-y-5">
            <Textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
            />

            {data?.data.image && !image && (
              <Image
                src={data.data.image}
                alt="Current Post"
                width={700}
                height={500}
                className="rounded-xl border border-white/10"
              />
            )}

            {image && (
              <Image
                src={URL.createObjectURL(image)}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
