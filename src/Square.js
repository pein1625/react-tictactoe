import React from "react";

const Square = ({ value, onClick, highLight }) => (
  <button
    className="square"
    onClick={onClick}
    style={{
      color: highLight ? "red" : "#666"
    }}
  >
    {value}
  </button>
);

export default Square;
