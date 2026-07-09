'use client';

import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function SettingsPreferences() {
  return (
    <Card className="space-y-6 border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Preferences</h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-white">Email Notifications</p>

          <p className="text-sm text-zinc-500">
            Receive updates about your account.
          </p>
        </div>

        <Switch defaultChecked disabled/>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-white">Public Profile</p>

          <p className="text-sm text-zinc-500">
            Allow anyone to view your profile.
          </p>
        </div>

        <Switch defaultChecked disabled/>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-white">Dark Mode</p>

          <p className="text-sm text-zinc-500">
            Theme Prefereces will be available in a future update.
          </p>
        </div>

        <Switch defaultChecked  disabled/>
      </div>
    </Card>
  );
}
