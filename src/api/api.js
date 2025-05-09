import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',  // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, you can add an interceptor to handle token refresh or add any additional headers globally
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");  // or get from Zustand store
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
