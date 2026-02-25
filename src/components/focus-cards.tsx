"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  title: string;
  src: string;
};

/* ─────────────────────────────────────────────
   SINGLE PHOTO CARD
   Desktop: hover → scale, overlay, title slides up
   Mobile:  touch → same via `active` state
───────────────────────────────────────────── */
const PhotoCard = ({
  card,
  index,
  anyHovered,
  onEnter,
  onLeave,
}: {
  card: Card;
  index: number;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) => {
  const [active, setActive] = useState(false);

  const isActive = active; // touch
  const isDimmed = anyHovered && !active; // desktop: dim non-hovered

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => {
        onEnter();
      }}
      onHoverEnd={() => {
        onLeave();
      }}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 500)}
      onTouchCancel={() => setActive(false)}
      className={`
        relative overflow-hidden rounded-2xl aspect-[3/4] cursor-default touch-manipulation
        border transition-all duration-400
        ${
          isActive
            ? "border-primary/50 shadow-[0_0_30px_color-mix(in_srgb,var(--color-primary)_15%,transparent)] scale-[1.02]"
            : "border-text/10"
        }
        ${isDimmed ? "opacity-50 scale-[0.97] blur-[1px]" : "opacity-100"}
      `}
      style={{
        background:
          "color-mix(in srgb, var(--color-background) 60%, var(--color-text) 6%)",
      }}
    >
      {/* Photo */}
      <Image
        src={card.src}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className={`
          object-cover transition-transform duration-500
          ${isActive ? "scale-110" : "scale-100 group-hover:scale-110"}
        `}
      />

      {/* Top accent bar */}
      <div
        className={`
          absolute top-0 left-0 right-0 h-0.5 origin-left z-20
          bg-gradient-to-r from-primary to-secondary
          transition-transform duration-500
          ${isActive ? "scale-x-100" : "scale-x-0"}
        `}
      />

      {/* Dark overlay — lightens on active */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-400
          bg-gradient-to-t from-black/80 via-black/20 to-transparent
          ${isActive ? "opacity-90" : "opacity-40"}
        `}
      />

      {/* Index number — ghost, top right */}
      <span
        className={`
          absolute top-3 right-3 font-mono text-xs font-bold tabular-nums z-10
          transition-opacity duration-300
          ${isActive ? "opacity-0" : "opacity-30"}
        `}
        style={{ color: "var(--color-lighttext)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title block — slides up on active */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-10 p-4
          transition-transform duration-400 ease-out
          ${isActive ? "translate-y-0" : "translate-y-2"}
        `}
      >
        <p
          className={`
          font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-1
          transition-opacity duration-300
          ${isActive ? "opacity-100" : "opacity-0"}
          text-primary
        `}
        >
          — Photography
        </p>
        <h3
          className={`
          font-rubik text-base font-bold leading-tight
          transition-all duration-300
          ${isActive ? "opacity-100 text-lighttext" : "opacity-70 text-lighttext"}
        `}
        >
          {card.title}
        </h3>

        {/* Bottom accent line */}
        <div
          className={`
          h-px mt-2 origin-left
          bg-gradient-to-r from-primary to-transparent
          transition-transform duration-500
          ${isActive ? "scale-x-100" : "scale-x-0"}
        `}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MOBILE LIGHTBOX / SWIPER
   Full-screen card viewer with swipe navigation
───────────────────────────────────────────── */
const MobileGallery = ({ cards }: { cards: Card[] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((i) => (i + dir + cards.length) % cards.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main card */}
      <div
        className="relative overflow-hidden rounded-2xl aspect-[3/4] w-full max-w-sm mx-auto border border-text/10"
        style={{
          background:
            "color-mix(in srgb, var(--color-background) 60%, var(--color-text) 6%)",
        }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-gradient-to-r from-primary to-secondary" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={cards[current].src}
              alt={cards[current].title}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            {/* Index */}
            <span className="absolute top-3 right-3 font-mono text-xs font-bold tabular-nums opacity-40 text-lighttext z-10">
              {String(current + 1).padStart(2, "0")}/
              {String(cards.length).padStart(2, "0")}
            </span>
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-1 text-primary">
                — Photography
              </p>
              <h3 className="font-rubik text-lg font-bold text-lighttext leading-tight">
                {cards[current].title}
              </h3>
              <div className="h-px mt-2 bg-gradient-to-r from-primary to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next tap zones */}
        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-20 flex items-center justify-start pl-3 touch-manipulation"
          aria-label="Previous"
        >
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-20 flex items-center justify-end pr-3 touch-manipulation"
          aria-label="Next"
        >
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`
              h-1 rounded-full transition-all duration-300 touch-manipulation
              ${i === current ? "w-6 bg-primary" : "w-1.5 bg-text/20"}
            `}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`
              relative flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden
              border transition-all duration-200 touch-manipulation
              ${
                i === current
                  ? "border-primary/60 scale-105 shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
                  : "border-text/10 opacity-60 hover:opacity-100"
              }
            `}
            aria-label={card.title}
          >
            <Image
              src={card.src}
              alt={card.title}
              fill
              className="object-fill"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function FocusCards({ cards }: { cards: Card[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* ── Desktop grid ── */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {cards.map((card, index) => (
          <PhotoCard
            key={index}
            card={card}
            index={index}
            anyHovered={hoveredIndex !== null && hoveredIndex !== index}
            onEnter={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* ── Mobile swiper ── */}
      <div className="md:hidden">
        <MobileGallery cards={cards} />
      </div>
    </>
  );
}
