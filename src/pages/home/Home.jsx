import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePresetTimezones from '../../hooks/usePresetTimezones';
import './Home.css';
import { ClockIcon, CompareIcon, ConvertIcon, GlobeIcon, SmallClockIcon, CheckIcon } from '../../components/ui/Icons';

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
      'Enter a date and time in one timezone and convert it to another. Daylight savings handled automatically.',
    points: [
      'Date + time input',
      '12h & 24h support',
      'DST aware offsets',
    ],
    link: '/convert',
    cta: 'Convert time',
  },
  {
    key: 'offline',
    Icon: CheckIcon,
    title: 'Works Offline',
    description:
      'Use most features without an internet connection once the app is loaded. Perfect for travel or areas with poor connectivity.',
    points: [
      'No internet needed after load',
      'All timezone calculations local',
      'Data may need updates occasionally',
      'DST handling may need internet access occasionally',
    ],
    link: '#',
    cta: '',
  },
];

const Home = () => {
  const { timezones } = usePresetTimezones();
  

  const supportedZoneCount = timezones.length;

  const formattedSupportedZones = useMemo(
    () => new Intl.NumberFormat().format(supportedZoneCount),
    [supportedZoneCount]
  );

  const heroStats = useMemo(
    () => [
      { label: 'Supported zones', value: formattedSupportedZones },
      { label: 'Formats', value: '12 / 24h' },
      { label: '', value: 'DST Aware' },
      { label: '', value: 'Works Offline' }
    ],
    [formattedSupportedZones]
  );

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <span className="eyebrow" ref={eyebrowRef => {
          // attach ref via callback so we can set top on mount from CSS/JS
          if (eyebrowRef) {
            // store on the element for later access via effect
            eyebrowRef.dataset.attached = 'true';
          }
        }}>Simple tool</span>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="headline">Master Global Time Zones Effortlessly</h1>
            <p className="lede">
              OClock lets you view, compare, and convert timezones without guesswork. Clean, fast, and focused, built for
              anyone who works, studies, plays, or connects across regions.
            </p>
          </div>
          <div className="hero-actions">
            <div className="action-cards">
              <Link to="/clock" className="action-card primary">
                <div className="action-icon">
                  <ClockIcon className="action-icon-svg" />
                </div>
                <div className="action-content">
                  <h3>World Clock</h3>
                  <p>View current time anywhere</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>
              
              <Link to="/compare" className="action-card secondary">
                <div className="action-icon">
                  <CompareIcon className="action-icon-svg" />
                </div>
                <div className="action-content">
                  <h3>Compare Zones</h3>
                  <p>Side-by-side time comparison</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>
              
              <Link to="/convert" className="action-card tertiary">
                <div className="action-icon">
                  <ConvertIcon className="action-icon-svg" />
                </div>
                <div className="action-content">
                  <h3>Convert Time</h3>
                  <p>Transform between timezones</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stats-showcase">
              <div className="stat-orb primary-orb">
                <div className="orb-content">
                  <div className="orb-icon">
                    <GlobeIcon className="stat-icon-svg" />
                  </div>
                  <div className="orb-data">
                    <div className="orb-number">{heroStats[0].value}</div>
                    <div className="orb-label">{heroStats[0].label}</div>
                  </div>
                </div>
                <div className="orb-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                </div>
              </div>

              <div className="stat-orb secondary-orb">
                <div className="orb-content">
                  <div className="orb-icon">
                    <SmallClockIcon className="stat-icon-svg" />
                  </div>
                  <div className="orb-data">
                    <div className="orb-number">{heroStats[1].value}</div>
                    <div className="orb-label">{heroStats[1].label}</div>
                  </div>
                </div>
                <div className="orb-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                </div>
              </div>

              <div className="stat-orb tertiary-orb">
                <div className="orb-content">
                  <div className="orb-icon">
                    <CheckIcon className="stat-icon-svg" />
                  </div>
                  <div className="orb-data">
                    <div className="orb-number">{heroStats[2].value}</div>
                    <div className="orb-label">{heroStats[2].label}</div>
                  </div>
                </div>
                <div className="orb-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                </div>
              </div>

              <div className="stat-orb quaternary-orb">
                <div className="orb-content">
                  <div className="orb-icon">
                    <CheckIcon className="stat-icon-svg" />
                  </div>
                  <div className="orb-data">
                    <div className="orb-number">{heroStats[3].value}</div>
                    <div className="orb-label">{heroStats[3].label}</div>
                  </div>
                </div>
                <div className="orb-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-header">
          <h2>What you can do</h2>
          <p>
            This section outlines the features available today, focusing on essential utilities designed to simplify timezone management.
          </p>
        </div>
        <div className="features-grid">
          {featureHighlights.map((feature) => {
            const { key, Icon, title, description, points, link, cta } = feature;
            return (
              <div key={key} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">
                    <Icon className="feature-icon-svg" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <div className="feature-body">
                  <p>{description}</p>
                  <div className="feature-points">
                    {points.map((point) => (
                      <span key={point} className="point-badge">{point}</span>
                    ))}
                  </div>
                </div>
                {cta && (
                  <Link to={link} className="feature-link">
                    {cta}
                    <span className="link-arrow">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
