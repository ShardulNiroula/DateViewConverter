import moment from 'moment-timezone';

const DEFAULT_TIMEZONE = 'UTC';
const ETC_UTC = 'Etc/UTC';

const getParts = (timezoneName = '') => timezoneName.split('/');

export const isKnownTimezone = (timezoneName, presetTimezones = []) => {
  if (!timezoneName) {
    return false;
  }

  if (timezoneName === DEFAULT_TIMEZONE || timezoneName === ETC_UTC) {
    return true;
  }

  return presetTimezones.some((timezone) => timezone.value === timezoneName);
};

const matchByCity = (timezoneName, presetTimezones = []) => {
  const parts = getParts(timezoneName);
  const targetCity = parts[parts.length - 1]?.toLowerCase();

  if (!targetCity) {
    return null;
  }

  return presetTimezones.find((timezone) => {
    const valueParts = getParts(timezone.value);
    return valueParts[valueParts.length - 1]?.toLowerCase() === targetCity;
  }) || null;
};

const matchByRegion = (timezoneName, presetTimezones = []) => {
  const parts = getParts(timezoneName);
  const targetRegion = parts[0]?.toLowerCase();

  if (!targetRegion) {
    return null;
  }

  return presetTimezones.find((timezone) => {
    const valueRegion = getParts(timezone.value)[0]?.toLowerCase();
    return valueRegion === targetRegion;
  }) || null;
};

const matchByOffset = (timezoneName, presetTimezones = []) => {
  try {
    const targetOffset = moment.tz(timezoneName).utcOffset();
    let closest = null;
    let smallestDiff = Infinity;

    presetTimezones.forEach((timezone) => {
      const diff = Math.abs((timezone.offsetMinutes ?? 0) - targetOffset);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closest = timezone;
      }
    });

    return closest || null;
  } catch (error) {
    console.warn(`Unable to calculate offset for timezone ${timezoneName}`, error);
    return null;
  }
};

const getUtcFallback = (presetTimezones = []) => {
  const fallback = presetTimezones.find((timezone) =>
    timezone.value === DEFAULT_TIMEZONE || timezone.value === ETC_UTC
  );

  return fallback?.value || DEFAULT_TIMEZONE;
};

export const findBestTimezoneMatch = (timezoneName, presetTimezones = []) => {
  if (!timezoneName) {
    return null;
  }

  if (isKnownTimezone(timezoneName, presetTimezones)) {
    return timezoneName;
  }

  const cityMatch = matchByCity(timezoneName, presetTimezones);
  if (cityMatch) {
    return cityMatch.value;
  }

  const regionMatch = matchByRegion(timezoneName, presetTimezones);
  if (regionMatch) {
    return regionMatch.value;
  }

  const offsetMatch = matchByOffset(timezoneName, presetTimezones);
  if (offsetMatch) {
    return offsetMatch.value;
  }

  return getUtcFallback(presetTimezones);
};
