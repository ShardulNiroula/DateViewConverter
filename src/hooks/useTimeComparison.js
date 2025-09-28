import { useCallback, useEffect, useMemo, useState } from 'react';
import useClock from './useClock';
import useTimeFormat from './useTimeFormat';
import useTimezone from './useTimezone';
import usePresetTimezones from './usePresetTimezones';
import { findBestTimezoneMatch, isKnownTimezone } from '../utils/timezoneMatching';
import { buildTimezoneDisplay, formatOffsetLabel } from '../utils/timezoneDisplay';
import { buildTimeDifferenceSummary } from '../utils/timeDifference';

const DEFAULT_PRIMARY_TIMEZONE = 'UTC';
const DEFAULT_SECONDARY_TIMEZONE = 'America/New_York';

const normalizeTimezone = (timezone, presetTimezones) => {
  if (!presetTimezones?.length || !timezone) {
    return timezone;
  }

  if (isKnownTimezone(timezone, presetTimezones)) {
    return timezone;
  }

  return findBestTimezoneMatch(timezone, presetTimezones) || DEFAULT_PRIMARY_TIMEZONE;
};

const useTimeComparison = () => {
  const { currentTimezone } = useTimezone();
  const { timezones: presetTimezones } = usePresetTimezones();
  const { format, setFormat } = useTimeFormat('24');

  const [timezoneA, setTimezoneAState] = useState(() => currentTimezone || DEFAULT_PRIMARY_TIMEZONE);
  const [timezoneB, setTimezoneBState] = useState(DEFAULT_SECONDARY_TIMEZONE);
  const [timezoneASelectedByUser, setTimezoneASelectedByUser] = useState(false);

  useEffect(() => {
    if (!presetTimezones?.length) {
      return;
    }

    setTimezoneAState((previous) => normalizeTimezone(previous, presetTimezones));
    setTimezoneBState((previous) => normalizeTimezone(previous, presetTimezones));
  }, [presetTimezones]);

  useEffect(() => {
    if (!timezoneASelectedByUser && currentTimezone && currentTimezone !== timezoneA) {
      setTimezoneAState(currentTimezone);
    }
  }, [currentTimezone, timezoneA, timezoneASelectedByUser]);

  const { time: timeA } = useClock(0, timezoneA);
  const { time: timeB } = useClock(0, timezoneB);

  const timezoneADetails = useMemo(
    () => presetTimezones.find((tz) => tz.value === timezoneA) || null,
    [presetTimezones, timezoneA]
  );

  const timezoneBDetails = useMemo(
    () => presetTimezones.find((tz) => tz.value === timezoneB) || null,
    [presetTimezones, timezoneB]
  );

  const displayA = useMemo(
    () => buildTimezoneDisplay(timezoneA, timezoneADetails),
    [timezoneA, timezoneADetails]
  );

  const displayB = useMemo(
    () => buildTimezoneDisplay(timezoneB, timezoneBDetails),
    [timezoneB, timezoneBDetails]
  );

  const offsetLabelA = useMemo(
    () => formatOffsetLabel(timeA.utcOffset()),
    [timeA]
  );

  const offsetLabelB = useMemo(
    () => formatOffsetLabel(timeB.utcOffset()),
    [timeB]
  );

  const difference = useMemo(() => {
    const totalMinutes = timeA.utcOffset() - timeB.utcOffset();
    return buildTimeDifferenceSummary({
      totalMinutes,
      fromLabel: displayA.title,
      toLabel: displayB.title
    });
  }, [displayA.title, displayB.title, timeA, timeB]);

  const setTimezoneA = useCallback((timezone) => {
    setTimezoneAState(timezone);
    setTimezoneASelectedByUser(true);
  }, []);

  const setTimezoneB = useCallback((timezone) => {
    setTimezoneBState(timezone);
  }, []);

  const swapTimezones = useCallback(() => {
    setTimezoneAState((previousA) => {
      setTimezoneBState(previousA);
      return timezoneB;
    });
    setTimezoneASelectedByUser(true);
  }, [timezoneB]);

  const handleFormatChange = useCallback((nextFormat) => {
    setFormat(nextFormat);
  }, [setFormat]);

  return {
    timezoneA,
    timezoneB,
    timeA,
    timeB,
    format,
    displayA,
    displayB,
    difference,
    offsetLabelA,
    offsetLabelB,
    setTimezoneA,
    setTimezoneB,
    swapTimezones,
    handleFormatChange
  };
};

export default useTimeComparison;
