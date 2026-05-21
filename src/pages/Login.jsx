import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import API from '../api/axios';

export default function Login() {
  const { login } = useContext(AuthContext); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await API.post('/api/auth/login', formData);
      
      const { user, token } = response.data; 
      
      localStorage.setItem('isLoggedIn', 'true');
      if (token) {
        localStorage.setItem('token', token);
      }

      if (user) {
        localStorage.setItem('role', user.role || 'user');
        localStorage.setItem('username', user.username || 'Anonymous');
        localStorage.setItem('userId', user._id || user.id || '');
      }
      
      login(user, token); 
      
      setMessage('🎉 Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>🔐 Account Login</h2>
      {message && <p style={{ fontWeight: 'bold', color: message.startsWith('🎉') ? 'green' : 'red' }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Log In
        </button>
      </form>
    </div>
  );
}