'use client';

import { useRef, useState } from 'react';

import { ImagePlus, Loader2, SmilePlus, Trash2 } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import ImagePreview from '@/components/shared/ImagePreview';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function CreatePostCard() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState('');

  const [loading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // TODO: Replace with toast later
      alert('Maximum image size is 5MB');
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
    // ==========================
    // Future RTK Query Flow
    // ==========================

    // 1. Validate content

    // 2. Upload image to backend

    // 3. Create Post Mutation

    // 4. Show Success Toast

    // 5. Reset Form

    // 6. Refetch Feed

    console.log({
      content,
      image,
    });

    // Temporary reset

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setContent('');
    setImage(null);
    setPreview('');

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

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

            <Button size="icon" variant="ghost"  className="text-zinc-400 hover:bg-violet-500/10 hover:text-violet-400">
              <SmilePlus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm text-zinc-500">{content.length}/500</span>

            <Button
              disabled={loading || (!content.trim() && !image)}
              onClick={handleCreatePost}
            >
              {loading ? (
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
