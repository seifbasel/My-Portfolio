"use client";
import React, { useRef } from "react";
// import { motion, useInView } from "motion/react";
import { motion, useInView } from "framer-motion";
import { GridStack } from "@/components/ui/feature-section";

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto"
    >
      <div className="px-8">
        <motion.h4
          variants={itemVariants}
          className="text-4xl md:text-7xl text-lighttext dark:text-darktext font-bold lg:leading-tight mx-auto text-center tracking-tight"
        >
          Technology Stack
        </motion.h4>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-xl lg:text-base max-w-2xl my-4 mx-auto text-center font-normal text-secondary"
        >
          Here is a list of technologies that we use to build our product
          including both frontend and backend technologies.
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="relative mx-auto">
        <div className="grid grid-cols-1 justify-center items-center gap-10 rounded-md">
          <GridStack />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TechStack;
