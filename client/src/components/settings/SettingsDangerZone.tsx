'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsDangerZone() {
  return (
    <Card className="space-y-5 border border-red-500/30 bg-red-500/5 p-6">
      <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

      <p className="text-zinc-400">
        Permanently delete your account and all associated data.
      </p>

      <Button variant="destructive">Delete Account</Button>
    </Card>
  );
}
