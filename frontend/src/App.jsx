import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Loader from './components/Loader';

function AppContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const triggerTransition = (path) => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigate(path); 
    }, 1000); 
  };

  return (
    <>
      {loading && <Loader />} 
      <Navbar triggerTransition={triggerTransition} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
