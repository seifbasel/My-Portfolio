"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Service data ── */
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

/* ── Single skill row — hover text via Tailwind group ── */
const SkillItem = ({
  skill,
  delay,
  inView,
}: {
  skill: string;
  delay: number;
  inView: boolean;
}) => (
  <motion.li
    initial={{ opacity: 0, x: -12 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    /* Each skill row is its own group so hover is isolated */
    className="group/skill flex items-center gap-3 cursor-default"
  >
    {/* Animated dot — scales up + glows on row hover */}
    <span
      className="
        w-1.5 h-1.5 rounded-full flex-shrink-0
        bg-primary
        transition-all duration-300
        group-hover/skill:scale-150
        group-hover/skill:shadow-[0_0_6px_var(--color-primary)]
      "
    />
    {/* Text — changes from subtext to text on row hover */}
    <span
      className="
        text-sm
        text-subtext
        transition-colors duration-300
        group-hover/skill:text-text
      "
    >
      {skill}
    </span>
  </motion.li>
);

/* ── Single card ── */
const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      /* Card is the group — child classes use group-hover: */
      className="
        group relative flex flex-col rounded-2xl overflow-hidden cursor-default
        transition-shadow duration-300
        hover:shadow-[0_0_40px_color-mix(in_srgb,var(--color-primary)_15%,transparent)]
      "
      style={{
        background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{
        borderColor: "color-mix(in srgb, var(--color-primary) 50%, transparent)",
      } as never}
    >

      {/* ── Top accent bar — slides in from left on hover ── */}
      <div
        className="
          h-0.5 w-full flex-shrink-0 origin-left
          transition-transform duration-500 ease-out
          scale-x-[0.25] group-hover:scale-x-100
        "
        style={{
          background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
        }}
      />

      {/* ── Shimmer sweep on hover ── */}
      <div
        className="
          absolute inset-0 pointer-events-none z-10
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-700 ease-in-out
          bg-gradient-to-r from-transparent via-white/5 to-transparent
        "
      />

      {/* ── Top glow that fades in on hover ── */}
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

      <div className="relative z-20 p-7 flex flex-col gap-5 flex-1">

        {/* ── Header: big number + tag pill ── */}
        <div className="flex items-start justify-between gap-4">
          {/* Ghost number — fades to primary on card hover */}
          <span
            className="
              font-mono text-6xl font-bold leading-none select-none
              transition-all duration-300
              text-text/[0.07] group-hover:text-primary
            "
            style={{ letterSpacing: "-0.04em" }}
          >
            {service.number}
          </span>

          {/* Tag pill */}
          <span
            className="
              font-mono text-[10px] uppercase tracking-[0.2em]
              px-3 py-1.5 rounded-full flex-shrink-0
              text-primary
              transition-colors duration-300
            "
            style={{
              background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
            }}
          >
            {service.tag}
          </span>
        </div>

        {/* ── Title — slides up slightly on card hover ── */}
        <h3
          className="
            font-rubik text-2xl font-bold leading-tight text-text
            transition-transform duration-300
            group-hover:-translate-y-0.5
          "
          style={{ letterSpacing: "-0.02em" }}
        >
          {service.title}
        </h3>

        {/* ── Divider ── */}
        <div
          className="h-px w-full transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: "color-mix(in srgb, var(--color-text) 10%, transparent)" }}
        />

        {/* ── Skills — staggered on-scroll reveal, individual hover per row ── */}
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

        {/* ── Description — subtle opacity lift on hover ── */}
        <p
          className="
            text-sm leading-relaxed text-subtext mt-auto pt-3
            transition-colors duration-300
            group-hover:text-text/70
          "
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

      {/* Heading */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

    </div>
  </section>
);

export default Services;