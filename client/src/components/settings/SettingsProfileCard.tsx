'use client';

import UserAvatar from '@/components/shared/UserAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMeQuery } from '@/features/auth/api/authApi';

interface Props {
  onEditClick: () => void;
}

export default function SettingsProfileCard({ onEditClick }: Props) {
  const { data: user } = useGetMeQuery();

  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <UserAvatar size="lg" src={user?.profileImage} alt={user?.username} />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">{user?.username}</h2>

          <p className="text-zinc-400">{user?.email}</p>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your profile information and public account details.
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={onEditClick}
        >
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}
