// src/components/Header.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

export default function Header() {
  return (
    <header className="custom-navbar">
      <div className="navbar-left">
        <span className="navbar-logo">My Portfolio</span>
      </div>
      <nav className="navbar-center">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="navbar-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
