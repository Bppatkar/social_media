import { api } from '../testServer.js';

describe('Update Comment API', () => {
  it('should update comment successfully', async () => {
    const uniqueId = Date.now();

    const email = `updatecomment${uniqueId}@gmail.com`;

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
      .field('content', 'Post');

    const commentRes = await api
      .post(`/api/comments/${postRes.body.data._id}`)
      .set('Cookie', cookies)
      .send({
        content: 'Old Comment',
      });

    const commentId = commentRes.body.data._id;

    const updateRes = await api
      .patch(`/api/comments/${commentId}`)
      .set('Cookie', cookies)
      .send({
        content: 'Updated Comment',
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);
  });
});
