import { api } from '../testServer.js';

describe('Delete Comment API', () => {
  it('should delete comment successfully', async () => {
    const uniqueId = Date.now();

    const email = `deletecomment${uniqueId}@gmail.com`;

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
        content: 'Delete Me',
      });

    const commentId = commentRes.body.data._id;

    const deleteRes = await api
      .delete(`/api/comments/${commentId}`)
      .set('Cookie', cookies);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);
  });
});