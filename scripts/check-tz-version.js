#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import moment from 'moment-timezone';

const CONFIG_PATH = path.resolve(process.cwd(), 'config', 'timezone-version.json');

const readExpectedVersion = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.warn('[tz-version] Missing config/timezone-version.json; skipping strict validation.');
    return null;
  }

  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const json = JSON.parse(raw);
    return json.expectedVersion || null;
  } catch (error) {
    console.error('[tz-version] Unable to parse config/timezone-version.json:', error);
    return null;
  }
};

const expectedVersion = readExpectedVersion();
const actualVersion = moment.tz?.dataVersion || 'unknown';

if (!expectedVersion) {
  console.log(`[tz-version] Current tz database version: ${actualVersion}`);
  process.exit(0);
}

if (expectedVersion !== actualVersion) {
  console.error('[tz-version] Timezone database version mismatch.');
  console.error(`  Expected: ${expectedVersion}`);
  console.error(`  Actual:   ${actualVersion}`);
  console.error('  Run "npm run update-tz" to refresh the pinned version.');
  process.exit(1);
}

console.log(`[tz-version] Timezone database up-to-date (${actualVersion}).`);
