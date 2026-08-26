import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../data/projects";
import ThemeToggle from "./ThemeToggle";
import "./ProjectDetail.css";

/**
 * Reusable project "wiki" page. Everything shown is driven by the project's
 * data object (src/data/projects/projectN.js) — to add more content for a
 * project, extend its data rather than editing this template:
 *
 *   githubUrl: "https://github.com/you/repo"   // renders a GitHub button
 *   liveUrl: "https://..."                      // renders a Live Demo button
 *   sections: [                                 // free-form extra content
 *     { heading: "Architecture", body: ["paragraph one", "paragraph two"] },
 *     { heading: "Key Features", list: ["feature one", "feature two"] },
 *     { heading: "Diagram", image: "/images/projects/foo-diagram.png" },
 *   ]
 *   gallery: ["/images/projects/foo-1.png", "/images/projects/foo-2.png"]
 */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    document.title = project
      ? `${project.title} | Navneet Kishan Srinivasan`
      : "Project not found | Navneet Kishan Srinivasan";
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="detail-page">
        <header className="detail-header">
          <Link to="/" className="detail-back">
            <FaArrowLeft /> Back to portfolio
          </Link>
          <ThemeToggle />
        </header>
        <div className="detail-notfound detail-container">
          <h1>Project not found</h1>
          <p>The project you're looking for doesn't exist or may have moved.</p>
          <Link to="/#projects" className="detail-cta">
            See all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <Link to="/" className="detail-back">
          <FaArrowLeft /> Back to portfolio
        </Link>
        <ThemeToggle />
      </header>

      <motion.main
        className="detail-main detail-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="detail-hero">
          {project.thumbnail && (
            <img src={project.thumbnail} alt={project.title} className="detail-thumbnail" />
          )}
          <div className="detail-hero-text">
            <p className="detail-dates">{project.dates}</p>
            <h1>{project.title}</h1>

            {(project.techStack || []).length > 0 && (
              <div className="detail-tech-logos">
                {project.techStack.map((tech, i) => (
                  <img
                    key={i}
                    src={`${process.env.PUBLIC_URL}/logos/${tech}.svg`}
                    alt={tech}
                    className="detail-tech-logo"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="detail-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link-btn"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link-btn secondary"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {(project.description || []).length > 0 && (
          <section className="detail-section">
            <h2>Overview</h2>
            <ul className="detail-list">
              {project.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {(project.sections || []).map((section, i) => (
          <section className="detail-section" key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {(section.body || []).map((para, j) => (
              <p key={j}>{para}</p>
            ))}
            {section.list && (
              <ul className="detail-list">
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
            {section.image && (
              <img
                className="detail-section-image"
                src={section.image}
                alt={section.heading || project.title}
                loading="lazy"
              />
            )}
          </section>
        ))}

        {(project.gallery || []).length > 0 && (
          <section className="detail-section">
            <h2>Gallery</h2>
            <div className="detail-gallery">
              {project.gallery.map((src, i) => (
                <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
              ))}
            </div>
          </section>
        )}
      </motion.main>
    </div>
  );
}
