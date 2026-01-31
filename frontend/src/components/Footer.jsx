
import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Slatkica 💖</h2>
          <p>Beauty platform za moderne salone.</p>
        </div>

        <div className="footer-links">
          <h4>Linkovi</h4>
          <a href="/">Početna</a>
          <a href="/about">O nama</a>
          <a href="/login">Prijava</a>
          <a href="/register">Registracija</a>
        </div>

        <div className="footer-contact">
          <h4>Kontakt</h4>
          <p>📍 Beograd, Srbija</p>
          <p>📞 +381 60 123 456</p>
          <p>✉️ slatkica@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Slatkica. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;