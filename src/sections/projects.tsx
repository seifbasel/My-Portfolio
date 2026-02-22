"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ── Project data with categories ── */
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

/* ── Tab definitions ── */
const TABS = [
  { key: "all",      label: "All",       number: "00" },
  { key: "fullstack",label: "Fullstack", number: "01" },
  { key: "frontend", label: "Frontend",  number: "02" },
  { key: "games",    label: "Games",     number: "03" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ── Project card ── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden cursor-default
        transition-shadow duration-300
        hover:shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]
      "
      style={{
        background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="
          h-0.5 w-full flex-shrink-0 origin-left
          transition-transform duration-500 ease-out
          scale-x-[0.2] group-hover:scale-x-100
        "
        style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
      />

      {/* Shimmer */}
      <div className="
        absolute inset-0 pointer-events-none z-10
        -translate-x-full group-hover:translate-x-full
        transition-transform duration-700 ease-in-out
        bg-gradient-to-r from-transparent via-white/5 to-transparent
      " />

      {/* Top glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 65%)" }}
      />

      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-40"
          style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }}
        />

        {/* Tags on image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full text-primary"
              style={{
                background: "color-mix(in srgb, var(--color-background) 80%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
                backdropFilter: "blur(6px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-5 flex flex-col gap-3 flex-1">
        {/* Title block */}
        <div>
          <h3
            className="font-rubik text-lg font-bold text-text leading-tight transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary mt-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: "color-mix(in srgb, var(--color-text) 10%, transparent)" }}
        />

        {/* Description */}
        <p className="text-xs leading-relaxed text-subtext transition-colors duration-300 group-hover:text-text/70 flex-1">
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
                group/btn flex items-center gap-1.5
                font-mono text-[10px] uppercase tracking-[0.15em]
                px-3 py-2 rounded-xl
                text-primary
                transition-all duration-300
                hover:text-text
              "
              style={{
                background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                font-mono text-[10px] uppercase tracking-[0.15em]
                px-3 py-2 rounded-xl
                text-subtext
                transition-all duration-300
                hover:text-text
              "
              style={{
                background: "color-mix(in srgb, var(--color-text) 6%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

/* ── Tab bar ── */
const TabBar = ({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) => (
  <div className="flex flex-wrap gap-2 mb-10">
    {TABS.map((tab) => {
      const isActive = active === tab.key;
      const count =
        tab.key === "all"
          ? PROJECTS.length
          : PROJECTS.filter((p) => p.category === tab.key).length;

      return (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className="
            relative flex items-center gap-2
            font-mono text-[11px] uppercase tracking-[0.2em]
            px-4 py-2.5 rounded-xl
            transition-all duration-300
            cursor-pointer
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
          {/* Active dot */}
          {isActive && (
            <motion.span
              layoutId="tab-dot"
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--color-primary)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
          {/* Count badge */}
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tabular-nums"
            style={{
              background: isActive
                ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                : "color-mix(in srgb, var(--color-text) 8%, transparent)",
              color: isActive ? "var(--color-primary)" : "var(--color-subtext)",
            }}
          >
            {count}
          </span>
        </button>
      );
    })}
  </div>
);

/* ── Main section ── */
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
            className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3 text-subtext"
          >
            — selected work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-rubik text-5xl md:text-7xl font-bold leading-none text-text mb-5"
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











// "use client";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence, useInView } from "framer-motion";

// /* ── Project data ── */
// const PROJECTS = [
//   {
//     title: "Coinat",
//     subtitle: "Coin & Currency Exchange Online Store",
//     description:
//       "An e-commerce website for buying and selling authentic coins and currency from various cultures and time periods — a unique marketplace for numismatics enthusiasts.",
//     thumbnail: "/images/coinat-website.png",
//     link: "https://coinat.vercel.app/",
//     info_link: "https://github.com/seifbasel/Coinat-Website",
//     category: "fullstack",
//     tags: ["Next.js", "E-Commerce"],
//   },
//   {
//     title: "TransHub",
//     subtitle: "Localization & Translation Platform",
//     description:
//       "A comprehensive platform that automates the localization and translation process for Transfective, tracking project progress from initiation to delivery and payment.",
//     thumbnail: "/images/transhub.png",
//     link: "https://transhub.vercel.app/",
//     category: "fullstack",
//     tags: ["React", "Django", "PostgreSQL"],
//   },
//   {
//     title: "Transfective HR",
//     subtitle: "Internal Employee Management System",
//     description:
//       "An internal HR system for handling employee tasks, leave requests, interviews, and personnel management, streamlining human resources operations.",
//     thumbnail: "/images/transfective-hr.png",
//     link: "https://transfective-hr.vercel.app/",
//     category: "fullstack",
//     tags: ["React", "Django"],
//   },
//   {
//     title: "Nike Clone",
//     subtitle: "Nike Website Clone",
//     description:
//       "An e-commerce website replicating the Nike online store, featuring product pages and a smooth shopping experience for shoes and clothing.",
//     thumbnail: "/images/nike-website.png",
//     link: "https://e-commerce-nike-website.vercel.app/",
//     info_link: "https://github.com/seifbasel/Nike-E_Commerce-Website",
//     category: "frontend",
//     tags: ["React", "Tailwind"],
//   },
//   {
//     title: "Prova 3D",
//     subtitle: "Virtual Try-On Platform",
//     description:
//       "An innovative AR platform letting users virtually try on clothes and shoes, enhancing the online shopping experience with 3D visualization.",
//     thumbnail: "/images/prova-3d-website.png",
//     link: "https://prova-3d.vercel.app/",
//     info_link: "https://github.com/seifbasel/Prova-3d-Website",
//     category: "frontend",
//     tags: ["React", "AR", "3D"],
//   },
//   {
//     title: "LMS",
//     subtitle: "Library Management System",
//     description:
//       "A system managing library operations — tracking books, user accounts, check-in/out, and overdue records with a clean admin interface.",
//     thumbnail: "/images/lms_website.png",
//     info_link: "https://github.com/seifbasel/Library-Management-System-Website",
//     category: "fullstack",
//     tags: ["Django", "Python", "SQL"],
//   },
//   {
//     title: "Diabetes AI",
//     subtitle: "Diabetes Classification App",
//     description:
//       "A web application predicting diabetes likelihood from health data using machine learning algorithms with an intuitive input interface.",
//     thumbnail: "/images/Diabetes-Classification.png",
//     link: "https://github.com/seifbasel/Diabetes-Classification-Website/blob/main/project%20demo.mp4",
//     info_link: "https://github.com/seifbasel/Diabetes-Classification-Website",
//     category: "fullstack",
//     tags: ["Python", "ML", "Django"],
//   },
//   {
//     title: "COSMOS",
//     subtitle: "Space Exploration Website",
//     description:
//       "An immersive responsive website showcasing our solar system with modern UI elements, smooth animations, and an engaging user experience.",
//     thumbnail: "/images/cosmo.png",
//     link: "https://seifbasel.github.io/Space-Exploration-Site/",
//     info_link: "https://github.com/seifbasel/Space-Exploration-Site",
//     category: "frontend",
//     tags: ["HTML", "CSS", "JS"],
//   },
//   {
//     title: "XO Master",
//     subtitle: "Tic-Tac-Toe Game",
//     description:
//       "A responsive and interactive Tic-Tac-Toe game with modern UI, smooth animations, and multiplayer functionality.",
//     thumbnail: "/images/xo.png",
//     link: "https://seifbasel.github.io/X-O-Game-Website/",
//     info_link: "https://github.com/seifbasel/X-O-Game-Website",
//     category: "games",
//     tags: ["HTML", "CSS", "JS"],
//   },
// ];

// const TABS = [
//   { key: "all",       label: "All" },
//   { key: "fullstack", label: "Fullstack" },
//   { key: "frontend",  label: "Frontend" },
//   { key: "games",     label: "Games" },
// ] as const;

// type TabKey = (typeof TABS)[number]["key"];

// /* ─────────────────────────────────────────────
//    PROJECT CARD
//    On mobile: tap anywhere on the card to toggle
//    the detail drawer (description + buttons).
//    On desktop: hover does the same via CSS group.
// ───────────────────────────────────────────── */
// const ProjectCard = ({
//   project,
//   index,
// }: {
//   project: (typeof PROJECTS)[0];
//   index: number;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   /* mobile tap state */
//   const [expanded, setExpanded] = useState(false);

//   const toggle = () => setExpanded((v) => !v);

//   return (
//     <motion.div
//       ref={ref}
//       layout
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
//       /* group drives desktop hover; `expanded` drives mobile tap */
//       onClick={toggle}
//       className={`
//         group relative flex flex-col rounded-2xl overflow-hidden
//         select-none touch-manipulation
//         transition-shadow duration-300 cursor-pointer
//         ${expanded
//           ? "shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_15%,transparent)]"
//           : "hover:shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
//         }
//       `}
//       style={{
//         background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)",
//         borderWidth: "1px",
//         borderStyle: "solid",
//         borderColor: expanded
//           ? "color-mix(in srgb, var(--color-primary) 45%, transparent)"
//           : "color-mix(in srgb, var(--color-text) 10%, transparent)",
//         transition: "border-color 0.3s, box-shadow 0.3s",
//       }}
//     >
//       {/* Top accent bar — full when expanded/hovered */}
//       <div
//         className={`
//           h-0.5 w-full flex-shrink-0 origin-left
//           transition-transform duration-500 ease-out
//           ${expanded ? "scale-x-100" : "scale-x-[0.2] group-hover:scale-x-100"}
//         `}
//         style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
//       />

//       {/* Shimmer */}
//       <div className={`
//         absolute inset-0 pointer-events-none z-10
//         transition-transform duration-700 ease-in-out
//         bg-gradient-to-r from-transparent via-white/5 to-transparent
//         ${expanded ? "translate-x-full" : "-translate-x-full group-hover:translate-x-full"}
//       `} />

//       {/* Top glow */}
//       <div
//         className={`
//           absolute inset-0 rounded-2xl pointer-events-none
//           transition-opacity duration-500
//           ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
//         `}
//         style={{ background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 65%)" }}
//       />

//       {/* Thumbnail */}
//       <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: 180 }}>
//         <Image
//           src={project.thumbnail}
//           alt={project.title}
//           fill
//           className={`object-cover transition-transform duration-500 ${expanded ? "scale-105" : "group-hover:scale-105"}`}
//         />
//         <div
//           className={`absolute inset-0 transition-opacity duration-300 ${expanded ? "opacity-30" : "opacity-60 group-hover:opacity-30"}`}
//           style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }}
//         />

//         {/* Tags */}
//         <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
//           {project.tags.map((tag, i) => (
//             <span
//               key={i}
//               className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full text-primary"
//               style={{
//                 background: "color-mix(in srgb, var(--color-background) 80%, transparent)",
//                 border: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
//                 backdropFilter: "blur(6px)",
//               }}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Mobile tap hint — only shown when not expanded */}
//         <div className={`
//           absolute top-3 right-3 z-10
//           md:hidden
//           transition-opacity duration-300
//           ${expanded ? "opacity-0" : "opacity-100"}
//         `}>
//           <span
//             className="font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-1 rounded-full text-subtext flex items-center gap-1"
//             style={{
//               background: "color-mix(in srgb, var(--color-background) 75%, transparent)",
//               border: "1px solid color-mix(in srgb, var(--color-text) 12%, transparent)",
//               backdropFilter: "blur(6px)",
//             }}
//           >
//             <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M12 5v14M5 12h14" />
//             </svg>
//             Tap
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-20 p-5 flex flex-col gap-3 flex-1">

//         {/* Title row */}
//         <div className="flex items-start justify-between gap-2">
//           <div className="flex-1 min-w-0">
//             <h3
//               className={`font-rubik text-lg font-bold text-text leading-tight transition-transform duration-300 ${expanded ? "-translate-y-0.5" : "group-hover:-translate-y-0.5"}`}
//               style={{ letterSpacing: "-0.02em" }}
//             >
//               {project.title}
//             </h3>
//             <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary mt-0.5 truncate">
//               {project.subtitle}
//             </p>
//           </div>

//           {/* Expand chevron — mobile only */}
//           <motion.div
//             animate={{ rotate: expanded ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="flex-shrink-0 md:hidden mt-1"
//           >
//             <svg
//               className="w-4 h-4 text-subtext"
//               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
//               strokeLinecap="round" strokeLinejoin="round"
//             >
//               <path d="M6 9l6 6 6-6" />
//             </svg>
//           </motion.div>
//         </div>

//         {/* Divider */}
//         <div
//           className={`h-px w-full transition-opacity duration-300 ${expanded ? "opacity-50" : "group-hover:opacity-50 opacity-100"}`}
//           style={{ background: "color-mix(in srgb, var(--color-text) 10%, transparent)" }}
//         />

//         {/* Description — always visible on desktop (via group-hover), toggled on mobile */}
//         <AnimatePresence initial={false}>
//           {/* Mobile: show only when expanded */}
//           <motion.div
//             key="mobile-desc"
//             className="md:hidden overflow-hidden"
//             initial={false}
//             animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
//             transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <p className="text-xs leading-relaxed text-subtext pb-1">
//               {project.description}
//             </p>
//           </motion.div>
//         </AnimatePresence>

//         {/* Desktop: always show description (opacity controlled by group) */}
//         <p className="hidden md:block text-xs leading-relaxed text-subtext transition-colors duration-300 group-hover:text-text/70 flex-1">
//           {project.description}
//         </p>

//         {/* Action buttons — always touch-accessible, bigger tap targets */}
//         <div
//           className={`
//             flex gap-2 pt-1
//             overflow-hidden transition-all duration-300
//             ${expanded ? "max-h-20 opacity-100" : "md:max-h-20 md:opacity-100 max-h-0 opacity-0"}
//           `}
//         >
//           {project.link && (
//             <Link
//               href={project.link}
//               target="_blank"
//               rel="noreferrer"
//               /* stop tap-to-expand from firing when tapping the button */
//               onClick={(e) => e.stopPropagation()}
//               className="
//                 flex items-center gap-2
//                 font-mono text-[10px] uppercase tracking-[0.15em]
//                 px-4 py-3 rounded-xl
//                 text-primary
//                 transition-all duration-200
//                 active:scale-95
//                 hover:text-text
//                 min-h-[44px]
//               "
//               style={{
//                 background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
//                 border: "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
//               }}
//             >
//               <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M7 7h10v10" /><path d="M7 17 17 7" />
//               </svg>
//               Live
//             </Link>
//           )}
//           {project.info_link && (
//             <Link
//               href={project.info_link}
//               target="_blank"
//               rel="noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               className="
//                 flex items-center gap-2
//                 font-mono text-[10px] uppercase tracking-[0.15em]
//                 px-4 py-3 rounded-xl
//                 text-subtext
//                 transition-all duration-200
//                 active:scale-95
//                 hover:text-text
//                 min-h-[44px]
//               "
//               style={{
//                 background: "color-mix(in srgb, var(--color-text) 6%, transparent)",
//                 border: "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)",
//               }}
//             >
//               <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
//               </svg>
//               GitHub
//             </Link>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// /* ─────────────────────────────────────────────
//    TAB BAR — horizontally scrollable on mobile
// ───────────────────────────────────────────── */
// const TabBar = ({
//   active,
//   onChange,
// }: {
//   active: TabKey;
//   onChange: (k: TabKey) => void;
// }) => (
//   <div className="relative mb-10">
//     {/* Scroll container — no scrollbar, snaps */}
//     <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
//       {TABS.map((tab) => {
//         const isActive = active === tab.key;
//         const count =
//           tab.key === "all"
//             ? PROJECTS.length
//             : PROJECTS.filter((p) => p.category === tab.key).length;

//         return (
//           <motion.button
//             key={tab.key}
//             onClick={() => onChange(tab.key)}
//             whileTap={{ scale: 0.94 }}
//             className="
//               relative flex items-center gap-2 flex-shrink-0 snap-start
//               font-mono text-[11px] uppercase tracking-[0.2em]
//               px-4 py-3 rounded-xl
//               transition-colors duration-300
//               cursor-pointer touch-manipulation
//               min-h-[44px]
//             "
//             style={{
//               background: isActive
//                 ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
//                 : "color-mix(in srgb, var(--color-text) 5%, transparent)",
//               borderWidth: "1px",
//               borderStyle: "solid",
//               borderColor: isActive
//                 ? "color-mix(in srgb, var(--color-primary) 40%, transparent)"
//                 : "color-mix(in srgb, var(--color-text) 10%, transparent)",
//               color: isActive ? "var(--color-primary)" : "var(--color-subtext)",
//             }}
//           >
//             {isActive && (
//               <motion.span
//                 layoutId="tab-dot"
//                 className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary"
//                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
//               />
//             )}
//             {tab.label}
//             <span
//               className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tabular-nums"
//               style={{
//                 background: isActive
//                   ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
//                   : "color-mix(in srgb, var(--color-text) 8%, transparent)",
//                 color: isActive ? "var(--color-primary)" : "var(--color-subtext)",
//               }}
//             >
//               {count}
//             </span>
//           </motion.button>
//         );
//       })}
//     </div>

//     {/* Fade edge on mobile to hint scrollability */}
//     <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
//   </div>
// );

// /* ─────────────────────────────────────────────
//    MAIN SECTION
// ───────────────────────────────────────────── */
// const Projects = () => {
//   const [activeTab, setActiveTab] = useState<TabKey>("all");

//   const filtered =
//     activeTab === "all"
//       ? PROJECTS
//       : PROJECTS.filter((p) => p.category === activeTab);

//   return (
//     <section className="w-full py-24 px-4">
//       <div className="max-w-6xl mx-auto">

//         {/* Heading */}
//         <div className="mb-12 max-w-2xl">
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3 text-subtext"
//           >
//             — selected work
//           </motion.p>

//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.08 }}
//             className="font-rubik text-5xl md:text-7xl font-bold leading-none text-text mb-5"
//             style={{ letterSpacing: "-0.03em" }}
//           >
//             Projects
//           </motion.h2>

//           <motion.div
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.15 }}
//             className="h-px w-full origin-left bg-text/10"
//           />
//         </div>

//         {/* Tabs */}
//         <TabBar active={activeTab} onChange={setActiveTab} />

//         {/* Grid */}
//         <motion.div
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
//         >
//           <AnimatePresence mode="popLayout">
//             {filtered.map((project, i) => (
//               <ProjectCard key={project.title} project={project} index={i} />
//             ))}
//           </AnimatePresence>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Projects;