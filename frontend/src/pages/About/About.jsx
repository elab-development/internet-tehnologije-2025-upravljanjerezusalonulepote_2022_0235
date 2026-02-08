import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>O nama💖</h1>
        <p>Slatkica – platforma koja povezuje korisnike i beauty salone.</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h3>Naša misija</h3>
          <p>
            Želimo da pronađete savršen salon brzo, jednostavno i bez stresa.
          </p>
        </div>

        <div className="about-card">
          <h3>Naša vizija</h3>
          <p>
            Digitalizacija beauty industrije i bolje iskustvo za korisnike.
          </p>
        </div>

        <div className="about-card">
          <h3>Zašto Slatkica?</h3>
          <p>
            Moderan dizajn, jednostavna rezervacija i personalizovane preporuke.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;