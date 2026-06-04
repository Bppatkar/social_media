import { api } from '../testServer.js';

describe('Follow Negative Tests', () => {
  it('should fail follow without auth', async () => {
    const res = await api.post(
      '/api/follows/507f1f77bcf86cd799439011'
    );

    expect(res.status).toBe(401);
  });
});