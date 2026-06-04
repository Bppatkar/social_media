import { api } from '../testServer.js';

describe('Likes Negative Tests', () => {
  it('should fail like without auth', async () => {
    const res = await api.post(
      '/api/likes/507f1f77bcf86cd799439011'
    );

    expect(res.status).toBe(401);
  });
});