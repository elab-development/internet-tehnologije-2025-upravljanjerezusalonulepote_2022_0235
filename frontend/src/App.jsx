import { BrowserRouter as Router, Routes, Route, useNavigate , Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Booking from './pages/Booking/Booking';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import Loader from './components/Loader';
import Profile from './pages/Profile/Profile';

function AppContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

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
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<EmployeeDashboard />} />
        <Route 
          path="/booking" 
          element={
            userRole === "MAKEUP_ARTIST" ? <EmployeeDashboard /> : <Booking />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
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
