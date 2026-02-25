"use client";
import ReelsVideos from "@/components/video-player";
import { motion } from "framer-motion";

const videos = [
  {
    id: 1,
    src: "/videos/1.mp4",
    title: "Day as Software Engineer",
    coverImage: "/images/cover1.JPG",
  },
  {
    id: 2,
    src: "/videos/2.mp4",
    title: "Daily Life",
    coverImage: "/images/cover2.JPG",
  },
  {
    id: 3,
    src: "/videos/3.mp4",
    title: "2024 Recap",
    coverImage: "/images/cover3.JPG",
  },
  {
    id: 4,
    src: "/videos/4.mp4",
    title: "Military Life",
    coverImage: "/images/cover4.JPG",
  },
];

export default function ReelsVideosContainer() {
  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading — same pattern as all other sections */}
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] mb-3 text-subtext"
          >
            — behind the lens
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-rubik text-4xl sm:text-5xl md:text-7xl font-bold leading-none text-text mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Videography
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-px w-full origin-left bg-text/10"
          />
        </div>

        {/* Player — constrained width, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl  mx-auto"
        >
          <ReelsVideos videos={videos} />
        </motion.div>
      </div>
    </section>
  );
}
