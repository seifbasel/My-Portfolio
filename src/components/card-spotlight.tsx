"use client";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "rgba(138, 180, 248, 0.1)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl transition-all duration-300 hover:shadow-primary/20",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.3),
              transparent 80%
            )
          `,
        }}
      />
      
      {isHovering && (
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="absolute inset-0 -z-10 opacity-30"
          colors={[
            [59, 130, 246],
            [139, 92, 246],
          ]}
          dotSize={2}
        />
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};