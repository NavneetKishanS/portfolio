import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlowHorizon from "./ui/glow-horizon";
import AnimatedTitle from "./ui/animated-title";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HOLD_MS = 2800;

export default function IntroSplash() {
  const [visible, setVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: "#050507" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setVisible(false)}
          role="presentation"
        >
          <GlowHorizon variant="top" />
          <AnimatedTitle
            className="relative z-10 text-center text-[2.5rem] sm:text-[3.5rem] font-bold leading-tight tracking-tight px-6"
            lines={[
              { text: "Welcome to", className: "text-white" },
              { text: "Navneet's Website", className: "text-[#A558FB]" },
            ]}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
