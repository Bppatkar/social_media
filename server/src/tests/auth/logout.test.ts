import { api } from '../testServer.js';

describe('Auth - Logout API', () => {
  it('should logout successfully', async () => {
    const email = `logout_${Date.now()}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'logoutuser',
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

    const logoutRes = await api.post('/api/auth/logout').set('Cookie', cookies);

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);
  });
});
