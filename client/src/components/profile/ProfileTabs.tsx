'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  posts: React.ReactNode;
  photos: React.ReactNode;
}

export default function ProfileTabs({
  posts,
  photos,
}: Props) {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="grid w-full grid-cols-2 bg-white/5">
        <TabsTrigger value="posts">
          Posts
        </TabsTrigger>

        <TabsTrigger value="photos">
          Photos
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="posts"
        className="mt-6"
      >
        {posts}
      </TabsContent>

      <TabsContent
        value="photos"
        className="mt-6"
      >
        {photos}
      </TabsContent>
    </Tabs>
  );
}