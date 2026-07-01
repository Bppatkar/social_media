'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const users = [
  {
    id: 1,
    username: 'Bhanu',
    email: 'bhanu@gmail.com',
    role: 'Admin',
  },
  {
    id: 2,
    username: 'Alex',
    email: 'alex@gmail.com',
    role: 'User',
  },
  {
    id: 3,
    username: 'John',
    email: 'john@gmail.com',
    role: 'User',
  },
];

export default function UserTable() {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Recent Users</h2>
      </div>

      <table className="w-full">
        <thead className="border-b border-white/10 text-left text-zinc-400">
          <tr>
            <th className="p-4">Username</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="p-4 font-medium text-white">{user.username}</td>

              <td className="text-zinc-400">{user.email}</td>

              <td>
                <Badge
                  className={
                    user.role === 'Admin' ? 'bg-red-600' : 'bg-violet-600'
                  }
                >
                  {user.role}
                </Badge>
              </td>

              <td className="p-4 text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
