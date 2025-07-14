import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "1px solid var(--accent-color)",
        borderRadius: "20px",
        padding: "5px 12px",
        cursor: "pointer",
        color: "var(--text-color)"
      }}
    >
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
