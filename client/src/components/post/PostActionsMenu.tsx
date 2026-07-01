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

interface PostActionsMenuProps {
  postId: string;
  isOwner: boolean;
  variant: 'feed' | 'profile';
}

export default function PostActionsMenu({
  postId,
  isOwner,
  variant,
}: PostActionsMenuProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEdit = () => {
    // TODO:
    // Open Edit Dialog
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const handleBookmark = () => {
    // TODO:
  };

  const handleReport = () => {
    // TODO:
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

      <DeletePostDialog
        postId={postId}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}