import React, { useEffect, useState } from "react";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    try {
      const context = require.context("../data/projects", false, /\.json$/);
      const loaded = context.keys().map((key) => context(key));
      setProjects(loaded);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>

      <div
        className={`projects-scroll-wrapper ${isHovered ? "paused" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="projects-scroll">
          {[...projects, ...projects].map((proj, index) => {
            if (!proj || !proj.title) return null;

            return (
              <div className="project-card" key={index}>
                {proj.thumbnail && (
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="project-thumbnail"
                  />
                )}

                <div className="project-card-content">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-dates">{proj.dates}</p>

                  <ul className="project-desc">
                    {(proj.description || []).map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>

                  <div className="tech-logos">
                    {(proj.techStack || []).map((tech, idx) => (
                      <img
                        key={idx}
                        src={`/logos/${tech}.svg`}
                        alt={tech}
                        className="tech-logo"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
