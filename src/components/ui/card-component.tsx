"use client";
import { CardSpotlight } from "@/components/card-spotlight";
import { motion } from "framer-motion";
import React from "react";

export function CardSpotlightDemo({
  title,
  steps,
  description,
  className,
  style,
}: {
  title: string;
  steps: string[];
  description: string;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <CardSpotlight className={`h-full ${className}`} style={style}>
      <div className="relative h-full p-8 flex flex-col">
        {/* Enhanced gradient background with better depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-white/[0.02] rounded-xl" />
        
        {/* Subtle border highlight */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />

        {/* Improved shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -inset-32 bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff12_0%,#ffffff00_50%,#ffffff12_100%)] opacity-30 animate-shimmer" />
        </div>

        {/* Content with better spacing and hierarchy */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Title with better typography */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-text mb-2 tracking-tight">
              {title}
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
          </div>

          {/* Steps with improved spacing and visual hierarchy */}
          <div className="flex-1 mb-8">
            <h4 className="text-sm font-medium text-text/80 mb-4 uppercase tracking-wide">
              What I Deliver
            </h4>
            <ul className="space-y-4">
              {steps.map((step, index) => (
                <Step key={index} title={step} index={index} />
              ))}
            </ul>
          </div>

          {/* Description with better contrast and spacing */}
          <div className="pt-6 border-t border-text/10">
            <p className="text-text/90 leading-relaxed text-sm font-medium">
              {description}
            </p>
          </div>
        </div>
      </div>
    </CardSpotlight>
  );
}

const Step = ({ title, index }: { title: string; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { 
          delay: index * 0.08 + 0.2,
          duration: 0.4,
          ease: "easeOut"
        },
      }}
      className="flex items-start gap-4 group"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-none transition-all duration-200" />
          <CheckIcon />
        </div>
      </div>
      <span className="text-text text-sm leading-relaxed capitalize font-medium group-hover:text-primary transition-colors duration-200">
        {title}
      </span>
    </motion.li>
  );
};

const CheckIcon = () => (
  <div className="relative w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M13.3333 4L6 11.3333L2.66667 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);