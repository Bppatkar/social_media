'use client';

import { Card } from '@/components/ui/card';

export default function AdminCharts() {
  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/40 hover:shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Platform Analytics
      </h2>

      <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-white/10">
        <p className="text-zinc-500">Recharts Graph will be connected here.</p>
      </div>
    </Card>
  );
}
