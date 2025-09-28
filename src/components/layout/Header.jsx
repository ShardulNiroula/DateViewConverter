import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const ICON_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const HomeIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M3 10.75 12 4l9 6.75" />
    <path d="M5.25 9.75V19.5A1.5 1.5 0 0 0 6.75 21h10.5a1.5 1.5 0 0 0 1.5-1.5V9.75" />
    <path d="M9.75 21V14.25h4.5V21" />
  </svg>
);

const ClockIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <circle cx="12" cy="12" r="8.25" />
    <path d="M12 7.5v5l3 1.5" />
  </svg>
);

const CompareIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M7.5 5.25 4.5 8.25l3 3" />
    <path d="M16.5 18.75 19.5 15.75l-3-3" />
    <path d="M4.5 8.25h15" />
    <path d="M4.5 15.75h15" />
  </svg>
);

const ConvertIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M6 8.25H3l3-3" />
    <path d="M18 15.75h3l-3 3" />
    <path d="M3 8.25a9 9 0 0 1 16.2-3.9" />
    <path d="M21 15.75a9 9 0 0 1-16.2 3.9" />
  </svg>
);

const MenuIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M4.5 7.5h15" />
    <path d="M4.5 12h15" />
    <path d="M7.5 16.5h12" />
  </svg>
);

const CloseIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M7 7l10 10" />
    <path d="M17 7 7 17" />
  </svg>
);

const NAV_LINKS = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/clock', label: 'Clock', Icon: ClockIcon },
  { to: '/compare', label: 'Compare', Icon: CompareIcon },
  { to: '/convert', label: 'Convert', Icon: ConvertIcon },
];

const Header = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const renderNavItems = (onNavigate) => (
    <ul className="nav-list">
      {NAV_LINKS.map(({ to, label, Icon }) => {
        const linkProps = to === '/' ? { end: true } : {};
        const handleClick = onNavigate ? () => onNavigate() : undefined;

        return (
          <li className="nav-item" key={to}>
            <NavLink
              to={to}
              {...linkProps}
              className={({ isActive }) =>
                [
                  'nav-link',
                  onNavigate && 'nav-link-mobile',
                  isActive && 'nav-link-active',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
              onClick={handleClick}
            >
              <Icon className="nav-icon" />
              <span className="nav-link-label">{label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  const renderThemeIcon = () => {
    if (theme === 'light') {
      return (
        <svg
          className="theme-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <svg
        className="theme-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 4a1 1 0 0 1-1-1V2a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1Zm5.657 2.343a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM12 20a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1Zm8-8a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Zm-8-6a6 6 0 1 1 0 12 6 6 0 0 1 0-12ZM4 13H3a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2Zm1.636 6.364a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0Zm0-12.728L4.93 5.93A1 1 0 1 1 3.515 4.515l.707-.707a1 1 0 1 1 1.414 1.414ZM18.364 19.95l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 1 1-1.414 1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="brand" aria-label="TimeWise home">
            <div className="brand-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <g clipPath="url(#clip0)">
                  <path
                    d="M42.17 20.17 27.83 5.83c1.31 1.31.57 4.36-1.63 7.94-1.35 2.19-3.25 4.58-5.55 6.88s-4.69 4.21-6.88 5.55c-3.58 2.2-6.63 2.94-7.94 1.63L20.17 42.17c1.31 1.31 4.36.57 7.94-1.63 2.19-1.35 4.58-3.25 6.88-5.55s4.21-4.69 5.55-6.88c2.2-3.58 2.94-6.63 1.63-7.94Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7.24 26.41c.07.03.4.16 1.28-.03 1.07-.23 2.51-.85 4.19-1.88 2.04-1.25 4.3-3.02 6.52-5.24 2.22-2.22 4-4.48 5.24-6.52 1.03-1.69 1.65-3.12 1.88-4.19.19-.88.06-1.2.03-1.28-.06-.03-.26-.1-.74-.05-.7.07-1.67.35-2.89.95-2.43 1.17-5.43 3.34-8.34 6.25s-5.08 5.91-6.25 8.34c-.6 1.22-.88 2.19-.95 2.89-.05.48.02.68.05.74Zm22.66-15.68c-.44 1.3-1.13 2.66-1.99 4.06-1.44 2.35-3.44 4.87-5.85 7.28-2.41 2.41-4.93 4.41-7.28 5.85-1.4.86-2.76 1.55-4.06 1.99L21.58 40.75c.02.01.32.18 1.29-.02 1.07-.23 2.51-.85 4.19-1.88 2.04-1.25 4.3-3.03 6.52-5.24 2.22-2.22 4-4.48 5.24-6.52 1.03-1.69 1.65-3.12 1.88-4.19.19-.97.03-1.27.02-1.29L29.9 10.73Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="brand-copy">
              <span className="brand-title">TimeWise</span>
              <span className="brand-subtitle">Time zone intelligence</span>
            </div>
          </Link>

          <nav className="nav nav-desktop" aria-label="Primary navigation">
            {renderNavItems()}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {renderThemeIcon()}
            </button>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? (
                <CloseIcon className="mobile-menu-icon" />
              ) : (
                <MenuIcon className="mobile-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav${isMenuOpen ? ' mobile-nav-open' : ''}`}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="mobile-nav-brand">
              <span className="mobile-nav-brand-title">TimeWise</span>
              <span className="mobile-nav-brand-subtitle">Time zone intelligence</span>
            </div>
            <button
              type="button"
              className="mobile-nav-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="mobile-menu-icon" />
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Primary navigation">
            {renderNavItems(() => setIsMenuOpen(false))}
          </nav>

          <div className="mobile-nav-footer">
            <button
              type="button"
              className="mobile-nav-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {renderThemeIcon()}
              <span className="mobile-nav-theme-text">
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;