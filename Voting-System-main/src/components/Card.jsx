import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ title, description, button_text, path }) {
  return (
    <div className="card-container">
      <div className="card">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={path} className="button">
          {button_text}
        </Link>
      </div>
    </div>
  );
}

export default Card;
