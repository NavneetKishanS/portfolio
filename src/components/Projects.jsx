import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./Projects.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ProjectCard({ proj }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800 }
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
    >
      {proj.thumbnail && (
        <img
          src={proj.thumbnail}
          alt={proj.title}
          className="project-thumbnail"
          loading="lazy"
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
              src={`${process.env.PUBLIC_URL}/logos/${tech}.svg`}
              alt={tech}
              className="tech-logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    try {
      const context = require.context("../data/projects", false, /\.js$/);
      const loaded = context.keys().map((key) => {
        const mod = context(key);
        return mod.default || mod;
      });
      setProjects(loaded);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  }, []);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".project-card");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    el.scrollBy({ left: direction * step, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">Projects</h2>
          <div className="projects-nav">
            <button aria-label="Scroll projects left" onClick={() => scrollByCard(-1)}>
              ‹
            </button>
            <button aria-label="Scroll projects right" onClick={() => scrollByCard(1)}>
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="projects-scroll-wrapper">
        <div className="projects-scroll" ref={scrollerRef}>
          <div className="projects-scroll-spacer" aria-hidden="true" />
          {projects.map((proj, index) => {
            if (!proj || !proj.title) return null;
            return <ProjectCard proj={proj} key={index} />;
          })}
          <div className="projects-scroll-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
