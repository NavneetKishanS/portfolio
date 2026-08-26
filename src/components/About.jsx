import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaAlignLeft, FaTerminal } from "react-icons/fa";
import aboutImages from "../data/aboutImages.json";
import aboutText from "../data/aboutText.json";
import "./About.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TYPE_MS_PER_CHAR = 12;
const DELETE_MS_PER_CHAR = 6;
const MIN_HOLD_MS = 2200;
const HOLD_MS_PER_CHAR = 25; // scales the pause with how much there is to read

export default function About() {
  const [current, setCurrent] = useState(0); // slideshow
  const [displayText, setDisplayText] = useState("");
  const [paragraphIndex, setParagraphIndex] = useState(0); // current para
  const [isDeleting, setIsDeleting] = useState(false);
  // Static view reads the full bio as plain paragraphs, no auto-cycling —
  // required for WCAG 2.2.2 (auto-updating content must be pausable) and
  // just easier to read for anyone who doesn't want to chase moving text.
  const [staticView, setStaticView] = useState(prefersReducedMotion);
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
    if (staticView) return; // paused — plain text view is shown instead

    const paragraphs = aboutText.paragraphs;
    const currentParagraph = paragraphs[paragraphIndex];

    if (!isDeleting && displayText.length < currentParagraph.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentParagraph.slice(0, displayText.length + 1));
      }, TYPE_MS_PER_CHAR);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && displayText.length === currentParagraph.length) {
      const holdDuration = Math.max(MIN_HOLD_MS, currentParagraph.length * HOLD_MS_PER_CHAR);
      const hold = setTimeout(() => setIsDeleting(true), holdDuration);
      return () => clearTimeout(hold);
    } else if (isDeleting && displayText.length > 0) {
      const del = setTimeout(() => {
        setDisplayText(displayText.slice(0, -2));
      }, DELETE_MS_PER_CHAR);
      return () => clearTimeout(del);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setParagraphIndex((prev) => (prev + 1) % paragraphs.length);
    }
  }, [displayText, isDeleting, paragraphIndex, staticView]);

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
            <div className="dots">
              <div className="circle red"></div>
              <div className="circle yellow"></div>
              <div className="circle green"></div>
            </div>
            <button
              type="button"
              className="terminal-toggle"
              onClick={() => setStaticView((v) => !v)}
              aria-pressed={staticView}
              title={staticView ? "Play typing animation" : "Pause and read as plain text"}
              aria-label={staticView ? "Play typing animation" : "Pause and read as plain text"}
            >
              <span className="terminal-toggle-label">
                {staticView ? "Play animation" : "Read as text"}
              </span>
              {staticView ? <FaTerminal /> : <FaAlignLeft />}
            </button>
          </div>

          <div className={`card__content terminal-output ${staticView ? "static" : ""}`}>
            {staticView ? (
              aboutText.paragraphs.map((p, i) => (
                <p className="about-paragraph" key={i}>
                  {p}
                </p>
              ))
            ) : (
              <p className="about-paragraph fade-text">
                {displayText}
                <span className="cursor" />
              </p>
            )}
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
