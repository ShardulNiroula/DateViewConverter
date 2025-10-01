import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import TimezoneService from '../services/TimezoneService';

const useTimezone = () => {
  const [currentTimezone, setCurrentTimezone] = useState('UTC');
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  useEffect(() => {
    // Get user's local timezone using moment-timezone
    const localTimezone = moment.tz.guess();
    const localOffset = moment().tz(localTimezone).utcOffset() / 60; // Convert to hours

    setCurrentTimezone(localTimezone);
    setTimezoneOffset(localOffset);
  }, []);

  const getTimezoneInfo = (timezoneName) => {
    try {
      const tz = TimezoneService.getTimezoneByName(timezoneName);
      if (tz) {
        const offsetHours = (tz.utcOffset ?? 0) / 60;
        return {
          name: tz.name,
          abbreviation: tz.abbreviation,
          offset: offsetHours,
          offsetMinutes: tz.utcOffset ?? 0,
          countries: tz.countries || [],
          gmtLabel: tz.gmtLabel,
          isDST: tz.isDST
        };
      }
    } catch (error) {
      console.warn(`Invalid timezone: ${timezoneName}`, error);
    }

    // Fallback for invalid timezones
    return {
      name: timezoneName,
      abbreviation: timezoneName.split('/')[1] || timezoneName,
      offset: 0,
      offsetMinutes: 0,
      countries: [],
  gmtLabel: TimezoneService.formatTimezoneOffset(0, { inputIsMinutes: true }),
      isDST: false
    };
  };

  const getCurrentTimeInTimezone = (timezoneName) => {
    try {
      return TimezoneService.getCurrentTimeInTimezone(timezoneName);
    } catch (error) {
      console.warn(`Error getting time for timezone: ${timezoneName}`, error);
      return moment();
    }
  };

  const getTimeDifference = (timezone1, timezone2) => {
    return TimezoneService.getTimeDifference(timezone1, timezone2);
  };

  const formatTimezoneOffset = (offset) => {
    const offsetMinutes = typeof offset === 'number' ? offset * 60 : 0;
    return TimezoneService.formatTimezoneOffset(offsetMinutes, { inputIsMinutes: true });
  };

  const isValidTimezone = (timezoneName) => {
    try {
      moment.tz(timezoneName);
      return true;
    } catch {
      return false;
    }
  };

  const getAllTimezoneNames = () => {
    return moment.tz.names();
  };

  const searchTimezones = (query) => {
    return TimezoneService.searchTimezones(query);
  };

  return {
    currentTimezone,
    timezoneOffset,
    setCurrentTimezone,
    setTimezoneOffset,
    getTimezoneInfo,
    getCurrentTimeInTimezone,
    getTimeDifference,
    formatTimezoneOffset,
    isValidTimezone,
    getAllTimezoneNames,
    searchTimezones
  };
};

export default useTimezone;