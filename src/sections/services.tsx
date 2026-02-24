"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Fullstack Development",
    tag: "Engineering",
    description:
      "Delivering comprehensive fullstack solutions with attractive interfaces and robust backend systems that provide secure and scalable experiences.",
    skills: [
      "Responsive web interfaces",
      "Scalable backend systems",
      "Secure database management",
      "Performance & SEO",
      "Cloud deployment",
    ],
  },
  {
    number: "02",
    title: "Photography",
    tag: "Visual Arts",
    description:
      "Creating stunning visuals that tell your story through professional photography, capturing moments with artistic excellence.",
    skills: [
      "Professional portrait shoots",
      "Outdoor photography",
      "Artistic composition",
      "Creative direction",
      "Fast quality delivery",
    ],
  },
  {
    number: "03",
    title: "Photo & Video Editing",
    tag: "Post-Production",
    description:
      "Transforming raw content into polished masterpieces through expert editing, bringing creative visions to life with professional results.",
    skills: [
      "Advanced Photoshop",
      "Premiere Pro editing",
      "Cinematic effects",
      "Color grading",
      "Multi-platform export",
    ],
  },
];

/* ─────────────────────────────────────────────
   SKILL ITEM
───────────────────────────────────────────── */
const SkillItem = ({
  skill,
  delay,
  inView,
}: {
  skill: string;
  delay: number;
  inView: boolean;
}) => {
  const [touched, setTouched] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group/skill flex items-center gap-3 cursor-default touch-manipulation select-none"
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 400)}
    >
      {/* Dot — desktop: group-hover scales+glows | mobile: touched state */}
      <span
        className={`
          w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary
          transition-all duration-300
          group-hover/skill:scale-150
          group-hover/skill:shadow-[0_0_6px_var(--color-primary)]
          ${touched ? "scale-150 shadow-[0_0_6px_var(--color-primary)]" : ""}
        `}
      />

      {/* Text — desktop: group-hover text-text | mobile: touched state */}
      <span
        className={`
          text-sm transition-colors duration-300
          group-hover/skill:text-text
          ${touched ? "text-text" : "text-subtext"}
        `}
      >
        {skill}
      </span>
    </motion.li>
  );
};

/* ─────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────── */
const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 400)}
      /* Border & shadow driven by `active` via Tailwind conditional classes */
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden
        cursor-default touch-manipulation
        border transition-[border-color,box-shadow] duration-300
        ${active
          ? "border-primary/50 shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_15%,transparent)]"
          : "border-text/10 shadow-none"
        }
      `}
      /* Only color-mix bg stays inline — no Tailwind equivalent */
      style={{ background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)" }}
    >

      {/* Top accent bar */}
      <div
        className={`
          h-0.5 w-full flex-shrink-0 origin-left transition-transform duration-500 ease-out
          ${active ? "scale-x-100" : "scale-x-[0.25]"}
        `}
        /* gradient must stay inline */
        style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
      />

      {/* Shimmer sweep */}
      <div
        className={`
          absolute inset-0 pointer-events-none z-10
          bg-gradient-to-r from-transparent via-white/5 to-transparent
          transition-transform duration-700 ease-in-out
          ${active ? "translate-x-full" : "-translate-x-full"}
        `}
      />

      {/* Top glow */}
      <div
        className={`
          absolute inset-0 rounded-2xl pointer-events-none
          transition-opacity duration-500
          ${active ? "opacity-100" : "opacity-0"}
        `}
        /* radial-gradient with color-mix must stay inline */
        style={{ background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 65%)" }}
      />

      <div className="relative z-20 p-7 flex flex-col gap-5 flex-1">

        {/* Header: number + tag */}
        <div className="flex items-start justify-between gap-4">

          {/* Ghost number — text-text/[0.07] idle → text-primary on active */}
          <span
            className={`
              font-mono text-6xl font-bold leading-none select-none
              transition-colors duration-300
              ${active ? "text-primary" : "text-text/[0.07]"}
            `}
            style={{ letterSpacing: "-0.04em" }}
          >
            {service.number}
          </span>

          {/* Tag pill — color-mix bg+border stays inline, color is Tailwind */}
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex-shrink-0 text-primary border border-primary/20 bg-primary/10"
          >
            {service.tag}
          </span>
        </div>

        {/* Title — micro-lift on active */}
        <h3
          className={`
            font-rubik text-2xl font-bold leading-tight text-text
            transition-transform duration-300
            ${active ? "-translate-y-0.5" : "translate-y-0"}
          `}
          style={{ letterSpacing: "-0.02em" }}
        >
          {service.title}
        </h3>

        {/* Divider */}
        <div
          className={`
            h-px w-full bg-text/10
            transition-opacity duration-300
            ${active ? "opacity-60" : "opacity-100"}
          `}
        />

        {/* Skills */}
        <ul className="flex flex-col gap-2">
          {service.skills.map((skill, i) => (
            <SkillItem
              key={i}
              skill={skill}
              inView={inView}
              delay={index * 0.12 + i * 0.07 + 0.25}
            />
          ))}
        </ul>

        {/* Description — text-subtext idle → text-text/70 on active */}
        <p
          className={`
            text-sm leading-relaxed mt-auto pt-3
            transition-colors duration-300
            ${active ? "text-text/70" : "text-subtext"}
          `}
        >
          {service.description}
        </p>

      </div>
    </motion.div>
  );
};

/* ── Main section ── */
const Services = () => (
  <section className="w-full py-24 px-4">
    <div className="max-w-6xl mx-auto">

      <div className="mb-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3 text-subtext"
        >
          — what i do
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-rubik text-5xl md:text-7xl font-bold leading-none text-text mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Services
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-px w-full origin-left bg-text/10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

    </div>
  </section>
);

export default Services;