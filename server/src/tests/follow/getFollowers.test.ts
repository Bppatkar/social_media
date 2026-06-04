import { api } from '../testServer.js';

describe('Follow - Get Followers API', () => {
  it('should fetch followers successfully', async () => {
    const id = Date.now();

    const user1Email = `u1${id}@gmail.com`;
    const user2Email = `u2${id}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'user1',
      email: user1Email,
      password: '123456',
    });

    const user2 = await api.post('/api/auth/register').send({
      username: 'user2',
      email: user2Email,
      password: '123456',
    });

    const loginRes = await api.post('/api/auth/login').send({
      email: user1Email,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      throw new Error('No cookies set after login');
    }

    const targetUserId = user2.body.data.user._id;

    const res = await api
      .get(`/api/follows/followers/${targetUserId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
