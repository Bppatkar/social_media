import type { User } from '@/types/user.types';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface AuthResponse {
  user: User;
}
