"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ROWS = [
  {
    label: "Languages",
    tag: "01",
    items: [
      { src: "/svgs/html.svg", name: "HTML" },
      { src: "/svgs/css.svg", name: "CSS" },
      { src: "/svgs/javascript.svg", name: "JavaScript" },
      { src: "/svgs/typescript.svg", name: "TypeScript" },
      { src: "/svgs/python.svg", name: "Python" },
      { src: "/svgs/sql.svg", name: "SQL" },
    ],
  },
  {
    label: "Frontend Development",
    tag: "02",
    items: [
      { src: "/svgs/react.svg", name: "React" },
      { src: "/svgs/next.svg", name: "Next.js" },
      { src: "/svgs/vite.svg", name: "Vite" },
      { src: "/svgs/bootstrap.svg", name: "Bootstrap" },
      { src: "/svgs/tailwindcss.svg", name: "Tailwind" },
      { src: "/images/shadcn-ui.png", name: "shadcn" },
      { src: "/images/aceternity-ui.png", name: "aceternity" },
    ],
  },
  {
    label: "Backend Development",
    tag: "03",
    items: [
      { src: "/svgs/django.svg", name: "Django" },
      { src: "/svgs/postgresql.svg", name: "PostgreSQL" },
      { src: "/svgs/sqlite.svg", name: "SQLite" },
      { src: "/svgs/mysql.svg", name: "MySQL" },
    ],
  },
  {
    label: "Version Control & Deployment",
    tag: "04",
    items: [
      { src: "/svgs/github.svg", name: "GitHub" },
      { src: "/svgs/git.svg", name: "Git" },
      { src: "/svgs/vercel.svg", name: "Vercel" },
      { src: "/svgs/vscode.svg", name: "VS Code" },
    ],
  },
  {
    label: "Testing",
    tag: "05",
    items: [
      { src: "/svgs/postman.svg", name: "Postman" },
      { src: "/svgs/hoppscotch.svg", name: "hoppscotch" },
      { src: "/svgs/insomnia.svg", name: "insomnia" },
    ],
  },
  {
    label: "Design",
    tag: "06",
    items: [
      { src: "/svgs/figma.svg", name: "Figma" },
      { src: "/svgs/photoshop.svg", name: "Photoshop" },
      { src: "/svgs/premiere-pro.svg", name: "premiere pro" },
      { src: "/images/DaVinci-Resolve-Studio.png", name: "DaVinci Resolve" },
    ],
  },
];

/* ─────────────────────────────────────────────
   TECH ICON
   Desktop: hover → scale up, tooltip, accent bar, shimmer
   Mobile:  touch → same via `touched` state
───────────────────────────────────────────── */
const TechIcon = ({
  src,
  name,
  rotate,
  delay,
  inView,
}: {
  src: string;
  name: string;
  rotate: number;
  delay: number;
  inView: boolean;
}) => {
  const [tip, setTip] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleTouchStart = () => {
    setTouched(true);
    setTip(true);
  };
  const handleTouchEnd = () => {
    setTimeout(() => {
      setTouched(false);
      setTip(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate }}
      animate={inView ? { opacity: 1, y: 0, rotate: touched ? 0 : rotate } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.5, 1] }}
      whileHover={{ scale: 1.5, rotate: 0, y: -8, zIndex: 50 }}
      whileTap={{ scale: 1.3, rotate: 0 }}
      onHoverStart={() => { setTip(true); }}
      onHoverEnd={() => { setTip(false); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex-shrink-0 cursor-pointer touch-manipulation"
      style={{ zIndex: touched ? 50 : 1 }}
    >
      {/* Card */}
      <div
        className={`
          relative p-2 md:p-3 rounded-xl overflow-hidden
          transition-all duration-300
          ${touched
            ? "shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
            : "hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
          }
        `}
        style={{
          background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 8%)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: touched
            ? "color-mix(in srgb, var(--color-primary) 40%, transparent)"
            : "color-mix(in srgb, var(--color-text) 10%, transparent)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Shimmer sweep — desktop hover via CSS group, mobile via touched */}
        <div
          className={`
            absolute inset-0 pointer-events-none z-10
            bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
            transition-transform duration-700 ease-in-out
            ${touched ? "translate-x-full" : "-translate-x-full hover:translate-x-full"}
          `}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 origin-left transition-transform duration-500"
          style={{
            background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
            transform: touched ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        <Image
          src={src}
          alt={name}
          width={80}
          height={80}
          className="w-10 h-10 md:w-20 md:h-20 object-contain relative z-20"
        />
      </div>

      {/* Tooltip — shows on hover (desktop) and touch (mobile) */}
      <motion.div
        initial={false}
        animate={
          tip
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 4, scale: 0.92 }
        }
        transition={{ duration: 0.15 }}
        className="
          absolute -top-9 left-1/2 -translate-x-1/2
          px-2.5 py-1 rounded-lg pointer-events-none z-50
          font-mono text-xs sm:text-sm uppercase tracking-[0.15em] whitespace-nowrap
          text-primary border border-primary/30 bg-primary/10
        "
      >
        {name}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   TECH ROW CARD
   Desktop: hover drives all CSS group-hover effects
   Mobile:  touch sets `active` → same effects via conditionals
───────────────────────────────────────────── */
const TechRowCard = ({
  row,
  rowIndex,
  rotations,
}: {
  row: (typeof ROWS)[0];
  rowIndex: number;
  rotations: number[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rowDelay = rowIndex * 0.12;
  const [active, setActive] = useState(false);
  const [activePill, setActivePill] = useState<number | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: rowDelay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 400)}
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden
        cursor-default touch-manipulation
        border transition-[border-color,box-shadow] duration-300
        ${active
          ? "border-primary/50 shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
          : "border-text/10 shadow-none"
        }
      `}
      style={{ background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full flex-shrink-0 origin-left transition-transform duration-500 ease-out"
        style={{
          background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          transform: active ? "scaleX(1)" : "scaleX(0.25)",
        }}
      />

      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out"
        style={{ transform: active ? "translateX(100%)" : "translateX(-100%)" }}
      />

      {/* Top glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-20 p-6 md:p-7 flex flex-col gap-5">

        {/* Header: ghost number + label tag */}
        <div className="flex items-start justify-between gap-4">
          {/* Ghost number */}
          <span
            className={`
              font-mono text-5xl sm:text-6xl font-bold leading-none select-none
              transition-colors duration-300
              ${active ? "text-primary" : "text-text/[0.07]"}
            `}
            style={{ letterSpacing: "-0.04em" }}
          >
            {row.tag}
          </span>

          {/* Tag pill */}
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex-shrink-0 text-primary border border-primary/20 bg-primary/10">
            {row.label}
          </span>
        </div>

        {/* Row title — micro-lift on active */}
        <h3
          className="font-rubik text-xl font-bold leading-tight text-text transition-transform duration-300"
          style={{
            letterSpacing: "-0.02em",
            transform: active ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          {row.label}
        </h3>

        {/* Divider */}
        <div
          className="h-px w-full bg-text/10 transition-opacity duration-300"
          style={{ opacity: active ? 0.6 : 1 }}
        />

        {/* Icons row */}
        <div className="flex flex-wrap gap-3">
          {row.items.map((item, i) => (
            <TechIcon
              key={i}
              src={item.src}
              name={item.name}
              rotate={rotations[i] ?? 0}
              delay={rowDelay + i * 0.07 + 0.2}
              inView={inView}
            />
          ))}
        </div>

        {/* Skill name pills — hover: text-subtext → text-text */}
        <div className="flex flex-wrap gap-2 mt-1">
          {row.items.map((item, i) => (
            <span
              key={i}
              className={`
                font-mono text-xs sm:text-sm uppercase tracking-[0.12em]
                px-2.5 py-1 rounded-full cursor-default touch-manipulation
                transition-colors duration-300 hover:text-text
                ${activePill === i ? "text-text" : "text-subtext"}
              `}
              style={{
                background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
              }}
              onTouchStart={() => setActivePill(i)}
              onTouchEnd={() => setTimeout(() => setActivePill(null), 500)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main export ── */
export const GridStack = () => {
  const [rotations, setRotations] = useState<number[][]>([]);

  useEffect(() => {
    setRotations(ROWS.map((row) => row.items.map(() => Math.random() * 12 - 6)));
  }, []);

  if (rotations.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {ROWS.map((row, i) => (
        <TechRowCard key={i} row={row} rowIndex={i} rotations={rotations[i]} />
      ))}
    </div>
  );
};

export default GridStack;
