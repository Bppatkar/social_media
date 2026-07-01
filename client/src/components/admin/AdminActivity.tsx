'use client';

import { Card } from '@/components/ui/card';

const activities = [
  'Bhanu deleted a reported post',
  'Alex banned a spam account',
  'New admin account created',
  'User profile updated',
  'Reported comment removed',
];

export default function AdminActivity() {
  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item}
            className="border-l-2 border-violet-500 pl-4"
          >
            <p className="text-zinc-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}