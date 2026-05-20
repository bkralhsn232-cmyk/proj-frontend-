import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Forum = () => {
  const { movieId } = useParams(); // Grabs the ID from the URL path automatically
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Fallbacks—adjust these depending on how your app stores auth details locally
  const currentUsername = localStorage.getItem('username') || 'Anonymous'; 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://proj-vpn5.onrender.com/api/comments/${movieId}`);
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching discussion history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `https://proj-vpn5.onrender.com/api/comments/${movieId}`,
        { text: newComment, username: currentUsername },
        { withCredentials: true } // Keeps your session cookies linked perfectly
      );
      setComments([response.data, ...comments]); // Instantly push the new message to the top of the feed
      setNewComment('');
    } catch (err) {
      alert("You must be logged in to post in the forum.");
    }
  };

  if (loading) return <div style={{ padding: '20px', color: '#fff' }}>Loading forum discussion...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <Link to="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Back to Catalog</Link>
      
      <h2 style={{ marginTop: '20px' }}>Movie Discussion Board</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', marginTop: '20px' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '6px', color: '#000' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          Post Comment
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#a0aec0' }}>No comments posted yet. Start the conversation!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} style={{ background: '#2d3748', padding: '15px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong style={{ color: '#ed64a6' }}>@{comment.username}</strong>
                <small style={{ color: '#a0aec0' }}>{new Date(comment.createdAt).toLocaleDateString()}</small>
              </div>
              <p style={{ margin: 0, lineHeight: '1.5' }}>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;