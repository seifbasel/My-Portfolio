"use client";
import React, { useState, useEffect, JSX } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
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

  // Initialize dark mode based on localStorage on mount
  useEffect(() => {
    const darkModeEnabled = localStorage.getItem("theme") === "dark";
    setIsDarkMode(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and store the preference
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Handle visibility of nav bar based on scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious() ?? 0; // fallback to 0 if undefined
      const direction = current - previous;
      setVisible(scrollYProgress.get() >= 0.05 && direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit bg-background border-text fixed top-10 inset-x-0 mx-auto border rounded-full shadow-lg z-[5000] px-4 py-3 sm:px-6 sm:py-4 items-center justify-center space-x-3 sm:space-x-6",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className="relative flex items-center space-x-2 text-text hover:text-primary transition-all duration-300 group font-semibold text-base sm:text-lg tracking-wide font-poppins"
          >
            <motion.span
              className="block sm:hidden p-2 rounded-full hover:bg-primary/20 transition-colors duration-200"
              whileHover={{ scale: 1.3, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              {React.cloneElement(navItem.icon!, { className: "h-6 w-6 sm:h-5 sm:w-5" })}
            </motion.span>
            <motion.span
              className="hidden font-rubik-italic sm:block text-base sm:text-lg drop-shadow-xl shadow-primary group-hover:drop-shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {navItem.name}
            </motion.span>
          </Link>
        ))}
        {/* Dark Mode Toggle Button */}
        <motion.button
          onClick={toggleDarkMode}
          className="border text-sm sm:text-base font-semibold relative border-primary text-text px-3 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
          aria-label="Toggle Dark Mode"
          aria-pressed={isDarkMode ? "true" : "false"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="font-poppins tracking-wide drop-shadow-sm">
            {isDarkMode ? "Light" : "Dark"}
          </span>
          <span className="absolute inset-x-0 w-2/3 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};