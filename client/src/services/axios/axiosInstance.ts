import axios from 'axios';
import env from '@/lib/env';
import { authStorage } from '@/features/auth/authStorage';

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================================
// Request Interceptor
// Automatically attach JWT
// ================================

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================================
// Response Interceptor
// Handle Unauthorized
// ================================

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.removeToken();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
