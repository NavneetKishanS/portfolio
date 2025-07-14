import React, { useEffect, useRef } from 'react';
import './Experience.css';
import experienceData from '../data/experience.json';

const Experience = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience-section" id="experience">
      <h2>Work Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line" />
        {experienceData.map((exp, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';
          return (
            <div key={index} className="timeline-entry">
              <div className="timeline-dot" />
              <div className="timeline-date-label">
                {exp.start} – {exp.end}
              </div>
              <div
                className={`timeline-item ${side} fade-in`}
                ref={el => (cardsRef.current[index] = el)}
              >
                <div className="timeline-logo">
                  <img src={exp.logo} alt={`${exp.company} logo`} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">
                    {exp.start} – {exp.end}
                  </span>
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
