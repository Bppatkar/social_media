import { api } from '../testServer.js';

describe('Posts Negative Tests', () => {
  it('should fail create post without auth', async () => {
    const res = await api
      .post('/api/posts/create')
      .field('content', 'Unauthorized Post');

    expect(res.status).toBe(401);
  });

  it('should fail get invalid post', async () => {
    const email = `user${Date.now()}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'user1',
      email,
      password: '123456',
    });

    const login = await api.post('/api/auth/login').send({
      email,
      password: '123456',
    });

    const cookies = login.headers['set-cookie'];
    if(!cookies) throw new Error('Login failed, no cookies set');

    const res = await api
      .get('/api/posts/507f1f77bcf86cd799439011')
      .set('Cookie', cookies);

    expect(res.status).toBe(404);
  });
});