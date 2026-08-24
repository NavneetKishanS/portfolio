import React from "react";
import { motion } from "framer-motion";
import educationData from "../data/educationData";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="education-section">
      <h2 className="section-title">Education</h2>
      <div className="education-list">
        {educationData.map((edu, index) => (
          <motion.div
            className="education-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
