import React from "react";
import educationData from "../data/educationData";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="education-section">
      <h2 className="section-title">Education</h2>
      <div className="education-list">
        {educationData.map((edu, index) => (
          <div className="education-card" key={index}>
            <div className="education-logo">
              <img src={edu.logo} alt={`${edu.institution} logo`} />
            </div>
            <div className="education-details">
              <h3 className="education-degree">{edu.degree}</h3>
              <p className="education-meta">
                <span>{edu.institution}</span> | <span>{edu.location}</span> | <span>{edu.duration}</span>
              </p>
              <ul className="education-description">
                {edu.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
