import { api } from '../testServer.js';

describe('Already Liked Post', () => {
  it('should fail when liking same post twice', async () => {
    const id = Date.now();

    const email = `doublelike${id}@gmail.com`;

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
      .field('content', 'Like testing');

    const postId = postRes.body.data._id;

    await api
      .post(`/api/likes/${postId}`)
      .set('Cookie', cookies);

    const secondLike = await api
      .post(`/api/likes/${postId}`)
      .set('Cookie', cookies);

    expect(secondLike.status).toBe(400);
  });
});