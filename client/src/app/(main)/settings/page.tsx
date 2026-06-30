import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your account preferences.
        </p>
      </div>

      <Card className="space-y-6 border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              Email Notifications
            </h3>

            <p className="text-sm text-zinc-400">
              Receive updates by email.
            </p>
          </div>

          <Switch />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              Push Notifications
            </h3>

            <p className="text-sm text-zinc-400">
              Receive browser notifications.
            </p>
          </div>

          <Switch />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              Private Account
            </h3>

            <p className="text-sm text-zinc-400">
              Only followers can view posts.
            </p>
          </div>

          <Switch />
        </div>
      </Card>
    </div>
  );
}