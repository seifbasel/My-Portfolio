"use client";
import { CardSpotlight } from "@/components/card-spotlight";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export function CardSpotlightDemo({
  title,
  steps,
  description,
  icon,
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
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.01] rounded-xl" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -inset-24 bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff0a_0%,#ffffff00_50%,#ffffff0a_100%)] opacity-20 animate-shimmer" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {icon && (
            <div className="w-14 h-14 mb-6 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Image src={icon} alt={`${title} icon`} className="w-8 h-8" />
            </div>
          )}

          <h3 className="text-2xl bg-gradient-to-r from-text to-secondary bg-clip-text text-transparent">
            {title}
          </h3>

          <ul className="mt-6 space-y-3 flex-1">
            {steps.map((step, index) => (
              <Step key={index} title={step} index={index} />
            ))}
          </ul>

          <p className="mt-6 text-sm text-text leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </CardSpotlight>
  );
}

const Step = ({ title, index }: { title: string; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: index * 0.05 + 0.3 },
      }}
      className="flex items-start gap-3 "
    >
      <div className="flex-shrink-0 mt-0.5">
        <CheckIcon />
      </div>
      <span className="text-text text-sm leading-snug">{title}</span>
    </motion.li>
  );
};

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
