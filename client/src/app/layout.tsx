import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppProvider from '@/providers/AppProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Social Media Platform',
  description:
    'A social media platform built with Next.js, React, and Redux Toolkit Query (RTK Query). This platform allows users to register, log in, and interact with posts and comments. It demonstrates the use of modern web development technologies and best practices. The application is designed to be scalable, maintainable, and user-friendly, providing a seamless experience for users to connect and share content. It serves as a practical example of how to implement authentication, state management, and API interactions in a web application. In Backend, it utilizes Node.js and Express and database is MongoDB and for caching we use Redis and for containerization we use Docker and cloud services we are using AWS. for more information please visit our GitHub repository.',
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
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
