"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ── Project data ── */
const PROJECTS = [
  {
    title: "Coinat",
    subtitle: "Coin & Currency Exchange Online Store",
    description:
      "An e-commerce website for buying and selling authentic coins and currency from various cultures and time periods — a unique marketplace for numismatics enthusiasts.",
    thumbnail: "/images/coinat-website.png",
    link: "https://coinat.vercel.app/",
    info_link: "https://github.com/seifbasel/Coinat-Website",
    category: "fullstack",
    tags: ["Next.js", "E-Commerce"],
  },
  {
    title: "TransHub",
    subtitle: "Localization & Translation Platform",
    description:
      "A comprehensive platform that automates the localization and translation process for Transfective, tracking project progress from initiation to delivery and payment.",
    thumbnail: "/images/transhub.png",
    link: "https://transhub.vercel.app/",
    category: "fullstack",
    tags: ["React", "Django", "PostgreSQL"],
  },
  {
    title: "Transfective HR",
    subtitle: "Internal Employee Management System",
    description:
      "An internal HR system for handling employee tasks, leave requests, interviews, and personnel management, streamlining human resources operations.",
    thumbnail: "/images/transfective-hr.png",
    link: "https://transfective-hr.vercel.app/",
    category: "fullstack",
    tags: ["React", "Django"],
  },
  {
    title: "Nike Clone",
    subtitle: "Nike Website Clone",
    description:
      "An e-commerce website replicating the Nike online store, featuring product pages and a smooth shopping experience for shoes and clothing.",
    thumbnail: "/images/nike-website.png",
    link: "https://e-commerce-nike-website.vercel.app/",
    info_link: "https://github.com/seifbasel/Nike-E_Commerce-Website",
    category: "frontend",
    tags: ["React", "Tailwind"],
  },
  {
    title: "Prova 3D",
    subtitle: "Virtual Try-On Platform",
    description:
      "An innovative AR platform letting users virtually try on clothes and shoes, enhancing the online shopping experience with 3D visualization.",
    thumbnail: "/images/prova-3d-website.png",
    link: "https://prova-3d.vercel.app/",
    info_link: "https://github.com/seifbasel/Prova-3d-Website",
    category: "frontend",
    tags: ["React", "AR", "3D"],
  },
  {
    title: "LMS",
    subtitle: "Library Management System",
    description:
      "A system managing library operations — tracking books, user accounts, check-in/out, and overdue records with a clean admin interface.",
    thumbnail: "/images/lms_website.png",
    info_link: "https://github.com/seifbasel/Library-Management-System-Website",
    category: "fullstack",
    tags: ["Django", "Python", "SQL"],
  },
  {
    title: "Diabetes AI",
    subtitle: "Diabetes Classification App",
    description:
      "A web application predicting diabetes likelihood from health data using machine learning algorithms with an intuitive input interface.",
    thumbnail: "/images/Diabetes-Classification.png",
    link: "https://github.com/seifbasel/Diabetes-Classification-Website/blob/main/project%20demo.mp4",
    info_link: "https://github.com/seifbasel/Diabetes-Classification-Website",
    category: "fullstack",
    tags: ["Python", "ML", "Django"],
  },
  {
    title: "COSMOS",
    subtitle: "Space Exploration Website",
    description:
      "An immersive responsive website showcasing our solar system with modern UI elements, smooth animations, and an engaging user experience.",
    thumbnail: "/images/cosmo.png",
    link: "https://seifbasel.github.io/Space-Exploration-Site/",
    info_link: "https://github.com/seifbasel/Space-Exploration-Site",
    category: "frontend",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    title: "XO Master",
    subtitle: "Tic-Tac-Toe Game",
    description:
      "A responsive and interactive Tic-Tac-Toe game with modern UI, smooth animations, and multiplayer functionality.",
    thumbnail: "/images/xo.png",
    link: "https://seifbasel.github.io/X-O-Game-Website/",
    info_link: "https://github.com/seifbasel/X-O-Game-Website",
    category: "games",
    tags: ["HTML", "CSS", "JS"],
  },
];

const TABS = [
  { key: "all",       label: "All" },
  { key: "fullstack", label: "Fullstack" },
  { key: "frontend",  label: "Frontend" },
  { key: "games",     label: "Games" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ─────────────────────────────────────────────
   PROJECT CARD
   On mobile: tap anywhere on the card to toggle
   the detail drawer (description + buttons).
   On desktop: hover does the same via CSS group.
───────────────────────────────────────────── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [active, setActive] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 400)}
      onTouchCancel={() => setActive(false)}
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden
        cursor-default touch-manipulation
        border transition-[border-color,box-shadow] duration-300
        ${active
          ? "border-primary/50 shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_15%,transparent)]"
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
          transform: active ? "scaleX(1)" : "scaleX(0.2)",
        }}
      />

      {/* Shimmer */}
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

      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0 flex items-center justify-center"
        style={{
          minHeight: 100,
          background: "color-mix(in srgb, var(--color-background) 60%, var(--color-text) 4%)",
        }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-auto object-full transition-transform duration-500"
          style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
        />
        {/* Gradient overlay — lightens on active */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: active ? 0.3 : 0.6,
            background: "linear-gradient(to top, var(--color-background), transparent)",
          }}
        />

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] px-2 py-0.5 rounded-full text-primary bg-background/80 border border-primary/30 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-5 flex flex-col gap-3 flex-1">

        {/* Title */}
        <div>
          <h3
            className="font-rubik text-lg font-bold text-text leading-tight transition-transform duration-300"
            style={{
              letterSpacing: "-0.02em",
              transform: active ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-primary mt-0.5 truncate">
            {project.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full bg-text/10 transition-opacity duration-300"
          style={{ opacity: active ? 0.5 : 1 }}
        />

        {/* Description — brightens on active */}
        <p
          className="text-xs leading-relaxed flex-1 transition-colors duration-300"
          style={{ color: active ? "var(--color-text)" : "var(--color-subtext)" }}
        >
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-1.5
                font-mono text-xs sm:text-sm uppercase tracking-[0.15em]
                px-3 py-2 rounded-xl
                text-primary hover:text-text
                transition-colors duration-200
                active:scale-95 touch-manipulation
                bg-primary/10 border border-primary/20
              "
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
              Live
            </Link>
          )}
          {project.info_link && (
            <Link
              href={project.info_link}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-1.5
                font-mono text-xs sm:text-sm uppercase tracking-[0.15em]
                px-3 py-2 rounded-xl
                text-subtext hover:text-text
                transition-colors duration-200
                active:scale-95 touch-manipulation
                bg-text/[0.06] border border-text/10
              "
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
              GitHub
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   TAB BAR — horizontally scrollable on mobile
───────────────────────────────────────────── */
const TabBar = ({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) => (
  <div className="relative mb-10">
    {/* Scroll container — no scrollbar, snaps */}
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const count =
          tab.key === "all"
            ? PROJECTS.length
            : PROJECTS.filter((p) => p.category === tab.key).length;

        return (
          <motion.button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            whileTap={{ scale: 0.94 }}
            className="
              relative flex items-center gap-2 flex-shrink-0 snap-start
              font-mono text-xs sm:text-sm uppercase tracking-[0.2em]
              px-4 py-3 rounded-xl
              transition-colors duration-300
              cursor-pointer touch-manipulation
              min-h-[44px]
            "
            style={{
              background: isActive
                ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
                : "color-mix(in srgb, var(--color-text) 5%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isActive
                ? "color-mix(in srgb, var(--color-primary) 40%, transparent)"
                : "color-mix(in srgb, var(--color-text) 10%, transparent)",
              color: isActive ? "var(--color-primary)" : "var(--color-subtext)",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="tab-dot"
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.label}
            <span
              className="text-[11px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold tabular-nums"
              style={{
                background: isActive
                  ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                  : "color-mix(in srgb, var(--color-text) 8%, transparent)",
                color: isActive ? "var(--color-primary)" : "var(--color-subtext)",
              }}
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>

    {/* Fade edge on mobile to hint scrollability */}
    <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
  </div>
);

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const Projects = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered =
    activeTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] mb-3 text-subtext"
          >
            — selected work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-rubik text-4xl sm:text-5xl md:text-7xl font-bold leading-none text-text mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Projects
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-px w-full origin-left bg-text/10"
          />
        </div>

        {/* Tabs */}
        <TabBar active={activeTab} onChange={setActiveTab} />

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
