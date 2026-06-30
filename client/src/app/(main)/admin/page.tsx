import { Card } from '@/components/ui/card';

export default function AdminPage() {
  const stats = {
    users: 1248,
    posts: 9231,
    comments: 38129,
    likes: 120321,
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-zinc-400">Users</p>

        <h2 className="mt-3 text-4xl font-bold text-white">{stats.users}</h2>
      </Card>

      <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-zinc-400">Posts</p>

        <h2 className="mt-3 text-4xl font-bold text-white">{stats.posts}</h2>
      </Card>

      <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-zinc-400">Comments</p>

        <h2 className="mt-3 text-4xl font-bold text-white">{stats.comments}</h2>
      </Card>

      <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-zinc-400">Likes</p>

        <h2 className="mt-3 text-4xl font-bold text-white">{stats.likes}</h2>
      </Card>
    </div>
  );
}
