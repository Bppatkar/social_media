'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bookmark, Heart, MessageCircle, Repeat2 } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CommentDrawer from './CommentDrawer';
import PostActionsMenu from './PostActionsMenu';
import type { PostCardProps } from '@/types';

import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '@/features/feed/likeApi';
import { getApiError } from '@/utils/getApiError';
import { toast } from 'sonner';
import Link from 'next/link';

export default function PostCard({
  post,
  variants = 'feed',
  isOwner,
  highlighted = false,
}: PostCardProps) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(post.likedByCurrentUser ?? false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLiked(post.likedByCurrentUser ?? false);
    setLikeCount(post.likeCount);
    setCommentCount(post.commentCount);
  }, [post]);

  useEffect(() => {
    if (highlighted) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlighted]);

  const handleLike = async () => {
    const prevLiked = liked;
    const prevLikeCount = likeCount;
    const nextLiked = !liked;
    const nextLikeCount = nextLiked
      ? likeCount + 1
      : Math.max(0, likeCount - 1);

    setLiked(nextLiked);
    setLikeCount(nextLikeCount);

    try {
      if (liked) {
        const response = await unlikePost(post._id).unwrap();

        setLikeCount(response.data.likeCount);
      } else {
        const response = await likePost(post._id).unwrap();

        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      setLiked(prevLiked);
      setLikeCount(prevLikeCount);
      toast.error(getApiError(error));
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${post._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Social Media Post',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied');
      }
    } catch {
      if (!navigator.share) return;
      // user cancelled the share action
    }
  };

  const handleBookmark = () => {
    toast.info(
      'Bookmarks are intentionally excluded from this interview edition.'
    );
  };

  return (
    <Card
      ref={ref}
      className={`overflow-hidden backdrop-blur-xl transition-all ${
        highlighted
          ? 'border-2 border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/30'
          : 'border-white/10 bg-white/5 hover:border-violet-500/30'
      } `}
    >
      <CardContent className="space-y-5 p-5">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Link href={`/profile/${post.owner._id}`}>
              <UserAvatar
                src={post.owner.profileImage}
                alt={post.owner.username}
              />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">
                  <Link href={`/profile/${post.owner._id}`}>
                    {post.owner.username}
                  </Link>
                </h3>

                <Badge
                  variant="secondary"
                  className="border border-violet-500/20 bg-violet-500/10 text-violet-300"
                >
                  Member
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Link href={`/profile/${post.owner._id}`}>
                  <span>@{post.owner.username}</span>
                </Link>

                <span>•</span>

                <TimeAgo date={post.createdAt} />
              </div>
            </div>
          </div>

          <PostActionsMenu post={post} isOwner={isOwner} variant={variants} />
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
                priority
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
            <strong className="text-white">{likeCount}</strong> Likes
          </span>

          <span>
            <strong className="text-white">{commentCount}</strong> Comments
          </span>
        </div>

        {/* Actions */}

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="ghost"
            onClick={handleLike}
            className="justify-center gap-2 text-zinc-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <Heart
              className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`}
            />
            Like
          </Button>

          <Button
            variant="ghost"
            onClick={() => setCommentOpen(true)}
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
      <CommentDrawer
        postId={post._id}
        open={commentOpen}
        onOpenChange={setCommentOpen}
        onCommentAdded={() => setCommentCount((c) => c + 1)}
        onCommentDeleted={() => setCommentCount((c) => Math.max(0, c - 1))}
      />
    </Card>
  );
}
