import type { User } from '@/types/user.types';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
