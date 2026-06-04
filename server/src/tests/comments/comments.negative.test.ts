import { api } from '../testServer.js';

describe('Comments Negative Tests', () => {
  it('should fail comment without auth', async () => {
    const res = await api
      .post('/api/comments/507f1f77bcf86cd799439011')
      .send({
        content: 'Test',
      });

    expect(res.status).toBe(401);
  });
});