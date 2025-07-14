import React, { useState, useEffect } from "react";
import aboutImages from "../data/aboutImages.json";
import "./About.css";

export default function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % aboutImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-card">
        <div className="text-area">
          <div className="tools">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>
          <div className="card__content">
            <p>
              Hello! I'm a passionate developer and researcher.
              <br />
              I love building performant web applications and exploring new technologies.
              <br />
              Always curious and eager to learn.
                            Hello! I'm a passionate developer and researcher.
              <br />
              I love building performant web applications and exploring new technologies.
              <br />
              Always curious and eager to learn.
                            Hello! I'm a passionate developer and researcher.
              <br />
              I love building performant web applications and exploring new technologies.
              <br />
              Always curious and eager to learn.
            </p>
          </div>
        </div>
        <div className="image-area">
          {aboutImages.map((img, index) => (
            <img
              key={img.filename}
              src={`/images/about/${img.filename}`}
              alt={img.caption}
              className={index === current ? "active" : ""}
            />
          ))}
          <div className="caption">{aboutImages[current].caption}</div>
        </div>

      </div>
    </section>
  );
}
