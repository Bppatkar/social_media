import { api } from '../testServer.js';

describe('Create Comment API', () => {
  it('should create comment successfully', async () => {
    const uniqueId = Date.now();

    const email = `comment${uniqueId}@gmail.com`;

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
    if (!cookies) {
      throw new Error('No cookies set after login');
    }

    const postRes = await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'Post for comments');

    const postId = postRes.body.data._id;

    const commentRes = await api
      .post(`/api/comments/${postId}`)
      .set('Cookie', cookies)
      .send({
        content: 'My first comment',
      });

    expect(commentRes.status).toBe(201);
    expect(commentRes.body.success).toBe(true);
  });
});