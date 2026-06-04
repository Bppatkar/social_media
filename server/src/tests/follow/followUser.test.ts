import { api } from '../testServer.js';

describe('Follow User API', () => {
  it('should follow user successfully', async () => {
    const id = Date.now();

    const email1 = `u1${id}@gmail.com`;
    const email2 = `u2${id}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: `user1${id}`,
      email: email1,
      password: '123456',
    });

    const user2 = await api.post('/api/auth/register').send({
      username: `user2${id}`,
      email: email2,
      password: '123456',
    });

    const loginRes = await api.post('/api/auth/login').send({
      email: email1,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];
    if(!cookies) {
      throw new Error('No cookies set after login');
    }

    const targetUserId = user2.body.data.user._id;

    const res = await api
      .post(`/api/follows/${targetUserId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});