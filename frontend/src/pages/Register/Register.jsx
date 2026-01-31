import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Registracija ✨</h2>

        <div className="register-inputs">
          <input type="text" placeholder="Ime i prezime" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Lozinka" />
          <input type="password" placeholder="Potvrdi lozinku" />
        </div>

        <button className="register-btn">Napravi nalog</button>

        <p className="register-login-link">
          Već imate nalog? <Link to="/login">Prijavite se</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;