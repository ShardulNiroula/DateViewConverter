// Time utility functions

export const formatTime = (date, options = {}) => {
  const {
    format = '24',
    showSeconds = true,
    showMilliseconds = false
  } = options;

  if (format === '12') {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      fractionalSecondDigits: showMilliseconds ? 3 : undefined
    });
  } else {
    return date.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      fractionalSecondDigits: showMilliseconds ? 3 : undefined
    });
  }
};

export const formatDate = (date, options = {}) => {
  const {
    format = 'short',
    includeTime = false,
    timeFormat = '24'
  } = options;

  let dateOptions = {};

  switch (format) {
    case 'short':
      dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      break;
    case 'long':
      dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      break;
    case 'numeric':
      dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      break;
    default:
      dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  }

  let result = date.toLocaleDateString('en-US', dateOptions);

  if (includeTime) {
    result += ` ${formatTime(date, { format: timeFormat })}`;
  }

  return result;
};

export const getTimeOfDay = (date) => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

export const calculateTimeDifference = (date1, date2) => {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return {
    days: diffDays,
    hours: diffHours,
    minutes: diffMinutes,
    seconds: diffSeconds,
    totalMs: diffMs
  };
};

export const addTime = (date, amount, unit) => {
  const newDate = new Date(date);

  switch (unit) {
    case 'seconds':
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
    case 'minutes':
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case 'hours':
      newDate.setHours(newDate.getHours() + amount);
      break;
    case 'days':
      newDate.setDate(newDate.getDate() + amount);
      break;
    case 'weeks':
      newDate.setDate(newDate.getDate() + (amount * 7));
      break;
    case 'months':
      newDate.setMonth(newDate.getMonth() + amount);
      break;
    case 'years':
      newDate.setFullYear(newDate.getFullYear() + amount);
      break;
    default:
      break;
  }

  return newDate;
};

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getTimezoneOffset = (timezone) => {
  const now = new Date();
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const targetDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  return (targetDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
};

export const convertTimezone = (date, fromTimezone, toTimezone) => {
  const fromOffset = getTimezoneOffset(fromTimezone);
  const toOffset = getTimezoneOffset(toTimezone);
  const offsetDiff = toOffset - fromOffset;

  return addTime(date, offsetDiff, 'hours');
};