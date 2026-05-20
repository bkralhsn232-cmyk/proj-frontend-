import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'; // 🚀 FIXED: Changed 'Navbar' back to lowercase 'navbar'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './components/addMovie'; 
import Forum from './pages/forum.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-movie" element={<AddMovie />} /> 
          <Route path="/forum/:movieId" element={<Forum />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;