import axios from 'axios';

const API = axios.create({
  baseURL: 'https://proj-vpn5.onrender.com',
  withCredentials: true // 🚀 This is the critical setting that forces cookies to travel with requests
});

export const deleteMovie = async (movieId) => {
  const response = await API.delete(`/api/movies/${movieId}`);
  return response.data;
};

export default API;