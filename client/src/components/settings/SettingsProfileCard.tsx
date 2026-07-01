'use client';

import UserAvatar from '@/components/shared/UserAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsProfileCard() {
  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <UserAvatar size="lg" />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            Bhanu Pratap
          </h2>

          <p className="text-zinc-400">
            bhanu@gmail.com
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your profile information and public account details.
          </p>
        </div>

        <Button>
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}