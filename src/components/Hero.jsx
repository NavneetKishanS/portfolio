import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.png";
import "./Hero.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/navneet-kishan-s/";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const roles = ["Software Engineer", "MSc Student", "Researcher", "Developer"];
  const [text, setText] = useState(prefersReducedMotion ? roles[0] : "");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return; // static role text, no timers

    const current = roles[index % roles.length];
    const speed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && text.length < current.length) {
        setText(current.substring(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(current.substring(0, text.length - 1));
      } else if (!isDeleting && text.length === current.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, index]);

  return (
    <section id="hero" className="hero-section">
      <motion.div
        className="hero-card"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Text */}
        <div className="hero-text">
          <motion.p className="intro" variants={item}>
            Hi there,
          </motion.p>
          <motion.p className="intro" variants={item}>
            I'm
          </motion.p>
          <motion.h1 variants={item}>
            <strong>Navneet Kishan Srinivasan</strong>
          </motion.h1>
          <motion.p className="subtitle" variants={item}>
            <span className="typed-text">{text}</span>
            {!prefersReducedMotion && <span className="cursor" />}
          </motion.p>
          <motion.div className="hero-buttons" variants={item}>
            <a
              className="primary"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume/CV
            </a>
            <a className="secondary" href="#contact">
              Contact
            </a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div className="hero-image" variants={item}>
          <img src={profilePic} alt="Navneet Kishan Srinivasan" width="250" height="250" />
        </motion.div>

        {/* Vertical Social Icons */}
        <motion.div className="hero-icons-vertical" variants={item}>
          {[
            { href: "https://github.com/NavneetKishanS", icon: "github", label: "GitHub" },
            { href: "https://www.linkedin.com/in/navneet-kishan-s/", icon: "linkedin", label: "LinkedIn" },
            { href: "https://www.kaggle.com/navneetkishans", icon: "kaggle", label: "Kaggle" },
            {
              href: "https://www.researchgate.net/profile/Navneet-Kishan-Srinivasan",
              icon: "researchgate",
              label: "ResearchGate",
            },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.18, rotate: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              <img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${icon}.svg`}
                alt={label}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
