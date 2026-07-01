'use client';

import { Users, FileText, Flag, Shield } from 'lucide-react';

import { Card } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Users',
    value: '12,458',
    icon: Users,
  },
  {
    title: 'Posts',
    value: '89,240',
    icon: FileText,
  },
  {
    title: 'Reports',
    value: '36',
    icon: Flag,
  },
  {
    title: 'Admins',
    value: '5',
    icon: Shield,
  },
];

export default function AdminStats() {
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
