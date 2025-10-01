import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getTimezoneRecords,
  refreshTimezoneRecords,
  REFRESH_INTERVAL
} from '../utils/timezoneCatalog.js';

const normalize = (value = '') => value.toLowerCase();

const sortTimezones = (timezones) => {
  return [...timezones].sort((a, b) => {
    const countryCompare = (a.country || '').localeCompare(b.country || '', undefined, {
      sensitivity: 'base'
    });
    if (countryCompare !== 0) {
      return countryCompare;
    }

    const cityCompare = (a.city || '').localeCompare(b.city || '', undefined, {
      sensitivity: 'base'
    });
    if (cityCompare !== 0) {
      return cityCompare;
    }

    return a.value.localeCompare(b.value, undefined, { sensitivity: 'base' });
  });
};

const usePresetTimezones = () => {
  const [timezones, setTimezones] = useState(() => sortTimezones(getTimezoneRecords()));

  useEffect(() => {
    setTimezones(sortTimezones(refreshTimezoneRecords()));

    const interval = setInterval(() => {
      setTimezones(sortTimezones(refreshTimezoneRecords()));
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const searchIndex = useMemo(
    () =>
      timezones.map((timezone) => ({
        value: timezone.value,
        searchValue: timezone.searchValue,
        record: timezone
      })),
    [timezones]
  );

  const searchTimezones = useCallback(
    (query = '') => {
      const normalizedQuery = normalize(query.trim());
      if (!normalizedQuery) {
        return timezones;
      }

      return searchIndex
        .filter(({ searchValue }) => searchValue.includes(normalizedQuery))
        .map(({ record }) => record);
    },
    [searchIndex, timezones]
  );

  return {
    timezones,
    searchTimezones
  };
};

export default usePresetTimezones;
