#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import moment from 'moment-timezone';

const CONFIG_DIR = path.resolve(process.cwd(), 'config');
const CONFIG_PATH = path.join(CONFIG_DIR, 'timezone-version.json');

const ensureConfigDir = () => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
};

const actualVersion = moment.tz?.dataVersion || 'unknown';

ensureConfigDir();
fs.writeFileSync(CONFIG_PATH, JSON.stringify({ expectedVersion: actualVersion }, null, 2));

console.log(`[tz-version] Updated expected tz database version to ${actualVersion}.`);
