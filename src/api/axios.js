import axios from 'axios';

const API = axios.create({
  baseURL: 'https://proj-vpn5.onrender.com',
  withCredentials: true
});

export const deleteMovie = async (movieId) => {
  const response = await API.delete(`/api/movies/${movieId}`);
  return response.data;
};

export default API;