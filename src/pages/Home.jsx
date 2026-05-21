import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-h)' }}>🎬 Loading movie catalog...</h2>;
  if (error) return <div style={{ maxWidth: '500px', margin: '50px auto' }} className="alert-error">{error}</div>;

  return (
    <div style={{ width: '100%', padding: '40px 24px', boxSizing: 'border-box', textAlign: 'left' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '38px' }}>Explore Movies</h1>
          <p style={{ color: 'var(--text)', fontSize: '15px' }}>Discover and discuss cinema uploads tracking through the community ecosystem.</p>
        </div>
        <span className="counter" style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', padding: '6px 14px', fontSize: '14px', fontWeight: '600' }}>
          Catalog Titles: {movies.length}
        </span>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '40px', 
        background: 'var(--code-bg)', 
        padding: '16px', 
        borderRadius: '8px',
        border: '1px solid var(--border)',
        flexWrap: 'wrap'
      }}>
        <input 
          type="text"
          placeholder="🔍 Search movies by title or synopsis text keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '2', minWidth: '250px' }}
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ flex: '1', minWidth: '160px' }}
        >
          <option value="">🎬 All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {movies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--code-bg)', borderRadius: '10px', border: '1px dashed var(--border)' }}>
          <h3 style={{ color: 'var(--text-h)', marginBottom: '8px' }}>Your movie collection database is empty!</h3>
          <p style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '15px' }}>Be the first to contribute an entry to our shared tracking catalog index.</p>
          <Link to="/add-movie" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>+ Add Custom Entry</Link>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--code-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text-h)', marginBottom: '4px' }}>No records found matching your active queries.</h3>
          <p style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '14px' }}>Try tuning your keywords or resetting the dynamic dropdown picker filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedGenre(''); }}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="movie-grid" style={{ padding: '0', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
          {filteredMovies.map((movie) => {
            const isEditing = editingId === movie._id;

            return (
              <div key={movie._id} className="movie-card">
                
                {isEditing ? (
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', boxSizing: 'border-box' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Editing Title Configuration</h3>
                    <input type="text" name="title" value={editFormData.title || ''} onChange={handleEditChange} placeholder="Movie Title" required />
                    <input type="text" name="genre" value={editFormData.genre || ''} onChange={handleEditChange} placeholder="Genre" required />
                    <input type="text" name="imageUrl" value={editFormData.imageUrl || ''} onChange={handleEditChange} placeholder="Poster Image Link" />
                    <input type="number" name="rating" min="0" max="10" step="0.1" value={editFormData.rating || ''} onChange={handleEditChange} placeholder="Rating Index (1-10)" required />
                    <textarea name="description" rows="4" value={editFormData.description || ''} onChange={handleEditChange} placeholder="Short plot synopsis description summary text..." />
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
                      <button onClick={() => handleUpdate(movie._id)} className="btn-primary" style={{ flex: 1, padding: '10px', background: '#32d74b', color: '#000' }}>💾 Save</button>
                      <button onClick={cancelEditing} className="btn-primary" style={{ flex: 1, padding: '10px', background: 'var(--border)', color: 'var(--text-h)' }}>❌ Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="movie-poster-wrap">
                      <Link to={`/forum/${movie._id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                        <img 
                          className="movie-poster" 
                          src={movie.imageUrl || "https://placehold.co/300x450?text=No+Poster+Available"} 
                          alt={`${movie.title} poster frame asset`} 
                        />
                      </Link>
                    </div>

                    <div className="movie-info">
                      <div className="movie-meta">
                        <span>{movie.genre || 'Uncategorized'}</span>
                        {movie.rating && <span className="movie-rating">★ {movie.rating}</span>}
                      </div>
                      
                      <h2 style={{ fontSize: '20px', margin: '4px 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {movie.title}
                      </h2>
                      
                      <p className="movie-desc" style={{ marginBottom: '16px' }}>
                        {movie.description || 'No custom log synopsis writeup details configured for this media item entry yet.'}
                      </p>

                      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                        <button
                          onClick={() => startEditing(movie)}
                          className="btn-primary"
                          style={{
                            flex: 1,
                            padding: '6px 12px',
                            fontSize: '13px',
                            background: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-h)'
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id, movie.title)}
                          className="btn-primary"
                          style={{
                            flex: 1,
                            padding: '6px 12px',
                            fontSize: '13px',
                            background: 'rgba(255, 69, 58, 0.1)',
                            border: '1px solid rgba(255, 69, 58, 0.3)',
                            color: '#ff453a'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}