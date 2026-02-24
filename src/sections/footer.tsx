"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/seifbasel",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/seif-basel-1a09191b9",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/seif.dev",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@seif__basel",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { name: "Journey", href: "#timeline" },
  { name: "Services", href: "#services" },
  { name: "Stack", href: "#TechStack" },
  { name: "Projects", href: "#projects" },
  { name: "Photos", href: "#Photography" },
  { name: "Videos", href: "#videography" },
];

const TYPEWRITER_WORDS = [
  { text: "Build", className: "text-text" },
  { text: "something", className: "text-text" },
  { text: "great", className: "text-text" },
  { text: "with", className: "text-text" },
  { text: "me.", className: "text-primary" },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("seifbasel950@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full relative overflow-hidden" id="contact">

      {/* ── CTA hero with beams ── */}
      <BackgroundBeamsWithCollision className="min-h-[28rem] md:min-h-[36rem] flex flex-col items-center justify-center gap-6 px-4 py-20">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-subtext z-10 relative"
        >
          — let&apos;s work together
        </motion.p>

        {/* Typewriter */}
        <div className="z-10 relative">
          <TypewriterEffectSmooth words={TYPEWRITER_WORDS} />
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 z-10 relative"
        >
          <a
            href="mailto:seifbasel950@gmail.com"
            className="
              flex items-center gap-2 px-6 py-3 rounded-xl
              font-mono text-[11px] uppercase tracking-[0.18em]
              text-primary hover:text-text
              bg-primary/10 border border-primary/20
              hover:bg-primary/20 hover:border-primary/40
              transition-all duration-200 touch-manipulation
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send Email
          </a>

          <motion.button
            onClick={copyEmail}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-2 px-6 py-3 rounded-xl
              font-mono text-[11px] uppercase tracking-[0.18em]
              text-subtext hover:text-text
              bg-text/[0.06] border border-text/10
              hover:bg-text/10
              transition-all duration-200 touch-manipulation
            "
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-primary">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                Copy Email
              </>
            )}
          </motion.button>
        </motion.div>

      </BackgroundBeamsWithCollision>

      {/* ── Bottom bar ── */}
      <div
        className="relative w-full px-4 py-10 border-t border-text/10"
        style={{ background: "color-mix(in srgb, var(--color-background) 60%, var(--color-text) 4%)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Name + copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-rubik text-2xl font-bold text-text tracking-tight">
              Seif Basel
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-subtext">
              © {new Date().getFullYear()} — Full Stack Developer
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-[9px] uppercase tracking-[0.15em] text-subtext hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.92 }}
                aria-label={s.name}
                className="
                  flex items-center justify-center w-9 h-9 rounded-xl
                  text-subtext hover:text-primary
                  bg-text/[0.05] hover:bg-primary/10
                  border border-text/10 hover:border-primary/30
                  transition-all duration-200 touch-manipulation
                "
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-secondary" />
    </footer>
  );
}

export default Footer;