"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: number;
  src: string;
  title: string;
  coverImage: string;
}

export default function ReelsVideos({ videos }: { videos: Video[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = (dir: number) => {
    setPlaying(false);
    setCurrent((i) => (i + dir + videos.length) % videos.length);
  };

  const goTo = (i: number) => {
    if (i === current) return;
    setPlaying(false);
    setCurrent(i);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* ── Main reel card ── */}
      <div
        className="w-full max-w-xs rounded-2xl overflow-hidden border border-text/10"
        style={{ background: "color-mix(in srgb, var(--color-background) 80%, var(--color-text) 6%)" }}
      >
        {/* Top accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-primary to-secondary" />

        {/* 9:16 video container */}
        <div className="relative w-full aspect-[9/16] bg-black overflow-hidden">

          <video
            ref={videoRef}
            key={videos[current].id}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source src={videos[current].src} type="video/mp4" />
          </video>

          {/* Cover overlay — fades out on play */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                key={`cover-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-10 pointer-events-none"
              >
                <Image
                  src={videos[current].coverImage}
                  alt={videos[current].title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Counter badge */}
                <div className="absolute top-3 right-3 font-mono text-[9px] tabular-nums text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                  {String(current + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
                </div>

                {/* Title block */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary mb-1">
                    — Videography
                  </p>
                  <h3 className="font-rubik text-lg font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {videos[current].title}
                  </h3>
                  <div className="h-px mt-2 bg-gradient-to-r from-primary to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center gap-2 px-4 py-3">
          <motion.button
            onClick={() => go(-1)}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-[10px] uppercase tracking-[0.15em] text-subtext hover:text-text bg-text/[0.06] border border-text/10 transition-colors duration-200 touch-manipulation"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Prev
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-1.5 mx-auto">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-300 touch-manipulation ${i === current ? "w-6 bg-primary" : "w-1.5 bg-text/20 hover:bg-text/40"}`}
                aria-label={`Video ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-[10px] uppercase tracking-[0.15em] text-primary hover:text-text bg-primary/10 border border-primary/20 transition-colors duration-200 touch-manipulation"
          >
            Next
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 w-full max-w-xs scrollbar-none">
        {videos.map((video, i) => (
          <motion.button
            key={video.id}
            onClick={() => goTo(i)}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-200 touch-manipulation ${
              i === current
                ? "border-primary/60 scale-105 shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
                : "border-text/10 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-16 h-24 relative">
              <Image src={video.coverImage} alt={video.title} fill className="object-cover" />
            </div>

            {/* Accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary to-secondary transition-transform duration-300 ${i === current ? "scale-x-100" : "scale-x-0"}`} />

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1">
              <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-white/80 truncate leading-tight">
                {video.title}
              </p>
            </div>

            {/* Playing badge */}
            {i === current && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}