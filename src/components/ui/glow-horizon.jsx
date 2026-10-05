import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 2;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VARIANTS = {
  top: { axis: "y", scaleAxis: "scaleY", enterPct: "-100%", restPct: "-50%" },
  bottom: { axis: "y", scaleAxis: "scaleY", enterPct: "100%", restPct: "50%" },
  left: { axis: "x", scaleAxis: "scaleX", enterPct: "100%", restPct: "50%" },
  right: { axis: "x", scaleAxis: "scaleX", enterPct: "-100%", restPct: "-50%" },
};

export default function GlowHorizon({ className, variant = "top" }) {
  const { axis, scaleAxis, enterPct, restPct } = VARIANTS[variant];

  return (
    <motion.div
      aria-hidden="true"
      className={"absolute w-full h-full pointer-events-none " + (className ?? "")}
      style={{ isolation: "isolate" }}
      initial={
        prefersReducedMotion
          ? false
          : { [axis]: enterPct, [scaleAxis]: 1.5, opacity: 0, filter: "blur(15px)" }
      }
      animate={{ [axis]: restPct, [scaleAxis]: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: prefersReducedMotion ? 0 : DURATION, ease: EASE }}
    >
      <Arc variant={variant} color="#FFFFFF" size="132%" boxShadow="0px -4px 23px 0px #ffffffb5" delay={1.2} />
      <Arc variant={variant} color="#A558FB" size="120%" initialOffset="10%" blur={31} delay={0.6} />
      <Arc variant={variant} color="#4922E5" size="124%" initialOffset="10%" blur={21} delay={0} />
      <Arc variant={variant} color="#000" size="120%" initialOffset="10%" blur={51} delay={0} />
    </motion.div>
  );
}

function Arc({ variant, color, size, initialOffset, blur, boxShadow, delay }) {
  const scale = parseFloat(size) / 100;
  const { axis, enterPct } = VARIANTS[variant];
  const sign = enterPct.startsWith("-") ? -1 : 1;
  const startPct = initialOffset
    ? `${sign * Math.abs(parseFloat(initialOffset) - 50)}%`
    : undefined;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 rounded-[100%]"
      style={{
        scale,
        background: color,
        ...(blur !== undefined && { filter: `blur(${blur}px)` }),
        ...(boxShadow && { boxShadow }),
      }}
      initial={!prefersReducedMotion && startPct ? { [axis]: startPct } : false}
      animate={!prefersReducedMotion && startPct ? { [axis]: 0 } : undefined}
      transition={{
        duration: prefersReducedMotion ? 0 : DURATION,
        ease: EASE,
        delay: prefersReducedMotion ? 0 : delay,
      }}
    />
  );
}
