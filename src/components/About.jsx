// src/components/About.jsx
import React from "react";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about-section">
      <h2>About Me</h2>
      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <p>
            Hello! I'm a passionate developer and researcher.
            <br />
            I love building performant web applications and exploring new technologies. I love building performant web applications and exploring new technologies.
            I love building performant web applications and exploring new technologies.
            I love building performant web applications and exploring new technologies.
            <br />
            Always curious and eager to learn.
          </p>
        </div>
      </div>
    </section>
  );
}
