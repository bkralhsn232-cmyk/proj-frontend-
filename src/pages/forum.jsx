import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const Forum = () => {
  const { movieId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const currentUsername = localStorage.getItem('username') || 'Anonymous'; 
  const currentUserRole = (localStorage.getItem('role') || 'user').toLowerCase().trim(); 
  const currentUserId = (localStorage.getItem('userId') || '').trim(); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://proj-vpn5.onrender.com/api/comments/${movieId}`,
          { withCredentials: true }
        );
        setComments(response.data);
      } catch (err) {
        console.error(err);
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
        { withCredentials: true }
      );
      setComments([response.data, ...comments]); 
      setNewComment('');
    } catch (err) {
      alert("You must be logged in to post in the forum.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(
        `https://proj-vpn5.onrender.com/api/comments/${commentId}`,
        { withCredentials: true }
      );
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment.");
    }
  };

  if (loading) return <div style={{ padding: '20px', color: '#fff' }}>Loading forum discussion...</div>;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
        <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← Back to Catalog</Link>
        
        <h2 style={{ marginTop: '20px' }}>Movie Discussion Board</h2>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '30px', marginTop: '20px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            style={{ 
              width: '100%', 
              height: '80px', 
              padding: '10px', 
              borderRadius: '6px', 
              backgroundColor: 'var(--code-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-h)', 
              fontFamily: 'sans-serif'
            }}
          />
          <button 
            type="submit" 
            className="btn-primary"
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              cursor: 'pointer',
              background: 'var(--code-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-h)',
              borderRadius: '6px'
            }}
          >
            Post Comment
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {comments.length === 0 ? (
            <p style={{ color: '#a0aec0' }}>No comments posted yet. Start the conversation!</p>
          ) : (
            comments.map((comment) => {
              const canDelete = comment.userId === currentUserId || currentUserRole === 'admin';

              return (
                <div key={comment._id} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong style={{ color: 'var(--accent)' }}>@{comment.username}</strong>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <small style={{ color: '#a0aec0' }}>{new Date(comment.createdAt).toLocaleDateString()}</small>
                      {canDelete && (
                        <button 
                          onClick={() => handleDeleteComment(comment._id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff4d4d',
                            cursor: 'pointer',
                            fontSize: '13px',
                            padding: '0 5px',
                            fontWeight: 'bold'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p style={{ margin: 0, lineHeight: '1.5', color: 'var(--text-h)' }}>{comment.text}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Forum;