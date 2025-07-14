// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "1px solid #ccc",
        borderRadius: "20px",
        padding: "6px 12px",
        cursor: "pointer",
        color: theme === "dark" ? "#fff" : "#333"
      }}
    >
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
