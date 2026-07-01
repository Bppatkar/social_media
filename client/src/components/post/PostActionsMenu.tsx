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
    // Open Edit Post Dialog
  };

  const handleCopyLink = async () => {
    // TODO:
    // Replace with actual post URL later

    await navigator.clipboard.writeText(window.location.href);
  };

  const handleBookmark = () => {
    // RTK Mutation
  };

  const handleReport = () => {
    // RTK Mutation
  };

  return (
    {variant === 'feed' && isOwner && (
  <>
    <DropdownMenuItem onClick={handleEdit}>
      <Pencil className="mr-2 h-4 w-4" />
      Edit Post
    </DropdownMenuItem>

    <DropdownMenuSeparator />
  </>
)}

{variant === 'profile' && isOwner && (
  <>
    <DropdownMenuItem onClick={handleEdit}>
      <Pencil className="mr-2 h-4 w-4" />
      Edit Post
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem
      onClick={() => setDeleteOpen(true)}
      className="text-red-500"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete Post
    </DropdownMenuItem>

    <DropdownMenuSeparator />
  </>
)}

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

      <DeletePostDialog
        postId={postId}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>

  );
}
