import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'; // 🚀 Ensure this matches your file case exactly
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './components/addMovie'; // 🚀 Double check if 'addMovie' is lowercase or uppercase in your folder!

function App() {
  return (
    <div>
      <navbar />

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-movie" element={<AddMovie />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;