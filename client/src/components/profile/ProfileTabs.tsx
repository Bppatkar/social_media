'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  posts: React.ReactNode;
  photos: React.ReactNode;
}

export default function ProfileTabs({ posts, photos }: Props) {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/5 p-1">
        <TabsTrigger
          value="posts"
          className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-none"
        >
          Posts
        </TabsTrigger>

        <TabsTrigger
          value="photos"
          className="data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-none"
        >
          Photos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        {posts}
      </TabsContent>

      <TabsContent value="photos" className="mt-6">
        {photos}
      </TabsContent>
    </Tabs>
  );
}
