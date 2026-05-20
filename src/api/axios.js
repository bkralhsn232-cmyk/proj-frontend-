import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://proj-vpn5.onrender.com' 
    : 'http://localhost:5000',
  withCredentials: true // ⚡ MUST BE TRUE
});


export const deleteMovie = async (movieId) => {
const response = await API.delete(`/movies/${movieId}`);
return response.data;
};

export default API;