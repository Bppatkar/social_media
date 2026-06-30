'use client';

import { Send } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function CommentDrawer({ open, onOpenChange }: Props) {
  const handleComment = () => {
    // Create Comment
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-white/10 bg-neutral-900 text-white"
      >
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex h-full flex-col justify-between">
          <div className="flex-1 space-y-5 overflow-y-auto pr-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Bhanu</p>

              <p className="mt-2 text-zinc-300">Amazing project 🔥</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">Alex</p>

              <p className="mt-2 text-zinc-300">Looks awesome.</p>
            </div>
          </div>

          <div className="mt-6">
            <Textarea placeholder="Write comment..." rows={3} />

            <Button className="mt-3 w-full" onClick={handleComment}>
              <Send className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
