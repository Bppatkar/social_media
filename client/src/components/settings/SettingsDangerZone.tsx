'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useDeleteAccountMutation } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { baseApi } from '@/services/api/baseApi';
import { toast } from 'sonner';
import { getApiError } from '@/utils/getApiError';

export default function SettingsDangerZone() {
  const [open, setOpen] = useState(false);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteAccount().unwrap();
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success('Account deleted successfully');
      router.replace('/login');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <Card className="space-y-5 border border-red-500/30 bg-red-500/5 p-6">
        <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

        <p className="text-zinc-400">
          Permanently delete your account and all associated data.
        </p>

        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </Card>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border-white/10 bg-neutral-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove your account, posts, comments and
              media.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
