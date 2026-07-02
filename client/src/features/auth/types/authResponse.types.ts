import type { User } from '@/types/user.types';


export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
