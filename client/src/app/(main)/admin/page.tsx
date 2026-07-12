import AdminActivity from '@/components/admin/AdminActivity';
import AdminCharts from '@/components/admin/AdminCharts';
import AdminStats from '@/components/admin/AdminStats';
import RecentReports from '@/components/admin/RecentReports';
import UserTable from '@/components/admin/UserTable';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Platform administration panel.',
};

export default function AdminPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>

        <p className="mt-2 text-zinc-400">
          Monitor users, posts, reports and platform activity.
        </p>
      </div>

      <AdminStats />

      <AdminCharts />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentReports />

        <AdminActivity />
      </div>

      <UserTable />
    </div>
  );
}
