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
  title?: string;
};

// Helpers
const formatDateKey = (date: Date): string => date.toLocaleDateString("en-CA"); // YYYY-MM-DD format, Safari-safe

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

// Helper to find the next Sunday (or current day if it's Sunday)
const getNextSunday = (date: Date): Date => {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  // If not Sunday (0), add days until we reach Sunday
  if (dayOfWeek !== 0) {
    result.setDate(result.getDate() + (7 - dayOfWeek));
  }
  return result;
};

const MilitaryServiceCalendar = ({
  serviceStartDate,
  serviceEndDate,
  vacationPeriods,
  cycleLength = 14, // Changed to 14 days (1 week duty + 1 week vacation)
  workDays = 7, // Changed to 7 work days
}: MilitaryCalendarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleMonths, setVisibleMonths] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<
    "1month" | "3months" | "6months" | "fullrange"
  >("1month");
  const [markedDays, setMarkedDays] = useState<Map<string, string>>(new Map());

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

  // Set months range
  useEffect(() => {
    const feb2026 = new Date(2026, 1, 1); // February is month 1 (zero-indexed)
    setVisibleMonths(getMonthsUntil(feb2026));
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate and mark days with Sunday-to-Sunday weekly alternating pattern
  useEffect(() => {
    if (!visibleMonths.length) return;

    const startOfVisible = new Date(
      visibleMonths[0].getFullYear(),
      visibleMonths[0].getMonth(),
      1
    );
    const endOfVisible = new Date(
      visibleMonths[visibleMonths.length - 1].getFullYear(),
      visibleMonths[visibleMonths.length - 1].getMonth() + 1,
      0
    );
    const marks = new Map<string, string>();

    // Start with the service start date and find the first Sunday
    let current = new Date(serviceStartDate);
    let cycleStart = getNextSunday(current);

    // Determine if we start with duty or vacation
    // Let's start with duty week first
    let isDutyWeek = true;

    // Continue marking weeks until we reach the end date
    while (cycleStart <= endOfVisible && cycleStart <= serviceEndDate) {
      // Mark the current week (7 days starting from Sunday)
      for (let i = 0; i < 7; i++) {
        const day = new Date(cycleStart);
        day.setDate(cycleStart.getDate() + i);

        // Stop if we've reached the service end date
        if (day > serviceEndDate) break;

        if (day >= startOfVisible && day <= endOfVisible) {
          if (isDutyWeek) {
            if (i === 0) {
              // First day of duty week (Sunday)
              marks.set(formatDateKey(day), "return-to-duty");
            } else {
              marks.set(formatDateKey(day), "duty");
            }
          } else {
            if (i === 0) {
              // First day of vacation week (Sunday)
              marks.set(formatDateKey(day), "starting-vacation");
            } else if (i === 6) {
              // Last day of vacation week (Saturday)
              marks.set(formatDateKey(day), "vacation");
            } else {
              marks.set(formatDateKey(day), "vacation");
            }
          }
        }
      }

      // Move to next week and toggle between duty and vacation
      cycleStart.setDate(cycleStart.getDate() + 7);
      isDutyWeek = !isDutyWeek;
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
  }, [
    visibleMonths,
    serviceStartDate,
    serviceEndDate,
    vacationPeriods,
    cycleLength,
    workDays,
  ]);

  const getFilteredMonths = (): Date[] => {
    const current = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const diffInMonths = (date: Date) =>
      (date.getFullYear() - current.getFullYear()) * 12 +
      date.getMonth() -
      current.getMonth();

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

  const shouldShowX = (status: string) =>
    status.includes("-past") || status === "past";

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
    for (let i = 1; i <= daysInMonth; i++)
      days.push(new Date(year, monthIndex, i));

    return days.map((date, idx) => {
      const status = getDayStatus(date);
      const colorClass = getColorClass(status);
      const showX = shouldShowX(status);

      return (
        <motion.div
          key={idx}
          initial={{ scale: 0.01, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.01, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.01 * idx }}
          className={`text-center text-xs h-7 w-7 flex items-center justify-center rounded-full relative ${
            !date ? "opacity-0" : ""
          } ${colorClass}`}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)", // Forces GPU acceleration on Safari
          }}
        >
          {date?.getDate()}
          {showX && (
            <div className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none">
              <X className="h-9 w-9 text-text opacity-60" />
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
          ? `${vacationCountdown} day${
              vacationCountdown > 1 ? "s" : ""
            } until next vacation`
          : "No vacation found in the next year"}
      </div>

      {/* Duty days left section */}
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
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-xs md:text-sm text-text">Duty</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-xs md:text-sm text-text">Vacation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
          <span className="text-xs md:text-sm text-text">Start vacation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span className="text-xs md:text-sm text-text">Return to duty</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs md:text-sm text-text">Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center h-3 w-3">
            <span className="text-xs font-bold text-text">X</span>
          </div>
          <span className="text-xs md:text-sm text-text">Past day</span>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {["1month", "3months", "6months", "fullrange"].map((range) => (
          <button
            key={range}
            onClick={() =>
              setSelectedRange(
                range as "1month" | "3months" | "6months" | "fullrange"
              )
            }
            className={`px-4 py-2 text-sm font-medium ${
              selectedRange === range
                ? "bg-primary text-white"
                : "bg-white text-gray-900 hover:bg-gray-100 "
            } ${range === "1month" ? "rounded-l-lg" : ""} ${
              range === "fullrange" ? "rounded-r-lg" : ""
            }`}
          >
            {range.replace("month", " Month").replace("s", "")}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filteredMonths.map((month, idx) => (
          <div
            key={idx}
            className="w-full md:w-64 bg-white  text-dark  rounded-lg p-3 shadow-xl"
          >
            <h4 className="text-center text- font-medium mb-2">
              {month.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </h4>
            <div className="grid grid-cols-7 gap-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center text-xs text-dark">
                  {d}
                </div>
              ))}
              {renderCalendarDays(month)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MilitaryServiceCalendar;
