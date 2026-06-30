'use client';

import Image from 'next/image';
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
} from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Owner {
  _id: string;
  username: string;
  email?: string;
  profileImage?: string;
}

export interface Post {
  _id: string;
  content: string;
  image?: string;
  imagePublicId?: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;

  owner: Owner;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const handleLike = () => {
    // RTK Like Mutation
  };

  const handleComment = () => {
    // Open Comment Drawer
  };

  const handleShare = () => {
    // Share API
  };

  const handleBookmark = () => {
    // Save Post
  };

  const handleMore = () => {
    // Edit/Delete Dropdown
  };

  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-violet-500/30">
      <CardContent className="space-y-5 p-5">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <UserAvatar
              src={post.owner.profileImage}
              alt={post.owner.username}
            />

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">
                  {post.owner.username}
                </h3>

                <Badge
                  variant="secondary"
                  className="border border-violet-500/20 bg-violet-500/10 text-violet-300"
                >
                  Member
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>@{post.owner.username}</span>

                <span>•</span>

                <TimeAgo date={post.createdAt} />
              </div>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleMore}
            className="rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}

        <div className="space-y-4">
          <p className="leading-7 whitespace-pre-wrap text-zinc-200">
            {post.content}
          </p>

          {post.image && (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                loading="eager"
                src={post.image}
                alt="Post"
                width={900}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Stats */}

        <div className="flex items-center gap-6 border-y border-white/10 py-3 text-sm text-zinc-400">
          <span>
            <strong className="text-white">{post.likeCount}</strong> Likes
          </span>

          <span>
            <strong className="text-white">{post.commentCount}</strong> Comments
          </span>
        </div>

        {/* Actions */}

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="ghost"
            onClick={handleLike}
            className="justify-center gap-2 text-zinc-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <Heart className="h-5 w-5" />
            Like
          </Button>

          <Button
            variant="ghost"
            onClick={handleComment}
            className="justify-center gap-2 text-zinc-300 hover:bg-sky-500/10 hover:text-sky-400"
          >
            <MessageCircle className="h-5 w-5" />
            Comment
          </Button>

          <Button
            variant="ghost"
            onClick={handleShare}
            className="justify-center gap-2 text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-400"
          >
            <Repeat2 className="h-5 w-5" />
            Share
          </Button>

          <Button
            variant="ghost"
            onClick={handleBookmark}
            className="justify-center gap-2 text-zinc-300 hover:bg-violet-500/10 hover:text-violet-400"
          >
            <Bookmark className="h-5 w-5" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
