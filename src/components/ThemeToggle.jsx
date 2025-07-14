// ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
        aria-label="Toggle dark mode"
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
}
