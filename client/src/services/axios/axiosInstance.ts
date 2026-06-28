import axios from 'axios';
import env from '@/lib/env';

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
