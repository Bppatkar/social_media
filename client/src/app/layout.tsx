import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppProvider from '@/providers/AppProvider';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SocialSphere',
    template: '%s | SocialSphere',
  },
  description:
    'Production-grade social media platform built with Next.js, Express.js, MongoDB, Redis, Socket.IO, Docker, and AWS.',
  applicationName: 'SocialSphere',
  keywords: [
    'Social Media',
    'Next.js',
    'React',
    'TypeScript',
    'MongoDB',
    'Express',
    'Redis',
    'Socket.IO',
    'Docker',
    'AWS',
  ],
  authors: [{ name: 'Bhanu Pratap Patkar' }],
  creator: 'Bhanu Pratap Patkar',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProvider>{children}</AppProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
