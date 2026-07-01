'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsAccount() {
  const inputStyle =
    'border-white/15 bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-violet-500';

  return (
    <Card className="space-y-6 border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Account</h2>

      <div className="space-y-2">
        <Label className="text-zinc-300">Email</Label>

        <Input defaultValue="bhanu@gmail.com" className={inputStyle} />
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Username</Label>

        <Input defaultValue="Bhanu" className={inputStyle} />
      </div>

      <Button variant={'outline'} className="mt-2 w-full ">Save Changes</Button>
    </Card>
  );
}
