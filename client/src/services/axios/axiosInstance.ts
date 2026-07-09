import axios from 'axios';
import env from '@/lib/env';

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true,
});

// ================================
// Response Interceptor
// Handle Unauthorized
// ================================

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/login';
    //   }
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
