'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, SmilePlus, Trash2 } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import ImagePreview from '@/components/shared/ImagePreview';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';
import { useCreatePostMutation } from '@/features/feed/postApi';
import { getApiError } from '@/utils/getApiError';

export default function CreatePostCard() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState('');

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum image size is 5MB');
      return;
    }

    // Remove previous preview if it exists
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(objectUrl);
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview('');
  };

  const handleCreatePost = async () => {
    
    if (!content.trim() && !image) {
      toast.error('Post content or image is required');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      const response = await createPost(formData).unwrap();
      toast.success(response.message);
      if (preview) {
        // URL means that the image is being displayed in the browser, so we need to revoke it to free up memory
        // so we use URL.revokeObjectURL to revoke the object URL
        URL.revokeObjectURL(preview);
      }
      setContent('');
      setImage(null);
      setPreview('');

      if (fileRef.current) {
        fileRef.current.value = '';
      }
    } catch (error) {
      toast.error(getApiError(error));
    }
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="space-y-5 p-5">
        <div className="flex gap-4">
          <UserAvatar />

          <Textarea
            value={content}
            maxLength={500}
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="resize-none border-none bg-transparent text-white focus-visible:ring-0"
          />
        </div>

        {preview && (
          <div className="relative">
            <ImagePreview src={preview} />

            <Button
              size="icon"
              variant="destructive"
              onClick={removeImage}
              className="absolute top-3 right-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        <input
          hidden
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleImageUpload}
        />

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => fileRef.current?.click()}
              className="text-zinc-400 hover:bg-violet-500/10 hover:text-violet-400"
            >
              <ImagePlus className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:bg-violet-500/10 hover:text-violet-400"
            >
              <SmilePlus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm text-zinc-500">{content.length}/500</span>

            <Button
              disabled={isLoading || (!content.trim() && !image)}
              onClick={handleCreatePost}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
