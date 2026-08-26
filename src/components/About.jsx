import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import aboutImages from "../data/aboutImages.json";
import aboutText from "../data/aboutText.json";
import "./About.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function About() {
  const [current, setCurrent] = useState(0); // slideshow
  const [displayText, setDisplayText] = useState(
    prefersReducedMotion ? aboutText.paragraphs[0] : ""
  );
  const [paragraphIndex, setParagraphIndex] = useState(0); // current para
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef(null);

  // rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % aboutImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // typing + fade cycle
  useEffect(() => {
    if (prefersReducedMotion) return; // static full paragraph, no timers

    const paragraphs = aboutText.paragraphs;
    const currentParagraph = paragraphs[paragraphIndex];

    if (!isDeleting && displayText.length < currentParagraph.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentParagraph.slice(0, displayText.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && displayText.length === currentParagraph.length) {
      const hold = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(hold);
    } else if (isDeleting && displayText.length > 0) {
      const del = setTimeout(() => {
        setDisplayText(displayText.slice(0, -2));
      }, 15);
      return () => clearTimeout(del);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setParagraphIndex((prev) => (prev + 1) % paragraphs.length);
    }
  }, [displayText, isDeleting, paragraphIndex]);

  // subtle cursor-tracking spotlight on the terminal card
  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" className="about-section">
      <motion.div
        className="about-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left: Text area */}
        <div className="text-area">
          <div className="tools">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>

          <div className="card__content terminal-output">
            <p className="about-paragraph fade-text">
              {displayText}
              {!prefersReducedMotion && <span className="cursor" />}
            </p>
          </div>
        </div>

        {/* Right: Image area */}
        <div className="image-area">
          {aboutImages.map((img, index) => (
            <img
              key={img.filename}
              src={`${process.env.PUBLIC_URL}/images/about/${img.filename}`}
              alt={img.caption || "About image"}
              className={index === current ? "active" : ""}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ))}

          {aboutImages[current] && (
            <div className="caption">{aboutImages[current].caption}</div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
