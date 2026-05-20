import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // 🚀 Ensure this matches your file case exactly
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './components/addMovie'; // 🚀 Double check if 'addMovie' is lowercase or uppercase in your folder!

function App() {
  return (
    <div>
      {/* The Navbar stays visible at the top of every single page */}
      <Navbar />

      {/* This view-port switches dynamically based on the URL path */}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 🚀 FIXED: Changed <addMovie /> to capitalized <AddMovie /> */}
          <Route path="/add-movie" element={<AddMovie />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;