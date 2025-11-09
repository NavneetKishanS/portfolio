import React from "react";
import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact</h2>

      <div className="contact-card">
        <div className="contact-header">
          <h3 className="contact-name">Your Name</h3>
          <p className="contact-tagline">Let’s build something amazing together 🚀</p>
        </div>

        <div className="contact-details">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:youremail@example.com">youremail@example.com</a>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Toronto, Canada</span>
          </div>
        </div>

        <div className="contact-links">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
}
