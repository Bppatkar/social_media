import { api } from '../testServer.js';

describe('Toggle Like API', () => {
  it('should like a post successfully', async () => {
    const id = Date.now();

    const email = `user${id}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: `user${id}`,
      email,
      password: '123456',
    });

    const loginRes = await api.post('/api/auth/login').send({
      email,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      throw new Error('No cookies set after login');
    }

    const postRes = await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'Post for like testing');

    const postId = postRes.body.data._id;

    const res = await api
      .post(`/api/likes/${postId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});