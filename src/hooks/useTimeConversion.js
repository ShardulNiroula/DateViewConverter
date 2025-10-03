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

const sanitizeTimePart = (value = '') => value.replace(/\D/g, '').slice(0, 2);

const padTimePart = (value) => value.toString().padStart(2, '0');

const parseOptionalNumber = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const trimmed = String(value).trim();

  if (trimmed === '') {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const buildInitialTimeValues = (format) => {
  const now = moment();

  if (format === '12') {
    return {
      hours: now.format('hh'),
      minutes: now.format('mm'),
      seconds: now.format('ss'),
      meridiem: now.format('A')
    };
  }

  return {
    hours: now.format('HH'),
    minutes: now.format('mm'),
    seconds: now.format('ss'),
    meridiem: now.format('A')
  };
};

const convertTimeValuesFormat = (values, fromFormat, toFormat) => {
  if (fromFormat === toFormat) {
    return values;
  }

  const hoursNumber = parseOptionalNumber(values.hours);
  const minutesNumber = parseOptionalNumber(values.minutes);
  const secondsNumber = parseOptionalNumber(values.seconds);

  if (hoursNumber === null) {
    if (toFormat === '12') {
      return {
        ...values,
        meridiem: values.meridiem || 'AM'
      };
    }

    return values;
  }

  const minutesString = values.minutes === '' ? '' : padTimePart(Math.min(Math.max(minutesNumber ?? 0, 0), 59));
  const secondsString = values.seconds === '' ? '' : padTimePart(Math.min(Math.max(secondsNumber ?? 0, 0), 59));

  if (fromFormat === '24' && toFormat === '12') {
    const meridiem = hoursNumber >= 12 ? 'PM' : 'AM';
    const normalizedHours = hoursNumber % 12 === 0 ? 12 : hoursNumber % 12;

    return {
      hours: padTimePart(normalizedHours),
      minutes: minutesString,
      seconds: secondsString,
      meridiem
    };
  }

  if (fromFormat === '12' && toFormat === '24') {
    const meridiem = values.meridiem === 'PM' ? 'PM' : 'AM';
    const normalizedHours = meridiem === 'PM'
      ? (hoursNumber % 12) + 12
      : hoursNumber % 12;

    return {
      hours: padTimePart(normalizedHours),
      minutes: minutesString,
      seconds: secondsString,
      meridiem
    };
  }

  return values;
};

const createMomentFromInputs = ({ dateValue, hours, minutes, seconds, timezone }) => {
  const dateTimeString = `${dateValue} ${padTimePart(hours)}:${padTimePart(minutes)}:${padTimePart(seconds)}`;
  return moment.tz(dateTimeString, 'YYYY-MM-DD HH:mm:ss', timezone);
};

const useTimeConversion = () => {
  const { currentTimezone } = useTimezone();
  const { timezones: presetTimezones } = usePresetTimezones();
  const { format, setFormat } = useTimeFormat('24');

  const effectiveSourceFallback = currentTimezone || DEFAULT_SOURCE_FALLBACK;
  const initialSource = normalizeTimezone(effectiveSourceFallback, presetTimezones, DEFAULT_SOURCE_FALLBACK);

  const [sourceTimezone, setSourceTimezoneState] = useState(initialSource);
  const [targetTimezone, setTargetTimezoneState] = useState(DEFAULT_TARGET_TIMEZONE);
  const [dateValue, setDateValue] = useState(() => moment().format('YYYY-MM-DD'));
  const [timeValues, setTimeValues] = useState(() => buildInitialTimeValues(format));
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
    if (nextFormat === format) {
      return;
    }

    setTimeValues((previous) => convertTimeValuesFormat(previous, format, nextFormat));
    setFormat(nextFormat);
  }, [format, setFormat]);

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
      [part]: part === 'meridiem'
        ? (value === 'PM' ? 'PM' : 'AM')
        : sanitizeTimePart(value)
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
    const meridiemValue = timeValues.meridiem;

    if (hoursValue === '') {
      validationErrors.push(format === '12' ? 'Please enter hours (01-12).' : 'Please enter hours (00-23).');
    }
    if (minutesValue === '') {
      validationErrors.push('Please enter minutes (00-59).');
    }
    if (format === '12' && !meridiemValue) {
      validationErrors.push('Please select AM or PM.');
    }

    const parsedHours = Number.parseInt(hoursValue, 10);
    const parsedMinutes = Number.parseInt(minutesValue, 10);
    const parsedSeconds = secondsValue === '' ? 0 : Number.parseInt(secondsValue, 10);

    const is24Hour = format === '24';

    if (is24Hour) {
      if (Number.isNaN(parsedHours) || parsedHours < 0 || parsedHours > 23) {
        validationErrors.push('Hours must be between 00 and 23.');
      }
    } else if (Number.isNaN(parsedHours) || parsedHours < 1 || parsedHours > 12) {
      validationErrors.push('Hours must be between 01 and 12.');
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

    let normalizedHours = parsedHours;

    if (!is24Hour) {
      const normalizedMeridiem = meridiemValue === 'PM' ? 'PM' : 'AM';

      if (normalizedMeridiem === 'AM') {
        normalizedHours = parsedHours === 12 ? 0 : parsedHours;
      } else {
        normalizedHours = parsedHours === 12 ? 12 : parsedHours + 12;
      }
    }

    const sourceMoment = createMomentFromInputs({
      dateValue,
      hours: normalizedHours,
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
  }, [
    dateValue,
    format,
    sourceTimezone,
    targetTimezone,
    timeValues.hours,
    timeValues.minutes,
    timeValues.seconds,
    timeValues.meridiem,
    sourceDisplay,
    targetDisplay
  ]);

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
