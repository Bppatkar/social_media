import { api } from '../testServer.js';

it('should create a new post successfully', async () => {
  const uniqueId = Date.now().toString().slice(-6);

  const username = `user${uniqueId}`;
  const email = `user${uniqueId}@gmail.com`;

  const registerRes = await api.post('/api/auth/register').send({
    username,
    email,
    password: '123456',
  });

  expect(registerRes.status).toBe(201);

  const loginRes = await api.post('/api/auth/login').send({
    email,
    password: '123456',
  });

  expect(loginRes.status).toBe(200);

  const cookies = loginRes.headers['set-cookie'];

  expect(cookies).toBeDefined();

  const postRes = await api
    .post('/api/posts/create')
    .set('Cookie', cookies!)
    .field('content', 'my first test post');

  expect(postRes.status).toBe(201);
  expect(postRes.body.success).toBe(true);
});
