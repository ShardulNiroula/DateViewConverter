import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

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

const SupportIcon = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    {...ICON_PROPS}
    {...props}
  >
    <path d="M12 20.25s-6.75-4.05-6.75-9a3.75 3.75 0 0 1 6.6-2.34L12 9.45l.15-.54a3.75 3.75 0 0 1 6.6 2.34c0 4.95-6.75 9-6.75 9Z" />
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const renderNavItems = ({ onNavigate, bottom } = {}) => (
    <ul className="nav-list">
      {NAV_LINKS.map((link) => {
        const { to, label } = link;
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
                  bottom && 'nav-link-bottom',
                  isActive && 'nav-link-active',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
              onClick={handleClick}
            >
              <link.Icon className="nav-icon" />
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
          <path className='theme-icon-sun'
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
        <path className='theme-icon-moon'
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
          <Link to="/" className="brand" aria-label="OClock home">
            <div className="brand-icon" aria-hidden="true">
              <img src="/OCockLogo.svg" alt="OClock logo" />
            </div>
            <div className="brand-copy">
              <span className="brand-title">OClock</span>
              <span className="brand-subtitle">Where every second aligns with your goals.</span>
            </div>
          </Link>

          <nav className="nav nav-desktop" aria-label="Primary navigation">
            {renderNavItems()}
          </nav>

          <div className="header-actions">
            <Link to="/support" className="support-button">
              <SupportIcon className="support-button-icon" aria-hidden="true" />
              <span>Support us</span>
            </Link>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {renderThemeIcon()}
            </button>
            {/* removed hamburger menu; bottom navigation used on small screens */}
          </div>
        </div>
      </header>

      {/* bottom navigation for tablet / mobile */}
      <nav className="nav nav-bottom" aria-label="Primary navigation">
        {renderNavItems({ bottom: true })}
      </nav>
    </>
  );
};

export default Header;