import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const word = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export default function AnimatedTitle({ lines, className }) {
  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="show">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={"block " + (line.className ?? "")}>
          {line.text.split(" ").map((w, wordIndex) => (
            <motion.span key={wordIndex} variants={word} className="inline-block mr-[0.25em] last:mr-0">
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
