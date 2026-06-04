import { api } from '../testServer.js';

describe('Auth - Refresh API', () => {
  it('should refresh access token successfully', async () => {
    const email = `refresh_${Date.now()}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'refreshuser',
      email,
      password: '123456',
    });

    const loginRes = await api.post('/api/auth/login').send({
      email,
      password: '123456',
    });

    const cookies = loginRes.headers['set-cookie'];

    expect(cookies).toBeDefined();
    if (!cookies) {
      throw new Error('Missing set-cookie header');
    }

    const refreshRes = await api
      .post('/api/auth/refresh')
      .set('Cookie', cookies);

    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.success).toBe(true);
  });
});
