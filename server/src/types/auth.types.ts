export interface JwtUserPayload {
  userId: string;
  username: string;
  role: 'user' | 'admin';
}
