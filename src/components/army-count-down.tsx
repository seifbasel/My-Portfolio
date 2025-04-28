"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { CardSpotlight } from "@/components/card-spotlight";

type MilitaryCountdownProps = {
  endDate: Date;
  startDate?: Date;
  title?: string;
  description?: string;
};

const MilitaryServiceCountdown = ({
  endDate,
  startDate = new Date(),
  title = "Military Service Countdown",
  description = "Tracking my remaining time in service",
}: MilitaryCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [progressPercent, setProgressPercent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      // Calculate total duration and progress
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      const progress = Math.min(
        Math.max((elapsed / totalDuration) * 100, 0),
        100
      );
      setProgressPercent(progress);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <CardSpotlight className="h-auto w-full rounded-2xl p-6">
        <div className="relative z-20">
          <h3 className="text-2xl md:text-4xl font-bold text-text text-center mb-2">
            {title}
          </h3>

          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="relative rounded-full h-4 w-full max-w-md overflow-hidden border-1 border-text">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full  bg-primary"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg md:text-2xl font-bold text-text"
            >
              {progressPercent.toFixed(0)}%
            </motion.h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative z-20 mb-6">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-xl bg-gradient-to-b  from-primary to-transparent flex items-center justify-center mb-2"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={unit.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl md:text-4xl font-bold text-text"
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
              <p className="text-sm md:text-base text-text font-medium">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 relative z-20">
          <p className="text-text text-sm text-center mb-4">{description}</p>

          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-lighttext text-text">
                Start Date: {startDate.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
              <span className="text-lighttext text-text">
                End Date: {endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardSpotlight>
    </motion.div>
  );
};

export default MilitaryServiceCountdown;
