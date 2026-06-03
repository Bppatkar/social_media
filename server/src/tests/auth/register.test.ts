import { api } from '../testServer.js';

describe('Auth - Register API', () => {

  it('should register a new user successfully', async () => {
    const res = await api.post('/api/auth/register').send({
      username: 'bhanu',
      email: 'bhanu@gmail.com',
      password: '123456',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('user');
  });

  it('should fail if email already exists', async () => {
    await api.post('/api/auth/register').send({
      username: 'testuser1',
      email: 'dup@example.com',
      password: 'Test@1234',
    });

    const res = await api.post('/api/auth/register').send({
      username: 'testuser2',
      email: 'dup@example.com',
      password: 'Test@1234',
    });

    expect(res.status).toBe(400);
  });

});