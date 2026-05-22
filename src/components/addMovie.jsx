import { useState } from "react";
import { motion } from 'framer-motion';
import API from "../api/axios"; 

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    director: "",
    releaseYear: "",
    rating: "",
    imageUrl: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await API.post("./api/movies", formData); 
      setMessage(`Successfully added "${response.data.title}"!`);
      setFormData({
        title: "",
        genre: "",
        director: "",
        releaseYear: "",
        rating: "",
        imageUrl: "",
        description: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add movie. Are you logged in?");
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Add a New Movie</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input type="text" name="title" placeholder="Movie Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
          <input type="text" name="director" placeholder="Director" value={formData.director} onChange={handleChange} />
          <input type="number" name="releaseYear" placeholder="Release Year" value={formData.releaseYear} onChange={handleChange} />
          <input type="number" name="rating" placeholder="Rating (1-10)" min="1" max="10" value={formData.rating} onChange={handleChange} />
          <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          
          <button type="submit" style={{ padding: "10px", background: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Add Movie
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddMovie;