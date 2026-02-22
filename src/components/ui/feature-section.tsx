"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ── Data ── */
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

/* ── Single tech icon ── */
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.5, 1] }}
      whileHover={{ scale: 1.5, rotate: 0, y: -8, zIndex: 50 }}
      whileTap={{ scale: 1, rotate: 0 }}
      onHoverStart={() => setTip(true)}
      onHoverEnd={() => setTip(false)}
      className="relative flex-shrink-0 cursor-pointer"
      style={{ zIndex: 1 }}
    >
      {/* Card */}
      <div
        className="
          group/icon relative p-2 md:p-3 rounded-xl overflow-hidden
          transition-all duration-300
          hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]
        "
        style={{
          background:
            "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 8%)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="
          absolute inset-0 pointer-events-none z-10
          -translate-x-full group-hover/icon:translate-x-full
          transition-transform duration-700 ease-in-out
          bg-gradient-to-r from-transparent via-white/8 to-transparent
        "
        />

        {/* Top accent bar */}
        <div
          className="
            absolute top-0 left-0 right-0 h-0.5 origin-left
            scale-x-0 group-hover/icon:scale-x-100
            transition-transform duration-500
          "
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
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

      {/* Tooltip */}
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
          font-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap
          text-primary
        "
        style={{
          background:
            "color-mix(in srgb, var(--color-background) 92%, var(--color-text) 8%)",
          border:
            "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
        }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
};

/* ── One row card — mirrors ServiceCard structure ── */
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: rowDelay, ease: [0.22, 1, 0.36, 1] }}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden cursor-default
        transition-shadow duration-300
        hover:shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]
      "
      style={{
        background:
          "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
      }}
    >
      {/* Top accent bar — grows on hover */}
      <div
        className="
          h-0.5 w-full flex-shrink-0 origin-left
          transition-transform duration-500 ease-out
          scale-x-[0.25] group-hover:scale-x-100
        "
        style={{
          background:
            "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
        }}
      />

      {/* Shimmer sweep */}
      <div
        className="
        absolute inset-0 pointer-events-none z-10
        -translate-x-full group-hover:translate-x-full
        transition-transform duration-700 ease-in-out
        bg-gradient-to-r from-transparent via-white/5 to-transparent
      "
      />

      {/* Top glow */}
      <div
        className="
          absolute inset-0 rounded-2xl pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-20 p-6 md:p-7 flex flex-col gap-5">
        {/* Header: number + label tag */}
        <div className="flex items-start justify-between gap-4">
          {/* Ghost number */}
          <span
            className="
              font-mono text-6xl font-bold leading-none select-none
              transition-all duration-300
              text-text/[0.07] group-hover:text-primary
            "
            style={{ letterSpacing: "-0.04em" }}
          >
            {row.tag}
          </span>

          {/* Tag pill */}
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex-shrink-0 text-primary"
            style={{
              background:
                "color-mix(in srgb, var(--color-primary) 10%, transparent)",
              border:
                "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
            }}
          >
            {row.label}
          </span>
        </div>

        {/* Row title */}
        <h3
          className="
            font-rubik text-xl font-bold leading-tight text-text
            transition-transform duration-300 group-hover:-translate-y-0.5
          "
          style={{ letterSpacing: "-0.02em" }}
        >
          {row.label}
        </h3>

        {/* Divider */}
        <div
          className="h-px w-full transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "color-mix(in srgb, var(--color-text) 10%, transparent)",
          }}
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

        {/* Skill names as text pills — hover changes subtext → text */}
        <div className="flex flex-wrap gap-2 mt-1">
          {row.items.map((item, i) => (
            <span
              key={i}
              className="
                group/pill font-mono text-[10px] uppercase tracking-[0.12em]
                px-2.5 py-1 rounded-full cursor-default
                text-subtext
                transition-colors duration-300
                hover:text-text
              "
              style={{
                background:
                  "color-mix(in srgb, var(--color-text) 5%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
              }}
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
    setRotations(
      ROWS.map((row) => row.items.map(() => Math.random() * 12 - 6)),
    );
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
