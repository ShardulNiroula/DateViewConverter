# OClock

OClock is a React + Vite application for comparing, converting, and tracking timezones with a polished UI. It provides a suite of workspaces—world clock dashboards, comparison boards, and conversion tools—to keep distributed teams perfectly aligned.

## ✨ Features

- Live world clock with analog and digital displays
- Time comparison board for scheduling across locations
- Time and date conversion workspace with dual-format input
- Preset management for favorite timezone sets
- Responsive layout with light and dark themes

## 🛠️ Development

```bash
npm install
npm run dev
```

The app uses Vite for fast development feedback and React Router for navigation between workspaces. Linters can be run with `npm run lint`, and production builds are generated with `npm run build`.

### 🕒 Timezone data hygiene

- `npm run check:tz` &mdash; verify the bundled tz database matches the pinned version in `config/timezone-version.json`.
- `npm run update:tz` &mdash; refresh the pinned tz version after upgrading `moment-timezone`.

### ✅ Tests

```bash
npm run test
```

Vitest assertions cover the generated timezone catalog and service helpers, ensuring offsets stay in sync with `moment-timezone`, every IANA zone is present, and DST-aware differences remain accurate.
