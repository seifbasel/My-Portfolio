"use client";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import React, { useRef } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

/* ── Accent palette — connector lines & dots only ── */
const ACCENTS = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fb923c",
  "#f472b6",
  "#60a5fa",
  "#facc15",
  "#4ade80",
];

/* ─────────────────────────────────────────────────────────────
   CONNECTOR — diagonal line between two zigzag cards
───────────────────────────────────────────────────────────── */
const Connector = ({
  toRight,
  accentFrom,
  accentTo,
  scrollYProgress,
  segStart,
  segEnd,
}: {
  toRight: boolean;
  accentFrom: string;
  accentTo: string;
  scrollYProgress: MotionValue<number>;
  segStart: number;
  segEnd: number;
}) => {
  const pathLength = useTransform(scrollYProgress, [segStart, segEnd], [0, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.01],
    [0, 1],
  );

  const x1 = toRight ? 27.5 : 72.5;
  const x2 = toRight ? 72.5 : 27.5;
  const gradId = `cg-${toRight ? "lr" : "rl"}-${segStart.toFixed(3)}`;
  const path = `M ${x1} 0 L ${x2} 100`;

  return (
    <div className="hidden md:block w-full relative h-20">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        overflow="visible"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1={toRight ? "0%" : "100%"}
            y1="0%"
            x2={toRight ? "100%" : "0%"}
            y2="100%"
          >
            <stop offset="0%" stopColor={accentFrom} />
            <stop offset="100%" stopColor={accentTo} />
          </linearGradient>
        </defs>

        {/* Ghost track */}
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="text-text/10"
        />

        {/* Scroll-driven animated line */}
        <motion.path
          d={path}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, opacity }}
        />
      </svg>

      {/* Dot at connector start */}
      <div
        className="absolute w-2.5 h-2.5 rounded-full border-2 -top-1.5 bg-background"
        style={{
          left: `calc(${x1}% - 5px)`,
          borderColor: accentFrom,
          boxShadow: `0 0 8px ${accentFrom}`,
        }}
      />
      {/* Dot at connector end */}
      <div
        className="absolute w-2.5 h-2.5 rounded-full border-2 -bottom-1.5 bg-background"
        style={{
          left: `calc(${x2}% - 5px)`,
          borderColor: accentTo,
          boxShadow: `0 0 8px ${accentTo}`,
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────────── */
const TimelineCard = ({
  entry,
  index,
  side,
}: {
  entry: TimelineEntry;
  index: number;
  side: "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      className={`w-full md:w-[55%] ${side === "right" ? "md:ml-auto" : ""}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.18 } }}
        className="relative flex flex-col rounded-2xl overflow-hidden bg-background/90 shadow-lg"
        style={{ border: `1px solid ${accent}28` }}
      >
        {/* Top accent bar */}
        <div
          className="h-0.5 w-full flex-shrink-0"
          style={{ background: accent }}
        />

        {/* Header row */}
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-primary">
            {entry.title}
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-subtext">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="px-5 pt-2 pb-5 flex flex-col gap-3">
          {/* Divider */}
          <div className="h-px w-full" style={{ background: `${accent}1a` }} />

          {/* Content */}
          <div className="text-sm leading-relaxed text-subtext">
            {entry.content}
          </div>
        </div>

        {/* Subtle top glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accent}09 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN TIMELINE
───────────────────────────────────────────────────────────── */
export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  const N = data.length;
  const C = Math.max(N - 1, 1);

  return (
    <div className="w-full">
      {/* ── Heading ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] mb-3 text-subtext"
        >
          — career timeline
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-rubik text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-5 tracking-tight text-text"
          style={{ letterSpacing: "-0.03em" }}
        >
          My Journey
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-px w-full origin-left bg-text/10"
        />
      </div>

      {/* ── Zigzag body ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 pb-24" ref={containerRef}>
        {/* Desktop zigzag */}
        <div className="hidden md:block">
          {data.map((entry, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const isLast = i === N - 1;
            const accentFrom = ACCENTS[i % ACCENTS.length];
            const accentTo = ACCENTS[(i + 1) % ACCENTS.length];
            const segStart = i / C;
            const segEnd = (i + 1) / C;

            return (
              <div key={i}>
                <TimelineCard entry={entry} index={i} side={side} />
                {!isLast && (
                  <Connector
                    toRight={side === "left"}
                    accentFrom={accentFrom}
                    accentTo={accentTo}
                    scrollYProgress={scrollYProgress}
                    segStart={segStart}
                    segEnd={segEnd}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile — stacked with left rail */}
        <div className="md:hidden relative pl-8">
          {/* Static rail */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-text/10" />

          {/* Scroll-driven colored fill */}
          <motion.div
            className="absolute left-3 top-0 w-px origin-top"
            style={{
              scaleY: scrollYProgress,
              height: "100%",
              background:
                "linear-gradient(to bottom, #38bdf8, #a78bfa, #34d399, #fb923c, #f472b6, #60a5fa, #facc15, #4ade80)",
            }}
          />

          <div className="flex flex-col gap-5">
            {data.map((entry, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div key={i} className="relative">
                  <div
                    className="absolute -left-[21px] top-5 w-3 h-3 rounded-full border-2 bg-background"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 8px ${accent}`,
                      zIndex: 2,
                    }}
                  />
                  <TimelineCard entry={entry} index={i} side="left" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
