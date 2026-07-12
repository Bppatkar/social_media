'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function UserAvatar({
  src,
  alt = 'User',
  size = 'md',
}: UserAvatarProps) {
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-16 w-16',
  };

  return (
    <Avatar className={sizes[size]}>
      <AvatarImage src={src} alt={src}/>

      <AvatarFallback className="bg-violet-600 text-white">
        {alt.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
