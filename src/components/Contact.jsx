import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Me</h2>

      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="contact-header">
          <h3 className="contact-name">Navneet Kishan Srinivasan</h3>
          <p className="contact-tagline">Let’s connect and bring impact! 🚀</p>
        </div>

        <div className="contact-details">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:navneetkishan54@gmail.com">navneetkishan54@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Erlangen, Bavaria, Germany</span>
          </div>
        </div>

        <div className="contact-links">
          <motion.a
            href="https://github.com/NavneetKishanS"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
            aria-label="GitHub"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/navneet-kishan-s"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
