import dayjs from "dayjs";

export const getTimeRemaining = () => {
  const now = dayjs();
  const dayText = {
    day: "components.aside.widgets.countdown.today",
    week: "components.aside.widgets.countdown.this-week",
    month: "components.aside.widgets.countdown.this-month",
    year: "components.aside.widgets.countdown.this-year",
  };

  const getDifference = (unit) => {
    const start = now.startOf(unit);
    const end = now.endOf(unit);
    const total = end.diff(start, unit === "day" ? "hour" : "day") + 1;
    let passed;
    if (unit === "week" && now.day() === 0) {
      passed = total - 1;
    } else {
      passed = now.diff(start, unit === "day" ? "hour" : "day");
    }
    const remaining = total - passed;
    const percentage = (passed / total) * 100;
    return {
      name: dayText[unit],
      total: total,
      passed: passed,
      remaining: remaining,
      percentage: percentage.toFixed(2),
    };
  };

  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};

/**
 * Formatting Date String
 * If the date is the same as the current year, return "MM/DD" format
 * If the date is different from the current year, return "YYYY/MM/DD" format
 * @param {string} dateString the date string to format
 * @returns {string} the formatted date string
 */
export const formatDate = (dateString) => {
  const currentYear = new Date().getFullYear();
  const date = new Date(dateString.replace(/-/g, "/"));
  return date.getFullYear() === currentYear
    ? `${date.getMonth() + 1}/${date.getDate()}`
    : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

/**
 * Get the current date
 * @returns {number} current date
 */
export const getDay = () => {
  const now = new Date();
  return now.getDate();
}

/**
 * Get the abbreviation of the current month (e.g., "Jan.", "Feb.")
 * @returns {string|number} the abbreviation of the current month
 */
export const getMonth = () => {
  const now = new Date();
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  return monthNames[now.getMonth()];
};

/**
 * Get current year
 * @returns {number} current year
 */
export const getYear = () => {
  const now = new Date();
  return now.getFullYear();
}
