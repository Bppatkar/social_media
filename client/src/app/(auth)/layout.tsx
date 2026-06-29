import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-8 sm:px-6 sm:py-10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#4338ca22,transparent_40%),radial-gradient(circle_at_bottom_right,#7c3aed22,transparent_35%)]" />

      {/* Decorative Blur */}
      <div className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Page Content */}
      <section className="relative z-10 w-full max-w-md">
        {children}
      </section>
    </main>
  );
}
