import axios from 'axios';

const API = axios.create({
  baseURL: 'https://proj-vpn5.onrender.com',
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const deleteMovie = async (movieId) => {
  const response = await API.delete(`/movies/${movieId}`);
  return response.data;
};

export default API;