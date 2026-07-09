'use client';

import { Users, FileText, Flag, Shield } from 'lucide-react';
import { useGetDashboardStatsQuery } from '@/features/admin/adminApi';

import { Card } from '@/components/ui/card';

export default function AdminStats() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  const stats = [
    {
      title: 'Total Users',
      value: data?.totalUsers ?? 0,
      icon: Users,
    },
    {
      title: 'Posts',
      value: data?.totalPosts ?? 0,
      icon: FileText,
    },
    {
      title: 'Comments',
      value: data?.totalComments ?? 0,
      icon: Flag,
    },
    {
      title: 'Likes',
      value: data?.totalLikes ?? 0,
      icon: Shield,
    },
  ];
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card
            key={idx}
            className="border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="w-3/4">
                <div className="h-4 w-1/2 rounded bg-zinc-700/40 animate-pulse" />
                <div className="mt-3 h-8 w-3/4 rounded bg-zinc-700/40 animate-pulse" />
              </div>

              <div className="rounded-xl bg-violet-500/10 p-4">
                <div className="h-7 w-7 rounded bg-violet-400/30 animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{item.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div className="rounded-xl bg-violet-500/10 p-4">
                <Icon className="h-7 w-7 text-violet-400" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
