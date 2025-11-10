import React from 'react';
import './Experience.css';
import experienceData from '../data/experienceData.js';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <h2>Work Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line" />
        {experienceData.map((exp, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';
          return (
            <motion.div
              key={index}
              className={`timeline-item ${side}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
