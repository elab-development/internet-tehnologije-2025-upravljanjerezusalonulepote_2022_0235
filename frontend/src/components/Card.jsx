import React from "react";
import "../styles/card.css";

function Card({ title, description, image }) {
  return (
    <div className="glass-card">
      <div
        className="glass-card-img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="glass-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;