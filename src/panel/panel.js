import React from "react";
import "./panel.css";

const Panel = () => {
  return (
    <div className="panel-container">
      <h1
        style={{
          color: "#fff",
          fontFamily: "'Pacifico', cursive",
          fontSize: "2.8rem",
          marginBottom: "1.2rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
        }}
      >
        ✨ Turn Your Selfie into functions! ✨
      </h1>
      <img alt="Before" src="/Demo1.png" />
      <img alt="After" src="/Demo2.png" />
    </div>
  );
};

export default Panel;
