import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';
import useTimeFormat from './useTimeFormat';
import useTimezone from './useTimezone';
import usePresetTimezones from './usePresetTimezones';
import { findBestTimezoneMatch, isKnownTimezone } from '../utils/timezoneMatching';
import { buildTimezoneDisplay, formatOffsetLabel } from '../utils/timezoneDisplay';
import { buildTimeDifferenceSummary, getOffsetDifference } from '../utils/timeDifference';

const DEFAULT_SOURCE_FALLBACK = 'Asia/Kathmandu';
const DEFAULT_TARGET_TIMEZONE = 'America/New_York';

const normalizeTimezone = (timezone, presetTimezones, fallback) => {
  if (!presetTimezones?.length) {
    return timezone || fallback;
  }

  if (!timezone) {
    return fallback;
  }

  if (isKnownTimezone(timezone, presetTimezones)) {
    return timezone;
  }

  return findBestTimezoneMatch(timezone, presetTimezones) || fallback;
};

const sanitizeTimePart = (value) => value.replace(/\D/g, '').slice(0, 2);

const padTimePart = (value) => value.toString().padStart(2, '0');

const createMomentFromInputs = ({ dateValue, hours, minutes, seconds, timezone }) => {
  const dateTimeString = `${dateValue} ${padTimePart(hours)}:${padTimePart(minutes)}:${padTimePart(seconds)}`;
  return moment.tz(dateTimeString, 'YYYY-MM-DD HH:mm:ss', timezone);
};

const useTimeConversion = () => {
  const { currentTimezone } = useTimezone();
  const { timezones: presetTimezones } = usePresetTimezones();
  const { format, setFormat } = useTimeFormat('24');

  const effectiveSourceFallback = currentTimezone || DEFAULT_SOURCE_FALLBACK;

  const [sourceTimezone, setSourceTimezoneState] = useState(effectiveSourceFallback);
  const [targetTimezone, setTargetTimezoneState] = useState(DEFAULT_TARGET_TIMEZONE);
  const [dateValue, setDateValue] = useState(() => moment().format('YYYY-MM-DD'));
  const [timeValues, setTimeValues] = useState(() => ({
    hours: moment().format('HH'),
    minutes: moment().format('mm'),
    seconds: moment().format('ss')
  }));
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!presetTimezones?.length) {
      return;
    }

    setSourceTimezoneState((previous) => normalizeTimezone(previous, presetTimezones, effectiveSourceFallback));
    setTargetTimezoneState((previous) => normalizeTimezone(previous, presetTimezones, DEFAULT_TARGET_TIMEZONE));
  }, [presetTimezones, effectiveSourceFallback]);

  const sourceDetails = useMemo(
    () => presetTimezones.find((tz) => tz.value === sourceTimezone) || null,
    [presetTimezones, sourceTimezone]
  );

  const targetDetails = useMemo(
    () => presetTimezones.find((tz) => tz.value === targetTimezone) || null,
    [presetTimezones, targetTimezone]
  );

  const sourceDisplay = useMemo(
    () => buildTimezoneDisplay(sourceTimezone, sourceDetails),
    [sourceTimezone, sourceDetails]
  );

  const targetDisplay = useMemo(
    () => buildTimezoneDisplay(targetTimezone, targetDetails),
    [targetTimezone, targetDetails]
  );

  const handleFormatChange = useCallback((nextFormat) => {
    setFormat(nextFormat);
  }, [setFormat]);

  const setSourceTimezone = useCallback((timezone) => {
    setSourceTimezoneState(timezone);
  }, []);

  const setTargetTimezone = useCallback((timezone) => {
    setTargetTimezoneState(timezone);
  }, []);

  const swapTimezones = useCallback(() => {
    setSourceTimezoneState((previousSource) => {
      setTargetTimezoneState(previousSource);
      return targetTimezone;
    });
  }, [targetTimezone]);

  const setTimePart = useCallback((part, value) => {
    setTimeValues((previous) => ({
      ...previous,
      [part]: sanitizeTimePart(value)
    }));
  }, []);

  const handleConvert = useCallback(() => {
    const validationErrors = [];

    if (!dateValue) {
      validationErrors.push('Please select a date to convert.');
    }

    const hoursValue = timeValues.hours;
    const minutesValue = timeValues.minutes;
    const secondsValue = timeValues.seconds || '00';

    if (hoursValue === '') {
      validationErrors.push('Please enter hours (00-23).');
    }
    if (minutesValue === '') {
      validationErrors.push('Please enter minutes (00-59).');
    }

    const parsedHours = Number.parseInt(hoursValue, 10);
    const parsedMinutes = Number.parseInt(minutesValue, 10);
    const parsedSeconds = secondsValue === '' ? 0 : Number.parseInt(secondsValue, 10);

    if (Number.isNaN(parsedHours) || parsedHours < 0 || parsedHours > 23) {
      validationErrors.push('Hours must be between 00 and 23.');
    }

    if (Number.isNaN(parsedMinutes) || parsedMinutes < 0 || parsedMinutes > 59) {
      validationErrors.push('Minutes must be between 00 and 59.');
    }

    if (Number.isNaN(parsedSeconds) || parsedSeconds < 0 || parsedSeconds > 59) {
      validationErrors.push('Seconds must be between 00 and 59.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    const sourceMoment = createMomentFromInputs({
      dateValue,
      hours: parsedHours,
      minutes: parsedMinutes,
      seconds: parsedSeconds,
      timezone: sourceTimezone
    });

    if (!sourceMoment.isValid()) {
      setErrors(['Unable to interpret the provided date and time.']);
      setResult(null);
      return;
    }

    const targetMoment = sourceMoment.clone().tz(targetTimezone);

    const difference = buildTimeDifferenceSummary({
      totalMinutes: getOffsetDifference(sourceMoment, targetMoment),
      fromLabel: sourceDisplay.title,
      toLabel: targetDisplay.title
    });

    setResult({
      source: {
        moment: sourceMoment,
        display: sourceDisplay,
        offsetLabel: formatOffsetLabel(sourceMoment.utcOffset())
      },
      target: {
        moment: targetMoment,
        display: targetDisplay,
        offsetLabel: formatOffsetLabel(targetMoment.utcOffset())
      },
      difference
    });
    setErrors([]);
  }, [dateValue, sourceTimezone, targetTimezone, timeValues.hours, timeValues.minutes, timeValues.seconds, sourceDisplay, targetDisplay]);

  return {
    format,
    handleFormatChange,
    sourceTimezone,
    targetTimezone,
    sourceDisplay,
    targetDisplay,
    setSourceTimezone,
    setTargetTimezone,
    swapTimezones,
    dateValue,
    setDateValue,
    timeValues,
    setTimePart,
    handleConvert,
    errors,
    result
  };
};

export default useTimeConversion;
