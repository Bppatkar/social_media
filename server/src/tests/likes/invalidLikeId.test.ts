import { api } from '../testServer.js';

describe('Invalid Like PostId', () => {
  it('should fail for invalid postId', async () => {
    const res = await api.post('/api/likes/abc');

    expect(res.status).toBe(401);
  });
});