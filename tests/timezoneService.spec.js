import { describe, expect, it } from 'vitest';
import moment from 'moment-timezone';
import TimezoneService from '../src/services/TimezoneService.js';

describe('TimezoneService', () => {
  it('returns DST-aware timezone info', () => {
    const info = TimezoneService.getTimezoneByName('America/New_York');
    expect(info).toBeTruthy();
    expect(info?.name).toBe('America/New_York');
    expect(info?.abbreviation).toBeTruthy();

    const expectedOffset = moment().tz('America/New_York').utcOffset();
    expect(info?.utcOffset).toBe(expectedOffset);
  });

  it('searches timezones by city or country name', () => {
    const results = TimezoneService.searchTimezones('london');
    const ids = results.map((record) => record.value);
    expect(ids).toContain('Europe/London');
  });

  it('computes time difference using minute precision', () => {
    const diffMinutes = TimezoneService.getTimeDifference('Europe/London', 'America/New_York', {
      inMinutes: true
    });
    const expectedDiff = moment().tz('America/New_York').utcOffset() - moment().tz('Europe/London').utcOffset();
    expect(diffMinutes).toBe(expectedDiff);
  });

  it('lists popular timezones with metadata', () => {
    const popular = TimezoneService.getPopularTimezones();
    expect(popular.length).toBeGreaterThan(0);
    expect(popular.some((entry) => entry.value === 'Asia/Tokyo')).toBe(true);
    popular.forEach((entry) => {
      expect(entry.label).toMatch(/UTC[+-]/);
      expect(typeof entry.offsetMinutes).toBe('number');
    });
  });
});
