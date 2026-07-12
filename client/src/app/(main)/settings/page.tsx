'use client';

import { useState } from 'react';
import SettingsAccount from '@/components/settings/SettingsAccount';
import SettingsDangerZone from '@/components/settings/SettingsDangerZone';
import SettingsPreferences from '@/components/settings/SettingsPreferences';
import SettingsProfileCard from '@/components/settings/SettingsProfileCard';
import EditProfileDialog from '@/components/profile/EditProfileDialog';



export default function SettingsPage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* Page Heading */}

      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>

        <p className="mt-2 text-zinc-400">
          Manage your account, preferences and security settings.
        </p>
      </div>

      {/* Profile */}

      <SettingsProfileCard onEditClick={() => setEditOpen(true)} />

      {/* Account */}

      <SettingsAccount />

      {/* Preferences */}

      <SettingsPreferences />

      {/* Danger */}

      <SettingsDangerZone />

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}
