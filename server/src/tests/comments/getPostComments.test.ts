import { api } from '../testServer.js';

describe('Get Post Comments API', () => {
  it('should fetch comments successfully', async () => {
    const uniqueId = Date.now();

    const email = `getcomments${uniqueId}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: `user${uniqueId}`,
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
      .field('content', 'Post');

    const postId = postRes.body.data._id;

    await api
      .post(`/api/comments/${postId}`)
      .set('Cookie', cookies)
      .send({
        content: 'Comment 1',
      });

    const res = await api
      .get(`/api/comments/${postId}`)
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});