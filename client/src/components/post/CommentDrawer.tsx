'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import CommentList from '@/components/comment/CommentList';
import CommentInput from '@/components/comment/CommentInput';

interface Props {
  postId: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCommentAdded: () => void;
  onCommentDeleted: () => void;
}

export default function CommentDrawer({
  postId,
  open,
  onOpenChange,
  onCommentAdded,
  onCommentDeleted,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col border-white/10 bg-neutral-900 text-white sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        {/* Comments */}

        <div className="mt-6 flex-1 overflow-y-auto pr-2">
          <CommentList postId={postId} onCommentDeleted={onCommentDeleted} />
        </div>

        {/* Input */}

        <div className="border-t border-white/10 pt-4">
          <CommentInput postId={postId} onCommentAdded={onCommentAdded} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
