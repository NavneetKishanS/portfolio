import React, { useState, useEffect } from "react";
import aboutImages from "../data/aboutImages.json";
import aboutText from "../data/aboutText.json";
import "./About.css";

export default function About() {
  const [current, setCurrent] = useState(0); // slideshow
  const [displayText, setDisplayText] = useState(""); // text being typed
  const [paragraphIndex, setParagraphIndex] = useState(0); // current para
  const [isDeleting, setIsDeleting] = useState(false);

  // rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % aboutImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // typing + fade cycle
  useEffect(() => {
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

  return (
    <section id="about" className="about-section">
      <div className="about-card">
        {/* Left: Text area */}
        <div className="text-area">
          <div className="tools">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>

          <div className="card__content terminal-output">
            <p className="about-paragraph fade-text">{displayText}</p>
            <span className="cursor">|</span>
          </div>
        </div>

        {/* Right: Image area */}
        <div className="image-area">
          {aboutImages.map((img, index) => (
            <img
              key={img.filename}
              src={`${process.env.PUBLIC_URL}/images/about/${img.filename}`} // ✅ fixed path
              alt={img.caption || "About image"}
              className={index === current ? "active" : ""}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }} // optional graceful fallback
            />
          ))}

          {aboutImages[current] && (
            <div className="caption">{aboutImages[current].caption}</div>
          )}
        </div>
      </div>
    </section>
  );
}
