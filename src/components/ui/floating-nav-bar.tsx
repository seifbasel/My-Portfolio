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
          "flex max-w-fit bg-background fixed top-10 inset-x-0 mx-auto border rounded-full shadow-md z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className="relative flex items-center space-x-1 hover:text-secondary transition-colors duration-200"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="border text-sm font-medium relative border-secondary text-text px-4 py-2 rounded-full"
          aria-label="Toggle Dark Mode"
          aria-pressed={isDarkMode ? "true" : "false"}
        >
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
