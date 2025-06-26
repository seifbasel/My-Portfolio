"use client";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans bg-background md:px-10"
      ref={containerRef}
    >
      <div className="px-4 mx-auto max-w-7xl md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-4 text-4xl font-semibold tracking-tight text-center md:text-7xl text-text font-rubik md:leading-tight"
        >
          My journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-3xl py-10 mx-auto text-center text-subtext md:text-xl"
        >
          I&apos;m Seif Basel a full-stack developer and I&apos;ve been working
          as a software engineer for the past 2 years. Here&apos;s a timeline of
          my journey.
        </motion.p>
      </div>

      <div ref={ref} className="relative pb-20 mx-auto max-w-7xl">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} isEven={index % 2 === 0} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 bg-text overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-background dark:subtitle to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[10px] bg-gradient-to-t from-primary via-purple-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, isEven }: { item: TimelineEntry; isEven: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px 0px", once: true });
  const isContentInView = useInView(contentRef, { margin: "-30px 0px", once: true });

  const gradientStart = isEven ? 'from-primary/10' : 'from-secondary/10';
  const gradientEnd = isEven ? 'to-purple-500/10' : 'to-blue-500/10';
  const accentColor = isEven ? 'primary' : 'secondary';

  return (
    <div ref={ref} className="flex justify-start pt-10 pb-10 md:pt-40 md:gap-10">
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="absolute flex items-center justify-center w-10 h-10 rounded-full shadow-lg left-3 md:left-3 bg-text"
        >
          <div className={`h-4 w-4 rounded-full bg-${accentColor} shadow-md animate-pulse`} />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="hidden text-xl md:block md:pl-20 md:text-5xl font-rubik text-text"
        >
          {item.title}
        </motion.h3>
      </div>

      <div className="relative w-full pl-16 md:pr-4 md:pl-4">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className={`group rounded-3xl p-6 md:p-8 transition-all duration-700 ease-out relative overflow-hidden
                     bg-gradient-to-br from-white/5 to-white/10 dark:from-black/10 dark:to-black/20
                     border border-white/20 dark:border-white/10
                     backdrop-blur-xl backdrop-saturate-150
                     shadow-lg hover:shadow-2xl hover:shadow-${accentColor}/10
                     transform-gpu hover:scale-[1.02] hover:-translate-y-1`}
          style={{
            backdropFilter: "blur(16px) saturate(1.5)",
            WebkitBackdropFilter: "blur(16px) saturate(1.5)"
          }}
        >
          {/* Refined gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientStart} ${gradientEnd} opacity-60`} />
          
          {/* Subtle animated mesh background */}
          <div className="absolute inset-0 opacity-20">
            <div className={`absolute inset-0 bg-gradient-to-r from-${accentColor}/20 via-transparent to-${accentColor}/20 animate-pulse`} />
          </div>
          
          {/* Refined shimmer effect */}
          <div className="absolute w-full h-full rotate-45 -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
          
          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className={`md:hidden block text-3xl mb-6 text-left font-rubik font-bold
                         bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary/70`}
            >
              {item.title}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="leading-relaxed timeline-content font-rubik text-text/90"
            >
              {item.content}
            </motion.div>
          </div>
          
          {/* Modern accent bar */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isContentInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${accentColor} to-${accentColor}/50 origin-left`} 
          />
          
          {/* Refined corner accents */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${accentColor}/15 to-transparent rounded-bl-3xl`} />
          <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-${accentColor}/15 to-transparent rounded-tr-3xl`} />
          
          {/* Inner glow effect */}
          <div className={`absolute inset-0 rounded-3xl shadow-inner shadow-${accentColor}/10 pointer-events-none`} />
        </motion.div>
      </div>
    </div>
  );
};