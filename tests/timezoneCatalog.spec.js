import { describe, expect, it } from 'vitest';
import moment from 'moment-timezone';
import {
  findTimezoneRecord,
  getTimezoneRecords,
  refreshTimezoneRecords
} from '../src/utils/timezoneCatalog.js';

describe('timezone catalog', () => {
  it('includes every IANA timezone exposed by moment-timezone', () => {
    refreshTimezoneRecords();
    const records = getTimezoneRecords();
    const names = new Set(records.map((record) => record.value));

    const criticalZones = [
      'America/New_York',
      'Europe/London',
      'America/Puerto_Rico',
      'Pacific/Guam',
      'Asia/Kathmandu',
      'Africa/Cairo',
      'Etc/GMT+12'
    ];

    criticalZones.forEach((zone) => {
      expect(names.has(zone)).toBe(true);
    });
  });

  it('has no duplicate canonical timezones', () => {
    refreshTimezoneRecords();
    const records = getTimezoneRecords();
    const canonicalNames = records.map((record) => record.value);
    const uniqueNames = new Set(canonicalNames);
    expect(canonicalNames.length).toBe(uniqueNames.size);
  });

  it('keeps offset metadata aligned with moment-timezone', () => {
    refreshTimezoneRecords();
    const records = getTimezoneRecords();

    records.forEach((record) => {
      const expectedOffset = moment().tz(record.value).utcOffset();
      expect(record.offsetMinutes).toBe(expectedOffset);
    });
  });

  it('can look up individual zone records', () => {
    const record = findTimezoneRecord('America/Phoenix');
    expect(record).toBeTruthy();
    expect(record?.value).toBe('America/Phoenix');
    expect(record?.country).toContain('United States');
  });

  it('excludes deprecated timezone aliases from catalog', () => {
    refreshTimezoneRecords();
    const records = getTimezoneRecords();
    const values = records.map((record) => record.value);

    // These are deprecated aliases that should NOT appear in the catalog
    const deprecatedAliases = [
      'Asia/Katmandu',     // alias of Asia/Kathmandu
      'Japan',             // alias of Asia/Tokyo
      'Asia/Calcutta',     // alias of Asia/Kolkata
      'Hongkong'           // alias of Asia/Hong_Kong
    ];

    deprecatedAliases.forEach((alias) => {
      expect(values.includes(alias)).toBe(false);
    });

    // But their canonical versions SHOULD be present
    expect(values.includes('Asia/Kathmandu')).toBe(true);
    expect(values.includes('Asia/Tokyo')).toBe(true);
    expect(values.includes('Asia/Kolkata')).toBe(true);
    expect(values.includes('Asia/Hong_Kong')).toBe(true);
  });

  it('resolves aliases to canonical zones when looking up', () => {
    // Should resolve deprecated aliases to their canonical forms
    const katmandu = findTimezoneRecord('Asia/Katmandu');
    expect(katmandu?.value).toBe('Asia/Kathmandu');

    const japan = findTimezoneRecord('Japan');
    expect(japan?.value).toBe('Asia/Tokyo');

    const calcutta = findTimezoneRecord('Asia/Calcutta');
    expect(calcutta?.value).toBe('Asia/Kolkata');

    const hongkong = findTimezoneRecord('Hongkong');
    expect(hongkong?.value).toBe('Asia/Hong_Kong');
  });
});
