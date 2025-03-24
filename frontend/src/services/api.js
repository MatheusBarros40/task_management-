import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message || 'Erro na requisição'));
  }
);

export default api;