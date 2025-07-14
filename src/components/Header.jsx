import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: "1px solid var(--card-bg)"
      }}
    >
      <h1 style={{ fontSize: "1.4rem" }}>My Portfolio</h1>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
