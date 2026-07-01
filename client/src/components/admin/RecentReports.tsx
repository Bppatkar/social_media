'use client';

import { Flag } from 'lucide-react';

import { Card } from '@/components/ui/card';

const reports = [
  'Spam post reported',
  'Fake profile detected',
  'Offensive comment reported',
  'Duplicate account',
];

export default function RecentReports() {
  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Recent Reports</h2>

      <div className="space-y-5">
        {reports.map((report) => (
          <div
            key={report}
            className="flex items-center gap-3 rounded-lg bg-white/5 p-3"
          >
            <Flag className="h-5 w-5 text-red-400" />

            <p className="text-zinc-300">{report}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
