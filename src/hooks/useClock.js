import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const useClock = (timezoneOffset = 0, timezoneName = 'UTC') => {
  const [time, setTime] = useState(moment());
  const [isValidTimezone, setIsValidTimezone] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      try {
        let currentTime;

        if (timezoneName && timezoneName !== 'UTC') {
          // Use timezone name if provided
          currentTime = moment().tz(timezoneName);
        } else if (timezoneOffset !== 0) {
          // Use offset if no timezone name
          currentTime = moment().utc().add(timezoneOffset, 'hours');
        } else {
          // Default to UTC
          currentTime = moment().utc();
        }

        setTime(currentTime);
        setIsValidTimezone(true);
      } catch (error) {
        console.warn(`Invalid timezone: ${timezoneName}`, error);
        // Fallback to UTC
        setTime(moment().utc());
        setIsValidTimezone(false);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset, timezoneName]);

  const formatTime = (format = 'HH:mm:ss') => {
    return time.format(format);
  };

  const formatDate = (format = 'YYYY-MM-DD') => {
    return time.format(format);
  };

  const formatDateTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
    return time.format(format);
  };

  const getTimeComponents = () => {
    return {
      hours: time.hours(),
      minutes: time.minutes(),
      seconds: time.seconds(),
      milliseconds: time.milliseconds(),
      day: time.day(),
      date: time.date(),
      month: time.month(),
      year: time.year(),
      timezone: time.format('z'),
      utcOffset: time.utcOffset()
    };
  };

  return {
    time,
    isValidTimezone,
    formatTime,
    formatDate,
    formatDateTime,
    getTimeComponents,
    // Legacy support
    toString: () => time.toString(),
    getTime: () => time.valueOf()
  };
};

export default useClock;