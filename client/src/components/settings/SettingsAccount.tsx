'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useUpdateProfileMutation } from '@/features/profile/profileApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getApiError } from '@/utils/getApiError';
import { setCredentials } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

export default function SettingsAccount() {
  const { data: user } = useGetMeQuery();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (!user) return;

    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const onSaveChanges = async () => {
    if (!user) return;
    if (!username.trim() || !email.trim()) {
      toast.error('Username and email cannot be empty');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('username', username);
      formData.append('email', email);

      if (user.bio) {
        formData.append('bio', user.bio);
      }

      await updateProfile(formData).unwrap();

      toast.success('Profile updated successfully');
      dispatch(setCredentials({ user: { ...user, username, email } }));
    } catch (error) {
      toast.error(getApiError(error) || 'Failed to update profile');
    }
  };

  const inputStyle =
    'border-white/15 bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-violet-500';

  return (
    <Card className="space-y-6 border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Account</h2>

      <div className="space-y-2">
        <Label className="text-zinc-300">Email</Label>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Username</Label>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputStyle}
        />
      </div>

      <Button
        variant={'outline'}
        className="mt-2 w-full"
        disabled={
          isLoading || (username === user?.username && email === user?.email)
        }
        onClick={onSaveChanges}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </Card>
  );
}
