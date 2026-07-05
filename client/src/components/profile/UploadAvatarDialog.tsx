'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { useUpdateProfileMutation } from '@/features/profile/profileApi';
import { getApiError } from '@/utils/getApiError';

interface UploadAvatarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadAvatarDialog({
  open,
  onOpenChange,
}: UploadAvatarDialogProps) {
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File>();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!open) {
      setFile(undefined);
      setPreview(undefined);
    }
  }, [open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      toast.error('Please select an image.');
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('profileImage', file);

      await updateProfile(formData).unwrap();

      toast.success('Profile picture updated.');

      onOpenChange(false);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <label
              htmlFor="avatar-upload"
              className="group relative flex h-44 w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-white/5 transition hover:border-violet-500"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-zinc-400">
                  <Camera className="h-10 w-10" />

                  <span className="text-sm">Select Image</span>
                </div>
              )}
            </label>

            <input
              id="avatar-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={isLoading || !file}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
