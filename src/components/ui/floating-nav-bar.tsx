"use client";
import React, { useState, useEffect, JSX } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkModeEnabled =
      savedTheme
        ? savedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDarkMode(darkModeEnabled);
    document.documentElement.classList.toggle("dark", darkModeEnabled);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const prev = scrollYProgress.getPrevious() ?? 0;
      setVisible(current >= 0.05 && current - prev < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 0, y: -80 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto z-[5000] flex w-fit items-center",
          className
        )}
      >
        {/* ── Container ── */}
        <div className="
          relative flex items-center gap-1 px-2 py-2 rounded-2xl
          bg-background/80 backdrop-blur-xl
          border border-text/10
          shadow-[0_8px_32px_theme(colors.text/8%),0_2px_8px_theme(colors.text/5%)]
        ">

          {/* Top accent line */}
          <div
            className="absolute top-0 left-6 right-6 h-px rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 60%, transparent), transparent)",
            }}
          />

          {/* ── Nav links ── */}
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="
                group relative flex items-center gap-2
                px-3 py-2 rounded-xl
                text-subtext
                transition-colors duration-200
                touch-manipulation
              "
            >
              {/* Hover bg */}
              <span className="
                absolute inset-0 rounded-xl
                bg-text/[0.06] opacity-0
                group-hover:opacity-100
                transition-opacity duration-200
              " />

              {/* Icon — mobile */}
              <motion.span
                className="relative sm:hidden flex items-center justify-center w-6 h-6 text-subtext group-hover:text-primary transition-colors duration-200"
                whileTap={{ scale: 0.88 }}
              >
                {navItem.icon &&
                  React.cloneElement(navItem.icon, {
                    className: "w-5 h-5",
                  } as React.HTMLAttributes<SVGElement>)}
              </motion.span>

              {/* Label — desktop */}
              <span className="
                relative hidden sm:block
                font-mono text-xs sm:text-sm uppercase tracking-[0.18em]
                transition-colors duration-200
                group-hover:text-text
                whitespace-nowrap
              ">
                {navItem.name}
              </span>

              {/* Hover dot */}
              <span className="
                relative hidden sm:block
                w-1 h-1 rounded-full bg-primary
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              " />
            </Link>
          ))}

          {/* ── Divider ── */}
          <div className="w-px self-stretch mx-1 rounded-full bg-text/10" />

          {/* ── Dark mode toggle ── */}
          <motion.button
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Dark Mode"
            aria-pressed={isDarkMode}
            className="
              relative flex items-center gap-2
              px-3 py-2 rounded-xl
              font-mono text-xs sm:text-sm uppercase tracking-[0.18em]
              text-primary
              transition-all duration-200
              touch-manipulation cursor-pointer
              min-h-[36px]
            "
          >
            {/* Button bg */}
            <span className="
              absolute inset-0 rounded-xl
              bg-primary/10 border border-primary/20
            " />

            {/* Sun / Moon icon */}
            <span className="relative flex items-center justify-center w-4 h-4">
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.svg
                    key="sun"
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>

            {/* Label — desktop only */}
            <span className="relative hidden sm:block">
              {isDarkMode ? "Light" : "Dark"}
            </span>
          </motion.button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};


