import MilitaryServiceCalendar from "@/components/army-calender";
import { motion } from "motion/react";

type VacationPeriod = {
  startDate: Date;
  endDate: Date;
};

export const ServiceScheduleSection = () => {
  // Set service dates
  const serviceStartDate = new Date("2025-03-08");
  const serviceEndDate = new Date("2026-02-09");

  // Define specific vacation periods
  const vacationPeriods: VacationPeriod[] = [
    {
      startDate: new Date("2026-02-09"),
      endDate: new Date("2026-02-28"),
    }
  ];

  return (
    <div className="bg-background w-full py-12 md:py-20 relative z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-7xl mb-8 font-bold text-text text-center"
        >
          My Service Schedule
        </motion.h2>
        <div className="overflow-x-auto touch-pan-x webkit-touch-scrolling">
          <MilitaryServiceCalendar
            serviceStartDate={serviceStartDate}
            serviceEndDate={serviceEndDate}
            vacationPeriods={vacationPeriods}
            cycleLength={14}
            workDays={7}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceScheduleSection;