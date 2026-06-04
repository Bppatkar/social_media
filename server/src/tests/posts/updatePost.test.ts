import { api } from '../testServer.js';

describe('Update Post API', () => {
  it('should update post successfully', async () => {
    const uniqueId = Date.now().toString().slice(-6);

    const email = `update${uniqueId}@gmail.com`;

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
      throw new Error('Login failed, no cookies set');
    }

    const createRes = await api
      .post('/api/posts/create')
      .set('Cookie', cookies)
      .field('content', 'old content');

    const postId = createRes.body.data._id;

    const updateRes = await api
      .put(`/api/posts/${postId}`)
      .set('Cookie', cookies)
      .field('content', 'updated content');

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);
  });
});