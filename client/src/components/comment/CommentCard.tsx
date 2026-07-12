'use client';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

import type { Comment } from '@/types';
import { memo, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import EditCommentDialog from './EditCommentDialog';
import DeleteCommentDialog from './DeleteCommentDialog';

interface Props {
  comment: Comment;
  onCommentDeleted: () => void;
}

function CommentCard({ comment, onCommentDeleted }: Props) {
  const { user } = useCurrentUser();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isCommentOwner = user?._id === comment.commentedBy._id;

  return (
    <>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex gap-3">
          <UserAvatar
            src={comment.commentedBy.profileImage}
            alt={comment.commentedBy.username}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">
                {comment.commentedBy.username}
              </h4>

              <div className="flex items-center gap-2">
                <TimeAgo date={comment.createdAt} />

                {isCommentOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="More"
                        className="rounded-md p-1 text-zinc-300 hover:bg-white/5"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-blue-500"
                        onClick={() => setEditOpen(true)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => setDeleteOpen(true)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <p className="mt-2 whitespace-pre-wrap text-zinc-300">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
      <EditCommentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        comment={comment}
      />

      <DeleteCommentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        comment={comment}
        onCommentDeleted={onCommentDeleted}
      />
    </>
  );
}

export default memo(CommentCard);
