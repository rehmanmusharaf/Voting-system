import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
const STYLES = ["btn--primary", "btn--outline", "btn--test"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={to} className="btn-mobile  ">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        style={{
          padding: "10px 15px",
          width: "auto",
          margin: "0px 5px",
          // borderRadius: "10px",
        }}
      >
        {children}
      </button>
    </Link>
  );
};
