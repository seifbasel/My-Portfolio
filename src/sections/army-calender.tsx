import MilitaryServiceCalendar from "@/components/army-calender";
import { motion } from "motion/react";

type VacationPeriod = {
  startDate: Date;
  endDate: Date;
};

export const ServiceScheduleSection = () => {
  // Set your actual service dates
  const serviceStartDate = new Date("2025-03-15"); // Start date March 2
  const serviceEndDate = new Date("2026-03-01"); // End date March 1 next year

  // Make sure to set the exact dates for your vacation
  const vacationPeriods: VacationPeriod[] = [
    // {
    //   startDate: new Date("2025-04-5"),
    //   endDate: new Date("2025-04-11"),
    // },
  ];

  
  return (
    <div className="bg-background  w-full py-12 md:py-20 relative z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-7xl mb-8 font-bold text-lighttext dark:text-darktext text-center"
        >
          My Service Schedule
        </motion.h2>
        <div className="overflow-x-auto touch-pan-x webkit-touch-scrolling">
          <MilitaryServiceCalendar
            serviceStartDate={serviceStartDate}
            serviceEndDate={serviceEndDate}
            vacationPeriods={vacationPeriods}
            cycleLength={21} // 21 day cycle (14 duty days + 7 vacation days)
            workDays={14} // 14 work days, 7 vacation days
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceScheduleSection;