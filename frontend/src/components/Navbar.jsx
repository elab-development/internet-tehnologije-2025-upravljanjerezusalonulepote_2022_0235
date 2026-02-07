import { useState, useEffect, useRef } from "react";
import slatkica from '../assets/slatkica.png';
import '../styles/navbar.css';
import { IoReorderFour, IoCloseOutline } from "react-icons/io5";

export default function Navbar({ triggerTransition }) {
  const [openLinks, setOpenLinks] = useState(false);
  const menuRef = useRef(null);

  const toggleNavbar = () => setOpenLinks(prev => !prev);

  const handleNavClick = (path) => {
    setOpenLinks(false);
    if (triggerTransition) triggerTransition(path);
  };

  const handleLogoClick = () => handleNavClick("/");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openLinks && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenLinks(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openLinks]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) setOpenLinks(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="levaStrana" id={openLinks ? "open" : "close"}>
        <img
          src={slatkica}
          alt="logo"
          className="cursor-pointer logo"
          onClick={handleLogoClick}
        />
        <div className="hiddenLinks" ref={menuRef}>
          <a onClick={() => handleNavClick("/")}>Home</a>
          <a onClick={() => handleNavClick("/register")}>Register</a>
          <a onClick={() => handleNavClick("/login")}>Login</a>
          <a onClick={() => handleNavClick("/about")}>O nama</a>
        </div>
      </div>

      <div className="desnaStrana">
        <a onClick={() => handleNavClick("/")}>Home</a>
        <a onClick={() => handleNavClick("/register")}>Register</a>
        <a onClick={() => handleNavClick("/login")}>Login</a>
        <a onClick={() => handleNavClick("/about")}>O nama</a>

        <button className="menu-toggle" onClick={toggleNavbar}>
          {openLinks ? <IoCloseOutline /> : <IoReorderFour />}
        </button>
      </div>
    </nav>
  );
}
