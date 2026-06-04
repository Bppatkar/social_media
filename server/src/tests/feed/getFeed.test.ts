import { api } from '../testServer.js';

describe('Feed - Get Feed API', () => {
  it('should fetch feed successfully', async () => {
    const id = Date.now();
    const user1Email = `user1${id}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'user1',
      email: user1Email,
      password: '123456',
    });

    const loginRes = await api.post('/api/auth/login').send({
      email: user1Email,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      throw new Error('No cookies set after login');
    }

    const res = await api
      .get('/api/feed')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
