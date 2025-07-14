import React from "react";
import profilePic from "../assets/dp.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-card">
        {/* Text */}
        <div className="hero-text">
          <p className="intro">Hi there,</p>
          <h1>
            I’m <strong>John Doe</strong>
          </h1>
          <p className="subtitle">
            Software Engineer,<br />
            MSc Student,<br />
            etc
          </p>
          <div className="hero-buttons">
            <button className="primary">Resume/CV</button>
            <button className="secondary">Contact</button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="hero-image">
          <img src={profilePic} alt="Profile" />
        </div>

        {/* Vertical Social Icons */}
        <div className="hero-icons-vertical">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
              alt="GitHub"
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>
          <a href="https://kaggle.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kaggle.svg"
              alt="Kaggle"
            />
          </a>
          <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/researchgate.svg"
              alt="ResearchGate"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
