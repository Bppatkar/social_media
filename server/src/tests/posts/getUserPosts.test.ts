import { api } from '../testServer.js';

describe('Get User Posts API', () => {
  it('should get user posts successfully', async () => {
    const uniqueId = Date.now().toString().slice(-6);

    const email = `userposts${uniqueId}@gmail.com`;

    const registerRes = await api.post('/api/auth/register').send({
      username: `user${uniqueId}`,
      email,
      password: '123456',
    });

    const userId = registerRes.body.data.user._id;

    const loginRes = await api.post('/api/auth/login').send({
      email,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];
    if(!cookies) {
      throw new Error('Login failed, no cookies set');
    }

    await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'first user post');

    await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'second user post');

    const res = await api
      .get(`/api/posts/user/${userId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});