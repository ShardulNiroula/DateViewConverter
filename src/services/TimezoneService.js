import ct from 'countries-and-timezones';
import moment from 'moment-timezone';
import {
  findTimezoneRecord,
  formatOffsetLabel,
  getTimezoneRecords
} from '../utils/timezoneCatalog.js';

const POPULAR_TIMEZONE_IDS = [
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Toronto',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'America/Buenos_Aires',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Europe/Madrid',
  'Europe/Amsterdam',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Seoul',
  'Asia/Hong_Kong',
  'Australia/Sydney',
  'Australia/Perth',
  'Pacific/Auckland',
  'Africa/Johannesburg',
  'Africa/Cairo'
];

const getMomentForZone = (timezoneName) => {
  if (!timezoneName || !moment.tz.zone(timezoneName)) {
    return moment().tz('UTC');
  }

  try {
    return moment().tz(timezoneName);
  } catch (error) {
    console.warn(`Unable to resolve timezone ${timezoneName}`, error);
    return moment().tz('UTC');
  }
};

const buildCountryTimezoneMap = () => {
  const records = getTimezoneRecords();
  const countriesMeta = ct.getAllCountries();

  const countryMap = new Map();

  records.forEach((record) => {
    const countryCodes = record.countryCodes.length ? record.countryCodes : [null];

    countryCodes.forEach((code) => {
      const countryKey = code || record.region;
      const countryName = code ? countriesMeta[code]?.name : record.country;

      if (!countryMap.has(countryKey)) {
        countryMap.set(countryKey, {
          code: code || countryKey,
          name: countryName || record.country || record.region,
          timezones: []
        });
      }

      const zoneMoment = getMomentForZone(record.value);
      const offsetMinutes = zoneMoment.utcOffset();

      countryMap.get(countryKey).timezones.push({
        name: record.value,
        offsetMinutes,
        abbreviation: zoneMoment.format('z') || record.value.split('/').pop(),
        gmtLabel: formatOffsetLabel(offsetMinutes)
      });
    });
  });

  return Array.from(countryMap.values()).map((country) => ({
    ...country,
    timezones: country.timezones.sort((a, b) => a.name.localeCompare(b.name))
  })).sort((a, b) => a.name.localeCompare(b.name));
};

const buildCountryIndex = () => buildCountryTimezoneMap();

class TimezoneService {
  static getAllCountries() {
    return buildCountryIndex();
  }

  static getCountryByCode(code) {
    if (!code) {
      return null;
    }
    return this.getAllCountries().find((country) => country.code === code) || null;
  }

  static getTimezoneByName(timezoneName) {
    if (!timezoneName) {
      return null;
    }

    const record = findTimezoneRecord(timezoneName);
    if (!record) {
      return null;
    }

    const zoneMoment = getMomentForZone(timezoneName);
    const offsetMinutes = zoneMoment.utcOffset();

    return {
      name: record.value,
      abbreviation: zoneMoment.format('z'),
      utcOffset: offsetMinutes,
      offsetMinutes,
      countries: record.countryCodes,
      region: record.region,
      city: record.city,
      gmtLabel: formatOffsetLabel(offsetMinutes),
      isDST: zoneMoment.isDST()
    };
  }

  static getAllTimezones() {
    return getTimezoneRecords();
  }

  static searchCountries(query) {
    const normalized = (query || '').toLowerCase();
    if (!normalized) {
      return this.getAllCountries();
    }

    return this.getAllCountries().filter((country) =>
      country.name.toLowerCase().includes(normalized) ||
      (country.code || '').toLowerCase().includes(normalized)
    );
  }

  static searchTimezones(query) {
    const normalized = (query || '').toLowerCase();
    const records = getTimezoneRecords();

    if (!normalized) {
      return records;
    }

    return records.filter((record) => record.searchValue.includes(normalized));
  }

  static getTimezoneOffset(timezoneName, { inMinutes = false } = {}) {
    const zoneMoment = getMomentForZone(timezoneName);
    const offsetMinutes = zoneMoment.utcOffset();
    return inMinutes ? offsetMinutes : offsetMinutes / 60;
  }

  static getCurrentTimeInTimezone(timezoneName) {
    return getMomentForZone(timezoneName);
  }

  static formatTimezoneOffset(offsetValue, { inputIsMinutes = false } = {}) {
    const offsetMinutes = inputIsMinutes ? offsetValue : offsetValue * 60;
    return formatOffsetLabel(offsetMinutes);
  }

  static getCountryOptions() {
    const records = getTimezoneRecords();

    return records
      .map((record) => {
        const zoneMoment = getMomentForZone(record.value);
        const offsetMinutes = zoneMoment.utcOffset();

        const countryLabel = record.country || record.region;
        const cityLabel = record.city || record.region;

        return {
          value: record.value,
          label: `${countryLabel} - ${cityLabel} (${formatOffsetLabel(offsetMinutes)})`,
          country: countryLabel,
          city: cityLabel,
          timezone: record.value,
          offset: offsetMinutes,
          offsetMinutes,
          gmtLabel: formatOffsetLabel(offsetMinutes),
          isDST: zoneMoment.isDST()
        };
      })
      .sort((a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city));
  }

  static getPopularTimezones() {
    const records = getTimezoneRecords();
    const recordMap = new Map(records.map((record) => [record.value, record]));

    return POPULAR_TIMEZONE_IDS
      .map((timezoneId) => {
        const record = recordMap.get(timezoneId);
        if (!record) {
          return null;
        }

        const zoneMoment = getMomentForZone(record.value);
        const offsetMinutes = zoneMoment.utcOffset();
        const countryLabel = record.country || record.region;
        const cityLabel = record.city || record.region;

        return {
          value: record.value,
          label: `${countryLabel} - ${cityLabel} (${formatOffsetLabel(offsetMinutes)})`,
          country: countryLabel,
          city: cityLabel,
          timezone: record.value,
          offset: offsetMinutes,
          offsetMinutes,
          gmtLabel: formatOffsetLabel(offsetMinutes),
          isDST: zoneMoment.isDST()
        };
      })
      .filter(Boolean);
  }

  static getTimezonesByCountry(countryCode) {
    if (!countryCode) {
      return [];
    }

    return getTimezoneRecords().filter((record) =>
      record.countryCodes.includes(countryCode)
    );
  }

  static getTimeDifference(timezone1, timezone2, { inMinutes = false } = {}) {
    const offset1 = this.getTimezoneOffset(timezone1, { inMinutes: true });
    const offset2 = this.getTimezoneOffset(timezone2, { inMinutes: true });
    const diffMinutes = offset2 - offset1;
    return inMinutes ? diffMinutes : diffMinutes / 60;
  }
}

export default TimezoneService;