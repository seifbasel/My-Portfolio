"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { X } from "lucide-react";

type VacationPeriod = {
  startDate: Date;
  endDate: Date;
  description?: string;
};

type MilitaryCalendarProps = {
  serviceStartDate: Date;
  serviceEndDate: Date;
  vacationPeriods: VacationPeriod[];
  cycleLength?: number;
  workDays?: number;
};

// Safari-safe date formatting helper
const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const getMonthsUntil = (end: Date): Date[] => {
  const months: Date[] = [];
  const now = new Date();
  let current = new Date(now.getFullYear(), now.getMonth(), 1);

  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

// Helper to find the next Wednesday (or same day if already Wednesday)
const getNextWednesday = (date: Date): Date => {
  const result = new Date(date);
  const dayOfWeek = result.getDay(); // 0=Sun ... 3=Wed
  const target = 3; // Wednesday
  const offset = (target - dayOfWeek + 7) % 7; // 0..6
  result.setDate(result.getDate() + offset);
  return result;
};

const MilitaryServiceCalendar = ({
  serviceStartDate,
  serviceEndDate,
  vacationPeriods,
  cycleLength = 21,
  workDays = 14,
}: MilitaryCalendarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleMonths, setVisibleMonths] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<
    "1month" | "3months" | "6months" | "fullrange"
  >("1month");
  const [markedDays, setMarkedDays] = useState<Map<string, string>>(new Map());

  // Validate dates
  if (serviceStartDate > serviceEndDate) {
    return <div className="text-red-500 text-center">Error: Service start date must be before end date</div>;
  }

  const calculateRemainingDutyDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(serviceEndDate);
    end.setHours(0, 0, 0, 0);

    let count = 0;
    const current = new Date(today);

    while (current <= end) {
      const key = formatDateKey(current);
      const status = markedDays.get(key);
      if (
        status === "duty" ||
        status === "duty-past" ||
        status === "return-to-duty" ||
        status === "return-to-duty-past"
      ) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  const dutyDaysLeft = calculateRemainingDutyDays();

  // Set months range based on serviceEndDate
  useEffect(() => {
    setVisibleMonths(getMonthsUntil(new Date(serviceEndDate)));
  }, [serviceEndDate]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate and mark days with Wednesday-to-Tuesday vacation pattern, Wednesday as vacation start
  useEffect(() => {
    if (!visibleMonths.length) return;

    const startOfVisible = new Date(visibleMonths[0].getFullYear(), visibleMonths[0].getMonth(), 1);
    const endOfVisible = new Date(
      visibleMonths[visibleMonths.length - 1].getFullYear(),
      visibleMonths[visibleMonths.length - 1].getMonth() + 1,
      0
    );
    const marks = new Map<string, string>();
    const vacationDays = cycleLength - workDays; // 7 days (Wednesday to Tuesday)

    // Start with the service start date
    let current = new Date(serviceStartDate);
    let vacationStart = getNextWednesday(current);

    // Mark vacations and duty periods
    while (vacationStart <= endOfVisible) {
      // Calculate vacation end (Tuesday, vacationDays - 1 after starting Wednesday)
      const vacationEnd = new Date(vacationStart);
      vacationEnd.setDate(vacationStart.getDate() + vacationDays - 1); // Wednesday to Tuesday

      // Mark return-to-duty day (Wednesday after vacation end)
      const returnToDuty = new Date(vacationEnd);
      returnToDuty.setDate(vacationEnd.getDate() + 1); // Next Wednesday

      // Mark vacation period
      const currentVacationDay = new Date(vacationStart);
      if (currentVacationDay >= startOfVisible && currentVacationDay <= endOfVisible) {
        marks.set(formatDateKey(currentVacationDay), "starting-vacation");
      }

      // Mark vacation days (Thursday to Tuesday when starting on Wednesday)
      for (let i = 1; i < vacationDays; i++) {
        const vacDay = new Date(vacationStart);
        vacDay.setDate(vacationStart.getDate() + i);
        if (vacDay >= startOfVisible && vacDay <= endOfVisible) {
          marks.set(formatDateKey(vacDay), "vacation");
        }
      }

      // Mark return-to-duty day (Wednesday)
      if (returnToDuty >= startOfVisible && returnToDuty <= endOfVisible) {
        marks.set(formatDateKey(returnToDuty), "return-to-duty");
      }

      // Mark duty days (starting the day after returnToDuty)
      for (let i = 1; i <= workDays; i++) {
        const dutyDay = new Date(returnToDuty);
        dutyDay.setDate(returnToDuty.getDate() + i);
        if (dutyDay >= startOfVisible && dutyDay <= endOfVisible) {
          marks.set(formatDateKey(dutyDay), "duty");
        }
      }

      // Move to next vacation period
      vacationStart = new Date(returnToDuty);
      vacationStart.setDate(returnToDuty.getDate() + workDays); // Move to next Wednesday start after workDays
    }

    // Override with explicitly defined vacationPeriods
    vacationPeriods.forEach(({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const visibleStart = start < startOfVisible ? startOfVisible : start;
      const visibleEnd = end > endOfVisible ? endOfVisible : end;

      const current = new Date(visibleStart);
      if (isSameDay(start, visibleStart)) {
        marks.set(formatDateKey(start), "starting-vacation");
        if (isSameDay(start, end)) return;
        current.setDate(current.getDate() + 1);
      }

      while (current < visibleEnd) {
        marks.set(formatDateKey(current), "vacation");
        current.setDate(current.getDate() + 1);
      }

      if (isSameDay(end, visibleEnd) && !isSameDay(start, end)) {
        marks.set(formatDateKey(end), "return-to-duty");
      }
    });

    // Past days marking
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const past = new Date(startOfVisible);
    while (past < today) {
      const key = formatDateKey(past);
      const original = marks.get(key);
      marks.set(key, original ? `${original}-past` : "past");
      past.setDate(past.getDate() + 1);
    }

    setMarkedDays(marks);
  }, [visibleMonths, serviceStartDate, serviceEndDate, vacationPeriods, cycleLength, workDays]);

  const getFilteredMonths = (): Date[] => {
    const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const diffInMonths = (date: Date) =>
      (date.getFullYear() - current.getFullYear()) * 12 + date.getMonth() - current.getMonth();

    switch (selectedRange) {
      case "1month":
        return visibleMonths.filter((m) => diffInMonths(m) < 1);
      case "3months":
        return visibleMonths.filter((m) => diffInMonths(m) < 3);
      case "6months":
        return visibleMonths.filter((m) => diffInMonths(m) < 6);
      case "fullrange":
        return visibleMonths;
    }
  };

  const getDayStatus = (date: Date | null): string => {
    if (!date) return "";
    const key = formatDateKey(date);
    if (isSameDay(date, currentDate)) return "today";
    return markedDays.get(key) ?? "";
  };

  const shouldShowX = (status: string) => status.includes("-past") || status === "past";

  const getColorClass = (status: string): string => {
    const clean = status.replace("-past", "");
    switch (clean) {
      case "duty":
        return "bg-blue-500 text-white";
      case "vacation":
        return "bg-green-500 text-white";
      case "starting-vacation":
        return "bg-gray-500 text-white";
      case "return-to-duty":
        return "bg-red-500 text-white";
      case "today":
        return "bg-yellow-500 text-black";
      case "past":
        return "text-subtext opacity-50";
      default:
        return "text-text";
    }
  };

  const daysUntilVacation = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i <= 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const key = formatDateKey(date);
      const status = markedDays.get(key);
      if (status === "vacation" || status === "starting-vacation") return i;
    }
    return null;
  };

  const vacationCountdown = daysUntilVacation();

  const filteredMonths = getFilteredMonths();

  const renderCalendarDays = (month: Date) => {
    const days = [];
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, monthIndex, i));

    return days.map((date, idx) => {
      const status = getDayStatus(date);
      const colorClass = getColorClass(status);
      const showX = shouldShowX(status);

      return (
        <motion.div
          key={idx}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.01 * idx }}
          className={`
            text-center text-sm 
            h-8 w-8 min-h-[2rem] min-w-[2rem]
            flex items-center justify-center 
            rounded-full 
            relative 
            transition-all duration-200 
            select-none
            ${!date ? "opacity-0 pointer-events-none" : ""} 
            ${colorClass}
          `}
          style={{
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
          aria-label={date ? `${status.replace("-past", "")} on ${formatDateKey(date)}` : ""}
        >
          <span className="relative z-10 font-medium">
            {date?.getDate()}
          </span>
          {showX && (
            <div className="absolute inset-0 flex items-center justify-center font-bold z-20">
              <X className="h-8 w-8 text-darktext opacity-60" strokeWidth={3} />
            </div>
          )}
        </motion.div>
      );
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mx-auto px-2 relative z-50"
    >
      <div className="text-center mb-4 text-xl md:text-3xl font-medium text-text">
        {vacationCountdown === 0
          ? "I'm on vacation today! 🎉"
          : vacationCountdown !== null
          ? `${vacationCountdown} day${vacationCountdown > 1 ? "s" : ""} until next vacation`
          : "No vacation found in the next year"}
      </div>

      <div className="text-center mb-4 text-xl md:text-3xl text-text font-semibold">
        {dutyDaysLeft > 0 ? (
          <motion.div
            key={dutyDaysLeft}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            <span className="text-4xl md:text-6xl font-bold text-primary">
              {dutyDaysLeft}
            </span>{" "}
            <span className="text-lg md:text-2xl font-medium text-muted-foreground">
              duty day{dutyDaysLeft > 1 ? "s" : ""} remaining
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl text-green-600 font-bold"
          >
            🎉 Service completed or ending today!
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 px-4">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0"></div>
          <span className="text-sm md:text-base text-darktext">Duty</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0"></div>
          <span className="text-sm md:text-base text-darktext">Vacation</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="h-3 w-3 rounded-full bg-gray-500 flex-shrink-0"></div>
          <span className="text-sm md:text-base text-darktext">Start vacation</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="h-3 w-3 rounded-full bg-red-500 flex-shrink-0"></div>
          <span className="text-sm md:text-base text-darktext">Return to duty</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="h-3 w-3 rounded-full bg-yellow-500 flex-shrink-0"></div>
          <span className="text-sm md:text-base text-darktext">Today</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center justify-center h-3 w-3 flex-shrink-0">
            <span className="text-sm font-bold text-darktext">X</span>
          </div>
          <span className="text-sm md:text-base text-darktext">Past day</span>
        </div>
      </div>

      {/* Range selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          {["1month", "3months", "6months", "fullrange"].map((range) => (
            <button
              key={range}
              onClick={() =>
                setSelectedRange(range as "1month" | "3months" | "6months" | "fullrange")
              }
              aria-label={`Show ${range.replace("month", " month").replace("s", "")} view`}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                ${selectedRange === range
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-900 hover:bg-gray-100 active:bg-gray-100"
                }
              `}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {range.replace("month", " Month").replace("s", "").replace("fullrange", "Full Range")}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-wrap justify-center gap-4 px-2 pb-8">
        {filteredMonths.map((month, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="w-full max-w-xs sm:w-auto bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              minWidth: '280px',
            }}
          >
            <h4 className="text-center text-lg font-semibold mb-3 text-darktext">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h4>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                <div key={i} className="text-center text-xs font-medium text-dark py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays(month)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MilitaryServiceCalendar;