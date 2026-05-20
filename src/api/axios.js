import axios from 'axios';

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api' || 'https://proj-vpn5.onrender.com',
    withCredentials: true
});

export const deleteMovie = async (movieId) => {
const response = await API.delete(`/movies/${movieId}`);
return response.data;
};

export default API;