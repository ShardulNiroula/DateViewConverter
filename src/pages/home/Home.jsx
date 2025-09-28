import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useClock from '../../hooks/useClock';
import useTimeFormat from '../../hooks/useTimeFormat';
import useTimezone from '../../hooks/useTimezone';
import './Home.css';

const Home = () => {
  const [selectedTimezone] = useState('UTC');
  const { format } = useTimeFormat();
  const { getTimezoneInfo, formatTimezoneOffset } = useTimezone();
  const { time: currentTime } = useClock(0, selectedTimezone);

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

  const features = [
    {
      icon: '🕐',
      title: 'World Clock',
      description: 'Track time across multiple timezones with precision',
      link: '/clock'
    },
    {
      icon: '�',
      title: 'Date Converter',
      description: 'Convert between different date formats instantly',
      link: '/convert'
    },
    {
      icon: '⚖️',
      title: 'Time Comparison',
      description: 'Compare times between different locations',
      link: '/compare'
    },
    {
      icon: '🌐',
      title: 'Timezone Insights',
      description: 'Discover offsets, abbreviations, and regional context at a glance',
      link: '/clock'
    }
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">TimeWise</span>
          <h1 className="hero-title">Master Time, Anywhere in the World</h1>
          <p className="hero-subtitle">
            Your comprehensive toolkit for timezone management, date conversion, and global time tracking.
            Stay synchronized with teams worldwide and never miss a deadline again.
          </p>

          <div className="hero-actions">
            <Link to="/clock" className="hero-button primary">
              Explore World Clock
            </Link>
            <Link to="/convert" className="hero-button secondary">
              Try Date Converter
            </Link>
          </div>
        </div>

        <div className="hero-card" role="presentation">
          <div className="hero-card-header">
            <div>
              <span className="hero-card-label">Current timezone</span>
              <h2 className="hero-card-title">{timezoneTitle}</h2>
            </div>
            <span className="hero-card-subtitle">{timezoneSubtitle}</span>
          </div>

          <div className="hero-card-meta">
            <div className="hero-meta-item">
              <span className="meta-label">UTC offset</span>
              <span className="meta-value">{offsetLabel}</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-label">Format</span>
              <span className="meta-value">{format === '12' ? '12-hour' : '24-hour'}</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">Live</span>
            </div>
          </div>

          <div className="hero-card-footer">
            <span className="hero-footer-label">Current time</span>
            <span className="hero-footer-value">
              {currentTime.format(format === '12' ? 'dddd, MMM D • hh:mm A' : 'dddd, MMM D • HH:mm')}
            </span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">Powerful Time Management Tools</h2>
          <p className="features-subtitle">
            Everything you need to handle dates, times, and timezones with confidence
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">400+</span>
            <span className="stat-label">Timezones Supported</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Real-time Updates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Precision Accuracy</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;