import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/about'; 
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './components/addMovie'; 
import Forum from './pages/forum';

function App() {
  const location = useLocation();

  return (
    <div id="app-container">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-movie" element={<AddMovie />} /> 
            <Route path="/forum/:movieId" element={<Forum />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;