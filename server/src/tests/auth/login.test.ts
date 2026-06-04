import { api } from '../testServer.js';

describe('Auth - Login API', () => {

  it('should login user successfully', async () => {

    const email = `test_${Date.now()}@gmail.com`;

    // 1. register fresh user
    await api.post('/api/auth/register').send({
      username: 'loginuser',
      email,
      password: '123456',
    });

    // 2. login same user
    const res = await api.post('/api/auth/login').send({
      email,
      password: '123456',
    });

    console.log(res.body); // (optional debug)

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

});