import SettingsAccount from '@/components/settings/SettingsAccount';
import SettingsDangerZone from '@/components/settings/SettingsDangerZone';
import SettingsPreferences from '@/components/settings/SettingsPreferences';
import SettingsProfileCard from '@/components/settings/SettingsProfileCard';

export default function SettingsPage() {
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

      <SettingsProfileCard />

      {/* Account */}

      <SettingsAccount />

      {/* Preferences */}

      <SettingsPreferences />

      {/* Danger */}

      <SettingsDangerZone />
    </div>
  );
}
