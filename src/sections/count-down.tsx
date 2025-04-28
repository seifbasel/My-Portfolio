import MilitaryServiceCountdown from "@/components/army-count-down";
import { motion } from "motion/react";

export const MilitaryCountdownSection = () => {

    const serviceEndDate = new Date("2026-03-01");
    const serviceStartDate = new Date("2025-03-01");
  
  return (
    <div className="bg-background dark:bg-darkBackground w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-7xl mb-8 font-bold text-lighttext dark:text-darktext text-center"
        >
          Military Service
        </motion.h2>
        
        <MilitaryServiceCountdown 
          endDate={serviceEndDate}
          startDate={serviceStartDate}
          title="Countdown to Civilian Life"
          description="Tracking my remaining time in military service"
        />
      </div>
    </div>
  );
};

export default MilitaryServiceCountdown;