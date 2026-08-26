import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPause, FaPlay, FaArrowRight, FaGithub } from "react-icons/fa";
import projects from "../data/projects";
import "./Projects.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AUTOPLAY_PX_PER_FRAME = 1; // ~60px/s at 60fps, matches the old marquee's pace

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
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
    >
      {/* Sibling to the card link (not nested inside it) -- an <a> inside
          another <a> is invalid HTML and browsers will auto-close the
          outer link early, breaking navigation for anything after it. */}
      {proj.githubUrl && (
        <a
          href={proj.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-github-badge"
          aria-label={`View ${proj.title} source on GitHub`}
        >
          <FaGithub />
        </a>
      )}

      <Link to={`/project/${proj.slug || proj.id}`} className="project-card-link">
        {proj.thumbnail && (
          <div className="project-thumbnail-wrap">
            <img
              src={proj.thumbnail}
              alt={proj.title}
              className="project-thumbnail"
              loading="lazy"
            />
            <div className="project-thumbnail-overlay">
              <span>
                <FaArrowRight /> View project
              </span>
            </div>
          </div>
        )}

        <div className="project-card-content">
          <h3 className="project-title">{proj.title}</h3>
          <p className="project-dates">{proj.dates}</p>

          <div className="tech-logos">
            {(proj.techStack || []).map((tech, idx) => (
              <img
                key={idx}
                src={`${process.env.PUBLIC_URL}/logos/${tech}.svg`}
                alt={tech}
                title={tech}
                className="tech-logo"
                loading="lazy"
              />
            ))}
          </div>

          <span className="project-view-btn">
            View project details <FaArrowRight />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const scrollerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  const cardStep = () => {
    const el = scrollerRef.current;
    const card = el?.querySelector(".project-card");
    return card ? card.getBoundingClientRect().width + 16 : 320;
  };

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * cardStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  // Autoplay: continuous drift (like the old CSS marquee), not a periodic
  // jump — a discrete "jump one card every few seconds" reads as "stopped"
  // most of the time since nothing moves between jumps. The list is
  // rendered twice so scrollLeft can wrap by exactly one full set width
  // without a visible cut (the content after the wrap point is identical).
  // Still pausable via hover or the explicit toggle -- unlike the old
  // marquee, touch users (no hover) can actually stop it via the toggle.
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const el = scrollerRef.current;
    if (!el) return;

    const setWidth = el.scrollWidth / 2;
    let rafId;

    const tick = () => {
      if (el.scrollLeft >= setWidth) {
        el.scrollLeft -= setWidth;
      } else {
        el.scrollLeft += AUTOPLAY_PX_PER_FRAME;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, isHovered]);

  return (
    <section id="projects" className="projects-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">Projects</h2>

        <div className="projects-controls">
          <button type="button" aria-label="Previous project" onClick={() => scrollByCard(-1)}>
            &lsaquo;
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button type="button" aria-label="Next project" onClick={() => scrollByCard(1)}>
            &rsaquo;
          </button>
        </div>

        <div
          className="projects-scroll-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="projects-scroll" ref={scrollerRef}>
            {[...projects, ...projects].map((proj, index) => {
              if (!proj || !proj.title) return null;
              return <ProjectCard proj={proj} key={index} />;
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
