import React from "react";
import profilePic from "../assets/dp.jpg"; // adjust path based on location

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p>Hi there,</p>
          <h1>I’m <strong>John Doe</strong></h1>
          <p>
            Software Engineer,<br/>
            MSc Student,<br/>
            etc
          </p>
          <div className="hero-buttons">
            <button className="primary">resume/CV</button>
            <button className="secondary">Contact</button>
          </div>
          <div className="hero-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" alt="GitHub" className="social-icon github"/>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="LinkedIn" className="social-icon linkedin"/>
            </a>
            <a href="https://kaggle.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kaggle.svg" alt="Kaggle" className="social-icon kaggle"/>
            </a>
            <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/researchgate.svg" alt="ResearchGate" className="social-icon researchgate"/>
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>
      </div>
    </section>
  );
}
