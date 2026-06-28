type UserAvatarProps = {
  name?: string;
};

export default function UserAvatar({ name = 'User' }: UserAvatarProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}
