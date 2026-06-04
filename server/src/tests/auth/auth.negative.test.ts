import { api } from '../testServer.js';

describe('Auth Negative Tests', () => {
  it('should fail login with wrong password', async () => {
    const email = `wrongpass${Date.now()}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'user1',
      email,
      password: '123456',
    });

    const res = await api.post('/api/auth/login').send({
      email,
      password: 'wrongpassword',
    });

    expect(res.status).toBe(400);
  });

  it('should fail register with duplicate email', async () => {
    const email = `duplicate${Date.now()}@gmail.com`;

    await api.post('/api/auth/register').send({
      username: 'user1',
      email,
      password: '123456',
    });

    const res = await api.post('/api/auth/register').send({
      username: 'user2',
      email,
      password: '123456',
    });

    expect(res.status).toBe(400);
  });
});