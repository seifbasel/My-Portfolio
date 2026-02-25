"use client";
import React from "react";
import { motion } from "framer-motion";
import { GridStack } from "@/components/ui/feature-section";

export function TechStack() {
  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading — identical pattern to Services */}
        <div className="mb-16 p-5 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] mb-3 text-subtext"
          >
            — tools of the trade
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-rubik text-4xl sm:text-5xl md:text-7xl font-bold leading-none text-text mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tech Stack
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="h-px w-full origin-left bg-text/10 mt-5"
          />
        </div>

        {/* Grid */}
        <GridStack />
      </div>
    </section>
  );
}

export default TechStack;
