import ct from 'countries-and-timezones';
import moment from 'moment-timezone';

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // refresh offsets every 5 minutes

const formatUtcLabel = (offsetMinutes) => {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (absoluteMinutes % 60).toString().padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
};

const normalize = (value = '') => value.toLowerCase();

const deriveRegionAndCity = (timezoneName) => {
  const parts = timezoneName.split('/');
  const region = parts[0]?.replace(/_/g, ' ') || 'Unknown';
  const city = parts.length > 1
    ? parts.slice(1).join(' / ').replace(/_/g, ' ')
    : region;

  return { region, city };
};

const buildSearchString = ({
  timezone,
  city,
  region,
  countries,
  countryCodes,
  gmtLabel,
  keywords
}) => {
  return [
    timezone,
    city,
    region,
    gmtLabel,
    ...countries,
    ...countryCodes,
    ...(keywords || [])
  ]
    .filter(Boolean)
    .map((value) => value.toString().toLowerCase())
    .join(' ');
};

const buildDescription = ({ city, countries, gmtLabel }) => {
  const location = [city, countries[0]].filter(Boolean).join(', ');
  if (!location) {
    return `Currently observing ${gmtLabel}.`;
  }
  return `${location} is currently observing ${gmtLabel}.`;
};

const buildTimezoneRecords = () => {
  const countriesMap = ct.getAllCountries();
  const allMomentZones = moment.tz.names();

  const records = [];

  for (const timezone of allMomentZones) {
    // Skip aliases to prevent duplicates in the UI
    // The IANA timezone database contains 597 names, but 257 are deprecated aliases
    // (e.g., Asia/Katmandu -> Asia/Kathmandu, Japan -> Asia/Tokyo, etc.)
    // We filter these out to show only the 340 canonical zones
    const tzMetadata = ct.getTimezone(timezone);
    if (tzMetadata?.aliasOf) {
      continue; // This is an alias, skip it
    }

    const zone = moment.tz.zone(timezone);
    if (!zone) continue;
    
    const canonical = timezone; // Already filtered aliases, so timezone is canonical
    const { region, city } = deriveRegionAndCity(canonical);

    const countryCodes = tzMetadata?.countries || [];
    const countries = countryCodes
      .map((code) => countriesMap[code]?.name)
      .filter(Boolean);
    const primaryCountry = countries[0] || region;

    const currentOffsetMinutes = moment().tz(canonical).utcOffset();
    const gmtLabel = formatUtcLabel(currentOffsetMinutes);

    const keywords = new Set();
    const addKeyword = (value) => {
      if (value) {
        keywords.add(normalize(value));
      }
    };

    addKeyword(canonical);
    addKeyword(city);
    addKeyword(region);
    countries.forEach(addKeyword);
    countryCodes.forEach(addKeyword);
    if (tzMetadata?.name) {
      addKeyword(tzMetadata.name);
    }
    if (tzMetadata?.abbreviation) {
      addKeyword(tzMetadata.abbreviation);
    }

    const description = buildDescription({ city, countries, gmtLabel });

    records.push({
      value: canonical,
      timezone: canonical,
      city,
      region,
      country: primaryCountry,
      countries,
      countryCodes,
      offsetMinutes: currentOffsetMinutes,
      gmtLabel,
      description,
      keywords: Array.from(keywords),
      searchValue: buildSearchString({
        timezone: canonical,
        city,
        region,
        countries,
        countryCodes,
        gmtLabel,
        keywords: Array.from(keywords)
      })
    });
  }

  return records;
};

let cacheTimestamp = 0;
let cachedTimezones = [];

export const getTimezoneRecords = () => {
  const now = Date.now();
  if (!cachedTimezones.length || now - cacheTimestamp > REFRESH_INTERVAL_MS) {
    cachedTimezones = buildTimezoneRecords();
    cacheTimestamp = now;
  }
  return cachedTimezones;
};

export const refreshTimezoneRecords = () => {
  cachedTimezones = buildTimezoneRecords();
  cacheTimestamp = Date.now();
  return cachedTimezones;
};

export const formatOffsetLabel = formatUtcLabel;

export const REFRESH_INTERVAL = REFRESH_INTERVAL_MS;

export const findTimezoneRecord = (timezoneName) => {
  if (!timezoneName) {
    return null;
  }

  // Resolve aliases to canonical names
  const tzMetadata = ct.getTimezone(timezoneName);
  const canonical = tzMetadata?.aliasOf || timezoneName;

  const zone = moment.tz.zone(canonical);
  if (!zone) {
    return null;
  }

  const records = getTimezoneRecords();
  return records.find((record) => record.value === canonical) || null;
};