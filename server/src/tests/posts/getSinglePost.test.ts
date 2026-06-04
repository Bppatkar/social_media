import { api } from '../testServer.js';

describe('Get Single Post API', () => {
  it('should get a single post successfully', async () => {
    const uniqueId = Date.now().toString().slice(-6);

    const email = `single${uniqueId}@gmail.com`;

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
      .field('content', 'single post test');

    expect(createRes.status).toBe(201);

    const postId = createRes.body.data._id;

    const getRes = await api
      .get(`/api/posts/${postId}`)
      .set('Cookie', cookies);

    expect(getRes.status).toBe(200);
    expect(getRes.body.success).toBe(true);
  });
});