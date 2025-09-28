import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import useClock from './useClock';
import useTimeFormat from './useTimeFormat';
import useTimezone from './useTimezone';
import usePresetTimezones from './usePresetTimezones';
import { createClockSearchParams, toClockSearchString } from '../utils/clockParams';
import { findBestTimezoneMatch, isKnownTimezone } from '../utils/timezoneMatching';

const ANALOG = 'analog';
const DIGITAL = 'digital';
const DEFAULT_TIMEZONE = 'UTC';

const useClockPageState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const timezoneParam = searchParams.get('tz');
  const initialTimezone = timezoneParam || DEFAULT_TIMEZONE;
  const initialFormat = searchParams.get('format') === '24' ? '24' : '12';
  const initialClockTypeFromState = location.state?.clockType === ANALOG ? ANALOG : null;
  const initialClockTypeParam = searchParams.get('type') === ANALOG ? ANALOG : DIGITAL;
  const initialClockType = initialClockTypeFromState || initialClockTypeParam;

  const [clockType, setClockType] = useState(initialClockType);
  const [selectedTimezone, setSelectedTimezone] = useState(initialTimezone);
  const [isDeviceTimezoneApplied, setIsDeviceTimezoneApplied] = useState(Boolean(timezoneParam));

  const { format, setFormat } = useTimeFormat(initialFormat);
  const { currentTimezone, getTimezoneInfo, formatTimezoneOffset } = useTimezone();
  const { timezones: presetTimezones } = usePresetTimezones();
  const { time: currentTime } = useClock(0, selectedTimezone);

  useEffect(() => {
    const params = createClockSearchParams({
      timezone: selectedTimezone,
      format
    });
    const nextSearch = toClockSearchString(params);

    if (location.search !== nextSearch) {
      navigate({ pathname: location.pathname, search: nextSearch || undefined }, { replace: true });
    }
  }, [selectedTimezone, format, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (!presetTimezones?.length) {
      return;
    }

    if (isKnownTimezone(selectedTimezone, presetTimezones)) {
      return;
    }

    const fallbackTimezone = findBestTimezoneMatch(selectedTimezone, presetTimezones);
    if (fallbackTimezone && fallbackTimezone !== selectedTimezone) {
      setSelectedTimezone(fallbackTimezone);
    }
  }, [presetTimezones, selectedTimezone]);

  useEffect(() => {
    if (isDeviceTimezoneApplied || !presetTimezones?.length) {
      return;
    }

    const candidates = [
      currentTimezone,
      typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : null,
      typeof moment.tz?.guess === 'function' ? moment.tz.guess() : null
    ].filter(Boolean);

    if (!candidates.length) {
      return;
    }

    const preferredCandidate = candidates.find((timezone) => timezone && timezone !== DEFAULT_TIMEZONE) || candidates[0];
    const matchedTimezone = findBestTimezoneMatch(preferredCandidate, presetTimezones);

    if (matchedTimezone && matchedTimezone !== selectedTimezone) {
      setSelectedTimezone(matchedTimezone);
      setIsDeviceTimezoneApplied(true);
      return;
    }

    if (matchedTimezone === selectedTimezone) {
      setIsDeviceTimezoneApplied(true);
      return;
    }

    if (!matchedTimezone) {
      setIsDeviceTimezoneApplied(true);
    }
  }, [currentTimezone, isDeviceTimezoneApplied, presetTimezones, selectedTimezone]);

  const timezoneInfo = useMemo(
    () => getTimezoneInfo(selectedTimezone),
    [getTimezoneInfo, selectedTimezone]
  );

  const offsetLabel = useMemo(() => {
    if (!timezoneInfo) {
      return 'UTC+00:00';
    }
    return formatTimezoneOffset(timezoneInfo.offset ?? 0);
  }, [formatTimezoneOffset, timezoneInfo]);

  const timezoneParts = useMemo(() => selectedTimezone.split('/'), [selectedTimezone]);
  const timezoneRegion = useMemo(
    () => timezoneParts[0]?.replace(/_/g, ' ') || 'Global',
    [timezoneParts]
  );
  const timezoneCity = useMemo(
    () => timezoneParts.slice(1).join(' / ').replace(/_/g, ' '),
    [timezoneParts]
  );
  const timezoneTitle = timezoneCity || timezoneRegion;

  const presetDetails = useMemo(
    () => presetTimezones.find((timezone) => timezone.value === selectedTimezone) || null,
    [presetTimezones, selectedTimezone]
  );

  const handleFormatChange = useCallback((newFormat) => {
    setFormat(newFormat);
  }, [setFormat]);

  const handleTimezoneChange = useCallback((timezone) => {
    setIsDeviceTimezoneApplied(true);
    setSelectedTimezone(timezone);
  }, []);

  const handleClockTypeChange = useCallback((type) => {
    setClockType(type === ANALOG ? ANALOG : DIGITAL);
  }, []);

  return {
    currentTime,
    format,
    clockType,
    selectedTimezone,
    timezoneInfo,
    offsetLabel,
    timezoneTitle,
    presetDetails,
    handleFormatChange,
    handleTimezoneChange,
    handleClockTypeChange
  };
};

export default useClockPageState;
