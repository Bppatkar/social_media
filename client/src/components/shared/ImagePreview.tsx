'use client';

import Image from 'next/image';

interface ImagePreviewProps {
  src: string;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <Image
        src={src}
        alt="Preview"
        width={800}
        height={500}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
