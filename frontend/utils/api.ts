import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Updated to match backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
