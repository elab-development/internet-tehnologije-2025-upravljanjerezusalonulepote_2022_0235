import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/slatkica.png";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar({ triggerTransition }) {
  const [openLinks, setOpenLinks] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const toggleNavbar = () => setOpenLinks(!openLinks);

  const handleNavClick = (path) => {
    setOpenLinks(false); // Zatvori meni ako je mobilni

    if (triggerTransition) {
      triggerTransition(path); 
      setTimeout(() => {
        navigate(path);
      }, 300);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="navbar">
      <div className="levaStrana" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="logo" onClick={() => handleNavClick("/")} />

        <div className="hiddenLinks">
          <Link onClick={() => handleNavClick("/")}>Home</Link>
          <Link onClick={() => handleNavClick("/about")}>About</Link>

          {!user && (
            <>
              <Link onClick={() => handleNavClick("/login")}>Login</Link>
              <Link onClick={() => handleNavClick("/register")}>Register</Link>
            </>
          )}

          {user && (
            <>
              {user.role === "MAKEUP_ARTIST" && (
                <Link onClick={() => handleNavClick("/dashboard")}>Moj Raspored</Link>
              )}
              {user.role === "CLIENT" && (
                <Link onClick={() => handleNavClick("/booking")}>Rezerviši</Link>
              )}
              {user.role === "ADMIN" && (
                <Link onClick={() => handleNavClick("/dashboard")}>Admin Panel</Link>
              )}
              <Link onClick={() => handleNavClick("/profile")} className="nav-user cursor-pointer">
                <FaUserCircle style={{ marginRight: "5px" }} />
                {user.name}
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="desnaStrana">
        <Link onClick={() => handleNavClick("/")}>Home</Link>
        <Link onClick={() => handleNavClick("/about")}>About</Link>

        {!user && (
          <>
            <Link onClick={() => handleNavClick("/login")}>Login</Link>
            <Link onClick={() => handleNavClick("/register")}>Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "MAKEUP_ARTIST" && (
              <Link onClick={() => handleNavClick("/dashboard")}>Moj Raspored</Link>
            )}
            {user.role === "CLIENT" && (
              <Link onClick={() => handleNavClick("/booking")}>Rezerviši</Link>
            )}
            {user.role === "ADMIN" && (
              <Link onClick={() => handleNavClick("/dashboard")}>Admin Panel</Link>
            )}
            <div 
                onClick={() => handleNavClick("/profile")} 
                className="nav-user cursor-pointer"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
  <FaUserCircle style={{ marginRight: "5px" }} />
  {user.name}
</div>
          </>
        )}

        <button onClick={toggleNavbar}>
          <FaBars />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
