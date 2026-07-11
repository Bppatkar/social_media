'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import SubmitButton from '@/components/shared/SubmitButton';

import {
  profileSchema,
  type ProfileSchema,
} from '@/lib/validations/profile.schema';

import { getApiError } from '@/utils/getApiError';

import { useUpdateProfileMutation } from '@/features/profile/profileApi';
import { useGetMeQuery } from '@/features/auth/api/authApi';

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function EditProfileDialog({ open, onOpenChange }: Props) {
  const { data: me, refetch } = useGetMeQuery();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!me) return;

    reset({
      username: me.username,
      bio: me.bio ?? '',
    });
  }, [me, reset]);

  const onSubmit = async (values: ProfileSchema) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);

      if (values.bio) {
        formData.append('bio', values.bio);
      }

      const profileImageInput = (
        document.getElementById('profileImage') as HTMLInputElement | null
      )?.files?.[0];
      const coverImageInput = (
        document.getElementById('coverImage') as HTMLInputElement | null
      )?.files?.[0];

      if (profileImageInput) {
        formData.append('profileImage', profileImageInput);
      }

      if (coverImageInput) {
        formData.append('coverImage', coverImageInput);
      }

      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
      onOpenChange(false);
      await refetch();
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Input placeholder="Username" {...register('username')} />

            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Textarea rows={4} placeholder="Bio..." {...register('bio')} />

            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Avatar</Label>
            <Input id="profileImage" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Photo</Label>
            <Input id="coverImage" type="file" accept="image/*" />
          </div>

          <SubmitButton type="submit" loading={isLoading}>
            Save Changes
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
