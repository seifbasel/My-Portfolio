"use client";
import { FocusCards } from "@/components/focus-cards";
import { motion } from "framer-motion";
import React from "react";

const cards = [
  { title: "Cairo Train Station",    src: "/cam_images/1.jpg"  },
  { title: "Random Bird in a Tree",  src: "/cam_images/2.jpg"  },
  { title: "Karnak Temple",          src: "/cam_images/3.jpg"  },
  { title: "Random Bird in a Tree",  src: "/cam_images/4.jpg"  },
  { title: "Aswan Nile River",       src: "/cam_images/5.jpg"  },
  { title: "My Setup",               src: "/cam_images/6.jpg"  },
  { title: "Luxor Nile River",       src: "/cam_images/7.jpg"  },
  { title: "Ras Elbar Sunset",       src: "/cam_images/8.jpg"  },
  { title: "Ras Elbar Streets",      src: "/cam_images/9.jpg"  },
  { title: "Sharm El-Sheikh Red Sea",src: "/cam_images/10.jpg" },
  { title: "Cairo Tower",            src: "/cam_images/11.jpg" },
  { title: "Ras Elbar Sea",          src: "/cam_images/12.jpg" },
];

const PhotoCards = () => (
  <section className="w-full py-24 px-4">
    <div className="max-w-6xl mx-auto">

      {/* Heading — same pattern as Services / Tech Stack / Projects */}
      <div className="mb-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3 text-subtext"
        >
          — through the lens
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-rubik text-5xl md:text-7xl font-bold leading-none text-text mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Photography
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-px w-full origin-left bg-text/10"
        />
      </div>

      <FocusCards cards={cards} />
    </div>
  </section>
);

export default PhotoCards;