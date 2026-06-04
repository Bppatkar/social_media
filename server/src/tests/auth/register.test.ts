import { api } from '../testServer.js';

describe('Auth - Register API', () => {
  it('should register a new user successfully', async () => {
    const uniqueId = Date.now().toString().slice(-6);

    const username = `user${uniqueId}`;
    const email = `user${uniqueId}@gmail.com`;

    const registerRes = await api.post('/api/auth/register').send({
      username,
      email,
      password: '123456',
    });

    console.log(registerRes.body);

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.success).toBe(true);
    expect(registerRes.body.data).toHaveProperty('user');
  });

  it('should fail if email already exists', async () => {
    await api.post('/api/auth/register').send({
      username: 'testuser1',
      email: 'dup@example.com',
      password: 'Test@1234',
    });

    const registerRes = await api.post('/api/auth/register').send({
      username: 'testuser2',
      email: 'dup@example.com',
      password: 'Test@1234',
    });

    expect(registerRes.status).toBe(400);
  });
});
