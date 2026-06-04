import { api } from '../testServer.js';

describe('Delete Post API', () => {
  it('should delete post successfully', async () => {
    const uniqueId = Date.now().toString().slice(-6);

    const email = `delete${uniqueId}@gmail.com`;

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
      throw new Error('Login failed, no cookies set');
    }

    const createRes = await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'delete me');

    const postId = createRes.body.data._id;

    const deleteRes = await api
      .delete(`/api/posts/${postId}`)
      .set('Cookie', cookies);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);
  });
});
