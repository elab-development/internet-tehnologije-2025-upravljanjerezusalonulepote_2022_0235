import React, { useState, useRef, useEffect } from 'react';
import slatkica from '../assets/slatkica.png';
import {Link} from "react-router-dom"
import '../styles/navbar.css';
import { IoReorderFour, IoCloseOutline } from "react-icons/io5";




export default function Navbar() {

    const [openLinks, setOpenLinks] = useState(false);
    const menuRef = useRef(null);

    const toggleNavbar = ()=>{
        setOpenLinks((prev)=> !prev);
    };

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(
                openLinks && menuRef.current && !menuRef.current.contains(e.target)
            ){
                setOpenLinks(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openLinks]);

    useEffect(() => {
    const handleResize = () => {
    if (window.innerWidth > 600) {
      setOpenLinks(false);
    }
     };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="navbar">
            <div className="levaStrana" id={openLinks ? 'open':'close'}>
                <img src={slatkica} alt="logo" />

                <div className="hiddenLinks" ref={menuRef}>
               <Link to="/" onClick={() => setOpenLinks(false)}>Home</Link>
                <Link to="/register" onClick={() => setOpenLinks(false)}>Register</Link>
                <Link to="/login" onClick={() => setOpenLinks(false)}>Login</Link>
                <Link to="/about" onClick={() => setOpenLinks(false)}>O nama</Link>
            </div>

            </div>
            <div className="desnaStrana">
                {!openLinks && (
                <>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/about">O nama</Link>
                </>
                )}
                <button onClick={toggleNavbar}>
                    {openLinks ? <IoCloseOutline /> : <IoReorderFour />}
                </button>
            </div>
        </div>
    )
}