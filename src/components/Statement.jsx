import React from "react";
import { motion } from "framer-motion";
import "./Statement.css";

export default function Statement() {
  return (
    <section className="statement-section">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Computer scientist working at the intersection of{" "}
          <span className="highlight">healthcare technology</span>,{" "}
          <span className="highlight">machine learning</span>, and{" "}
          <span className="highlight">secure software systems</span>.
        </motion.p>
      </div>
    </section>
  );
}
