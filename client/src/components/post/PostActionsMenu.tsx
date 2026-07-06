'use client';

import { useState } from 'react';
import {
  Bookmark,
  Copy,
  Flag,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';

import DeletePostDialog from './DeletePostDialog';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditPostDialog from './EditPostDialog';
import { toast } from 'sonner';
import type { Post } from '@/types';

interface PostActionsMenuProps {
  post: Post;
  isOwner: boolean;
  variant: 'feed' | 'profile';
}

export default function PostActionsMenu({
  post,
  isOwner,
  variant,
}: PostActionsMenuProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/post/${post._id}`
    );
    toast.success('Link copied to clipboard');
  };

  const handleBookmark = () => {
    toast.info('Bookmarks are intentionally excluded from this interview edition.');
  };

  const handleReport = () => {
    toast.info('Report feature coming soon.......');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-52 border-white/10 bg-neutral-900 text-white"
        >
          {/* Feed → Owner */}

          {variant === 'feed' && isOwner && (
            <>
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Post
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {/* Profile → Owner */}

          {variant === 'profile' && isOwner && (
            <>
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Post
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {/* Other Users */}

          {!isOwner && (
            <>
              <DropdownMenuItem onClick={handleBookmark}>
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleReport}>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPostDialog open={editOpen} onOpenChange={setEditOpen} post={post} />

      <DeletePostDialog
        postId={post._id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
