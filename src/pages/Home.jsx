import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    API.get('/api/movies')
      .then((response) => {
        const movieData = Array.isArray(response.data) ? response.data : response.data.movies || [];
        setMovies(movieData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load movies from the live server.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleDelete = async (movieId, movieTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${movieTitle}"?`)) return;
    try {
      await API.delete(`/api/movies/${movieId}`); 
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete the movie.');
      console.error(err);
    }
  };

  const startEditing = (movie) => {
    setEditingId(movie._id);
    setEditFormData({ ...movie });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (movieId) => {
    try {
      const response = await API.put(`/api/movies/${movieId}`, editFormData);
      setMovies(movies.map((movie) => movie._id === movieId ? response.data : movie));
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update movie.');
      console.error(err);
    }
  };

  const uniqueGenres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>🎬 Loading movie catalog...</h2>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>🍿 Explore Movies</h1>
        <span style={{ background: '#e0e0e0', padding: '5px 12px', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold' }}>
          Total Database Items: {movies.length}
        </span>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '30px', 
        background: '#f7fafc', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        flexWrap: 'wrap'
      }}>
        <input 
          type="text"
          placeholder="🔍 Search movies by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '2',
            minWidth: '250px',
            padding: '10px 15px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '15px'
          }}
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            flex: '1',
            minWidth: '150px',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            backgroundColor: '#fff',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          <option value="">🎬 All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#eee', marginBottom: '30px' }} />

      {movies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
          <h3>Your movie database is empty!</h3>
          <p style={{ color: '#666' }}>Go add a title to get started.</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
          <h3>No records found matching your search filters.</h3>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedGenre(''); }}
            style={{ marginTop: '10px', padding: '6px 12px', background: '#edf2f7', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '25px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {filteredMovies.map((movie) => {
            const isEditing = editingId === movie._id;

            return (
              <div 
                key={movie._id} 
                style={{ 
                  border: '1px solid #e0e0e0', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="text" 
                      name="title" 
                      value={editFormData.title || ''} 
                      onChange={handleEditChange}
                      style={{ padding: '6px', fontSize: '15px', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}
                    />
                    <input 
                      type="text" 
                      name="genre" 
                      value={editFormData.genre || ''} 
                      onChange={handleEditChange}
                      placeholder="Genre"
                      style={{ padding: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                    />
                    <input 
                      type="text" 
                      name="imageUrl" 
                      value={editFormData.imageUrl || ''} 
                      onChange={handleEditChange}
                      placeholder="Image URL"
                      style={{ padding: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                    />
                    <input 
                      type="number" 
                      name="rating" 
                      min="0"
                      max="10"
                      step="0.1"
                      value={editFormData.rating || ''} 
                      onChange={handleEditChange}
                      placeholder="Rating (0-10)"
                      style={{ padding: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                    />
                    <textarea 
                      name="description" 
                      rows="4"
                      value={editFormData.description || ''} 
                      onChange={handleEditChange}
                      style={{ padding: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>{movie.title}</h3>
                    <span style={{ background: '#f0f3ff', color: '#2b6cb0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      {movie.genre || 'Uncategorized'}
                    </span>

                    {movie.imageUrl && (
                      <div style={{ marginTop: '15px', width: '100%', textAlign: 'center' }}>
                        <img 
                          src={movie.imageUrl} 
                          alt={`${movie.title} poster`} 
                          style={{ 
                            width: '100%', 
                            maxHeight: '320px', 
                            objectFit: 'contain', 
                            borderRadius: '6px',
                            backgroundColor: '#f7fafc'
                          }} 
                        />
                      </div>
                    )}

                    <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: '1.5', marginTop: '15px' }}>
                      {movie.description || 'No description provided for this title.'}
                    </p>
                  </div>
                )}
                
                <div>
                  {!isEditing && movie.rating && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: '#718096' }}>Rating:</span>
                      <strong style={{ color: '#d69e2e' }}>⭐ {movie.rating} / 10</strong>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleUpdate(movie._id)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#48bb78',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#a0aec0',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(movie)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#fff',
                            color: '#4a5568',
                            border: '1px solid #cbd5e0',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id, movie.title)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#fff',
                            color: '#e53e3e',
                            border: '1px solid #fed7d7',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}