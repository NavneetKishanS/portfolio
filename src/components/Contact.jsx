import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="eyebrow">&gt; contact --init</p>
          <h2>Let's build something worth shipping.</h2>
          <p className="contact-tagline">
            Open to conversations about healthcare AI, secure systems, and roles where research
            turns into something people actually use.
          </p>

          <a className="contact-email" href="mailto:navneetkishan54@gmail.com">
            navneetkishan54@gmail.com
          </a>

          <div className="contact-meta">
            <span>
              <FaMapMarkerAlt /> Erlangen, Bavaria, Germany
            </span>
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

        <div className="contact-footer">
          <span>© {new Date().getFullYear()} Navneet Kishan Srinivasan</span>
        </div>
      </div>
    </section>
  );
}
