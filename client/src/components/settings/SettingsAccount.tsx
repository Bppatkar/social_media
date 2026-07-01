'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsAccount() {
  return (
    <Card className="space-y-6 border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Account</h2>

      <div className="space-y-2">
        <Label>Email</Label>

        <Input value="bhanu@gmail.com" disabled />
      </div>

      <div className="space-y-2">
        <Label>Username</Label>

        <Input defaultValue="Bhanu" />
      </div>

      <Button>Save Changes</Button>
    </Card>
  );
}
