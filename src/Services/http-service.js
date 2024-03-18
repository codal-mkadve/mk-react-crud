import axios from 'axios';
import environment from '../environment';

const http = axios.create({
  baseURL: environment.baseURL,
});

// Add a request interceptor to include the token in every request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AUTH_TOKEN'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
