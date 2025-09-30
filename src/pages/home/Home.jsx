import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useClock from '../../hooks/useClock';
import useTimeFormat from '../../hooks/useTimeFormat';
import useTimezone from '../../hooks/useTimezone';
import usePresetTimezones from '../../hooks/usePresetTimezones';
import './Home.css';
import { ClockIcon, CompareIcon, ConvertIcon } from '../../components/ui/Icons';
import Dropdown from '../../components/ui/Dropdown';

const featureHighlights = [
  {
    key: 'clock',
    Icon: ClockIcon,
    title: 'World Clock',
    description:
      'View the current time and date in any timezone. Switch between analog and digital displays and toggle fullscreen for focus.',
    points: [
      'Analog or digital modes',
      '12h / 24h switching',
      'Fullscreen viewing',
    ],
    link: '/clock',
    cta: 'Open clock',
  },
  {
    key: 'compare',
    Icon: CompareIcon,
    title: 'Compare Two Timezones',
    description:
      'Select two locations and see their current times side by side, with a clear difference summary.',
    points: [
      'Live two-zone view',
      'Offset explanation',
      'Swap instantly',
    ],
    link: '/compare',
    cta: 'Compare now',
  },
  {
    key: 'convert',
    Icon: ConvertIcon,
    title: 'Convert a Time',
    description:
      'Enter a date and time in one timezone and convert it to another—daylight savings handled automatically.',
    points: [
      'Date + time input',
      '12h & 24h support',
      'DST aware offsets',
    ],
    link: '/convert',
    cta: 'Convert time',
  },
];

const workflowSteps = [
  {
    title: 'Check a clock',
    body: 'Open the world clock and switch formats or styles depending on how you like to read time.',
  },
  {
    title: 'Compare two zones',
    body: 'Use the comparison page to quickly understand how far apart two places are right now.',
  },
  {
    title: 'Convert into specific timezones',
    body: 'Need to schedule or plan? Enter a time and translate it instantly to another timezone.',
  },
  {
    title: 'Adjust & repeat',
    body: 'Swap timezones, change formats, or jump fullscreen—everything updates live while you explore.',
  },
];

const quickActions = [
  { label: 'Open world clock', to: '/clock' },
  { label: 'Compare timezones', to: '/compare' },
  { label: 'Convert into specific timezone', to: '/convert' },
];

const formatOptions = [
  { value: '12', label: '12-hour (AM / PM)' },
  { value: '24', label: '24-hour (00 – 23)' },
];

const Home = () => {
  const [selectedTimezone] = useState('UTC');
  const { format, setFormat } = useTimeFormat();
  const { getTimezoneInfo, formatTimezoneOffset } = useTimezone();
  const { timezones } = usePresetTimezones();
  const { time: currentTime } = useClock(0, selectedTimezone);

  const supportedZoneCount = timezones.length;

  const formattedSupportedZones = useMemo(
    () => new Intl.NumberFormat().format(supportedZoneCount),
    [supportedZoneCount]
  );

  const heroStats = useMemo(
    () => [
      { label: 'Supported zones', value: formattedSupportedZones },
      { label: 'Formats', value: '12 / 24h' },
      { label: 'DST aware', value: 'Yes' }
    ],
    [formattedSupportedZones]
  );

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

  const timezoneParts = selectedTimezone.split('/');
  const timezoneRegion = timezoneParts[0]?.replace(/_/g, ' ') || 'Global';
  const timezoneCity = timezoneParts.slice(1).join(' / ').replace(/_/g, ' ');
  const timezoneTitle = timezoneCity || timezoneRegion;
  const timezoneSubtitle = timezoneCity ? timezoneRegion : 'Timezone';
  const referenceTimeText = format === '12' ? '12:00:00 AM' : '00:00:00';

  return (
    <div className="home-root">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Simple tools</span>
          <h1 className="headline">Understand Time Across The World</h1>
          <p className="lede">
            OClock lets you view, compare, and convert timezones without guesswork. Clean, fast, and focused, built for
            anyone who works, studies, plays, or connects across regions.
          </p>

          <div className="hero-actions">
            <Link to="/clock" className="cta primary">Open clock</Link>
            <Link to="/compare" className="cta ghost">Compare zones</Link>
          </div>

          <dl className="hero-stats">
            {heroStats.map((item) => (
              <div key={item.label} className="stat">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero-panel" aria-label="Live time snapshot">
          <header className="panel-header">
            <div className="panel-region">
              <span className="panel-region-label">Reference timezone</span>
              <h2 className="panel-region-title">{timezoneTitle}</h2>
              <span className="panel-region-subtitle">{timezoneSubtitle}</span>
            </div>
            <span className="panel-offset">{offsetLabel}</span>
          </header>

          <div className="panel-time">
            <span className="panel-time-label">Reference time</span>
            <time className="panel-time-value" dateTime="00:00:00">{referenceTimeText}</time>
            <span className="panel-time-meta">{currentTime.format('dddd, MMM D')}</span>
          </div>

          <div className="panel-format">
            <div className="panel-format-copy">
              <span className="panel-format-label">Display format</span>
              <span className="panel-format-value">{format === '12' ? '12-hour preference' : '24-hour preference'}</span>
            </div>
            <Dropdown
              className="panel-format-dropdown"
              options={formatOptions}
              value={format}
              onChange={(option) => setFormat(option.value)}
              placeholder="Choose format"
            />
          </div>

          <div className="panel-quick-actions" aria-label="Jump to tools">
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to} className="quick-action">
                <span>{action.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="feature-mosaic">
        <div className="section-heading">
          <h2>What you can do</h2>
          <p>
            Everything here reflects features available today—no fluff, just the core utilities that make timezone work
            easier.
          </p>
        </div>

        <div className="feature-grid">
          {featureHighlights.map((feature) => {
            const { key, Icon, title, description, points, link, cta } = feature;
            return (
              <article key={key} className="feature-card">
                <span className="feature-icon" aria-hidden="true"><Icon className="feature-icon-svg" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={link} className="feature-link">
                  {cta}
                  <span aria-hidden="true"> →</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="workflow">
        <div className="section-heading">
          <h2>How it fits together</h2>
          <p>Move between clock, comparison, and conversion views to answer any “what time is it?” question fast.</p>
        </div>

        <ol className="workflow-steps">
          {workflowSteps.map((step, index) => (
            <li key={step.title}>
              <span className="step-index">{index + 1}</span>
              <div className="step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cta-band">
        <div className="cta-copy">
          <h2>Try it now</h2>
          <p>
            Jump into the clock, compare two places, or convert a date. No sign‑up—just useful tools.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/clock" className="cta primary">Open clock</Link>
          <Link to="/convert" className="cta ghost">Convert time</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;