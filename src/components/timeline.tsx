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
      className="w-full bg-background font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 , delay: 0.2 }}
          className="text-4xl md:text-7xl mb-4 font-bold text-text font-rubik"
        >
          My journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary text-sm md:text-xl font-rubik"
        >
          I&apos;m Seif Basel a full-stack developer and I&apos;ve been working
          as a software engineer for the past 2 years. Here&apos;s a timeline of
          my journey.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} isEven={index % 2 === 0} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-background dark:subtitle to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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
  const isInView = useInView(ref, { margin: "-100px 0px" });
  const isContentInView = useInView(contentRef, { margin: "-50px 0px" });

  const gradientStart = isEven ? 'from-primary' : 'from-secondary';
  const gradientEnd = isEven ? 'to-purple-500' : 'to-blue-500';

  return (
    <div ref={ref} className="flex justify-start pt-10 pb-10 md:pt-40 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-text flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-background border border-text p-2" />
        </div>
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: .5, delay: 0.5 }}
          className="hidden md:block text-xl md:pl-20 md:text-5xl  font-rubik text-text"
        >
          {item.title}
        </motion.h3>
      </div>

      <div className="relative pl-16 md:pr-4 md:pl-4 w-full">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className={`rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden
                     ${isContentInView ? 'shadow-xl' : 'shadow-md'} 
                     border border-opacity-20 ${isEven ? 'border-primary/30' : 'border-secondary/30'}
                     backdrop-blur-md transform-gpu hover:scale-[1.01] hover:-translate-y-1`}
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)"
          }}
        >
          {/* Modern glass morphism effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientStart} ${gradientEnd} opacity-10`} />
          
          {/* Enhanced shine effect */}
          <div className={`absolute -inset-full h-[400%] w-[400%] rotate-45 bg-gradient-to-tr from-white/10 via-white/5 to-transparent animate-slowShine`} />
          
          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:hidden block text-3xl mb-4 text-left font-rubik bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              {item.title}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`timeline-content font-rubik transition-all duration-500 ${isContentInView ? 'opacity-100' : 'opacity-90'}`}
            >
              {item.content}
            </motion.div>
          </div>
          
          {/* Modern accent elements */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-secondary/70 ${isContentInView ? 'opacity-100' : 'opacity-50'} transition-opacity duration-700`} />
          
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-3xl" />
        </motion.div>
      </div>
    </div>
  );
};