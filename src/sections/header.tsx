"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   Aurora blobs — colors from CSS vars
───────────────────────────────────────────── */
const Aurora = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "60vw", height: "60vw", top: "-20%", left: "-10%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
      animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "50vw", height: "50vw", top: "20%", right: "-15%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 13%, transparent) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
      animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "40vw", height: "40vw", bottom: "0%", left: "30%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
      animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
    />
  </div>
);

/* ─────────────────────────────────────────────
   Dot grid
───────────────────────────────────────────── */
const DotGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-40"
    style={{
      backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 30%, transparent) 1px, transparent 1px)",
      backgroundSize: "36px 36px",
      maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
    }}
  />
);

/* ─────────────────────────────────────────────
   Role cycler
───────────────────────────────────────────── */
const roles = ["Full Stack Developer", "Photographer", "Videographer"];

const RoleCycler = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative flex items-center justify-center">
      <motion.div
        key={idx}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute font-mono text-sm md:text-base tracking-[0.25em] uppercase text-primary"
      >
        {roles[idx]}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Magnetic CTA button
───────────────────────────────────────────── */
const MagneticButton = ({
  href, children, primary, download,
}: {
  href: string; children: React.ReactNode; primary?: boolean; download?: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy }}
      className={
        primary
          /* Primary: solid primary bg, light text, primary glow */
          ? "relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm md:text-base cursor-pointer select-none overflow-hidden group bg-primary text-lighttext shadow-[0_8px_32px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
          /* Secondary: ghost with text color border */
          : "relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm md:text-base cursor-pointer select-none overflow-hidden group bg-text/5 border border-text/10 text-text"
      }
    >
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {children}
    </motion.a>
  );
};

/* ─────────────────────────────────────────────
   Stat pill
───────────────────────────────────────────── */
const StatPill = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-1 px-6 py-3 rounded-2xl bg-text/[0.04] border border-text/[0.08]"
  >
    <span
      className="text-2xl md:text-3xl font-bold font-rubik"
      style={{
        background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {value}
    </span>
    <span className="text-xs tracking-widest uppercase font-mono text-subtext">
      {label}
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Main Header
───────────────────────────────────────────── */
const Header = () => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <Aurora />
      <DotGrid />

      {/* Top-edge gradient line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 60%, transparent), color-mix(in srgb, var(--color-secondary) 60%, transparent), transparent)",
        }}
      />

      {/* ── CONTENT ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-5 max-w-5xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={item} className="my-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase text-primary bg-primary/10 border border-primary/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={item} className="mb-4">
          <h1
            className="font-extrabold tracking-tight text-text font-rubik"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", lineHeight: 1.1 }}
          >
            Seif{" "}
            <span
              style={{
                background: "linear-gradient(120deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Basel
            </span>
          </h1>
        </motion.div>

        {/* Role cycler */}
        <motion.div variants={item} className="mb-6">
          <RoleCycler />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-xl text-base md:text-lg leading-relaxed mb-10 text-subtext"
        >
          Building scalable web applications with clean code and intentional design.
          2+ years crafting full-stack products that people actually use.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-16">
          <MagneticButton href="#projects" primary>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            View Projects
          </MagneticButton>
          <MagneticButton href="/seif-new-cv.pdf" download="seif-new-cv.pdf">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-20">
          <StatPill value="2+" label="Years exp."      delay={0.8}  />
          <StatPill value="9+" label="Projects"        delay={0.92} />
          <StatPill value="3+" label="Certifications"  delay={1.04} />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-subtext">
          scroll
        </span>
        <motion.div
          className="w-px h-10 origin-top bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Header;