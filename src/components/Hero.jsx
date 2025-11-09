import React, { useEffect, useState } from "react";
import profilePic from "../assets/profile.png";
import "./Hero.css";

export default function Hero() {
  const roles = ["Software Engineer", "MSc Student", "Researcher", "Developer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const speed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && text.length < current.length) {
        setText(current.substring(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(current.substring(0, text.length - 1));
      } else if (!isDeleting && text.length === current.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, roles]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-card">
        {/* Text */}
        <div className="hero-text">
          <p className="intro">Hi there,</p>
          <p className="intro">I'm</p>
          <h1>
            <strong>Navneet Kishan Srinivasan</strong>
          </h1>
          <p className="subtitle">
            <span className="typed-text">{text}</span>
            <span className="cursor">|</span>
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
          <a href="https://github.com/NavneetKishanS" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
              alt="GitHub"
            />
          </a>
          <a href="https://www.linkedin.com/in/navneet-kishan-s/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>
          <a href="https://www.kaggle.com/navneetkishans" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kaggle.svg"
              alt="Kaggle"
            />
          </a>
          <a href="https://www.researchgate.net/profile/Navneet-Kishan-Srinivasan" target="_blank" rel="noopener noreferrer">
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
