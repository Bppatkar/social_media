import { Orbit } from 'lucide-react';

type LogoProps = {
  showText?: boolean;
};

export default function Logo({ showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-violet-500/30">
        <Orbit className="h-6 w-6 text-white" />
      </div>

      {showText && (
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight text-white">
            SocialSphere
          </h1>

          <p className="text-xs text-zinc-400">
            Connect • Share • Inspire
          </p>
        </div>
      )}
    </div>
  );
}