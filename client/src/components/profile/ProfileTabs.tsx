'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  posts: React.ReactNode;
  photos: React.ReactNode;
}

export default function ProfileTabs({ posts, photos }: Props) {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="grid w-full grid-cols-2 rounded-xl border border-white/10 bg-neutral-900 p-1">
        <TabsTrigger
          value="posts"
          className="text-zinc-400 transition-all hover:text-white data-[state=active]:bg-violet-600 data-[state=active]:text-white"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="photos"
          className="text-zinc-400 transition-all hover:text-white data-[state=active]:bg-violet-600 data-[state=active]:text-white"
        >
          Photos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6" id="profile-posts">
        {posts}
      </TabsContent>

      <TabsContent value="photos" className="mt-6">
        {photos}
      </TabsContent>
    </Tabs>
  );
}
