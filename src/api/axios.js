import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://your-backend-service.onrender.com' 
    : 'http://localhost:5000',
  withCredentials: true // ⚡ MUST BE TRUE
});

export default API;
export const deleteMovie = async (movieId) => {
const response = await API.delete(`/movies/${movieId}`);
return response.data;
};

export default API;