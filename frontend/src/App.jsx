import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Register from "./pages/Register/Register";
import About from "./pages/About/About";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';



function App() {

  return (
    <div className='App'>
      <Router>      
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>

        

      </Router>
    </div>
  )
}

export default App;
