import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './components/addMovie'; 
import Forum from './pages/forum';
import About from './pages/about';
function App() {
  return (
    <div id="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-movie" element={<AddMovie />} /> 
          <Route path="/forum/:movieId" element={<Forum />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;