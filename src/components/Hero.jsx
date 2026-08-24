import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profilePic from "../assets/profile.png";
import "./Hero.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/navneet-kishan-s/";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const roles = ["Software Engineer", "MSc Student", "Researcher", "Developer"];
  const [text, setText] = useState(prefersReducedMotion ? roles[0] : "");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 90]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.94]);

  useEffect(() => {
    if (prefersReducedMotion) return;

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
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="container hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: parallaxOpacity, y: parallaxY, scale: parallaxScale }
        }
      >
        {/* Text */}
        <div className="hero-text">
          <motion.p className="eyebrow" variants={item}>
            &gt; whoami
          </motion.p>
          <motion.h1 variants={item}>Navneet Kishan Srinivasan</motion.h1>
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

          <motion.div className="hero-icons-row" variants={item}>
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
                whileHover={prefersReducedMotion ? undefined : { scale: 1.15, y: -3 }}
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
        </div>

        {/* Profile Image */}
        <motion.div className="hero-image" variants={item}>
          <div className="hero-image-ring">
            <img src={profilePic} alt="Navneet Kishan Srinivasan" width="260" height="260" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span />
      </motion.div>
    </section>
  );
}
