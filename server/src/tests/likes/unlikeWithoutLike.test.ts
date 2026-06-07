import { api } from '../testServer.js';

describe('Unlike Without Like', () => {
  it('should fail if post is not liked', async () => {
    const id = Date.now();

    const email = `nolike${id}@gmail.com`;

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
    if(!cookies) {
      throw new Error('No cookies set after login');
    }

    const postRes = await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'Test');

    const postId = postRes.body.data._id;

    const res = await api
      .delete(`/api/likes/${postId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(400);
  });
});