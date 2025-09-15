import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "logo-link active" : "logo-link"
            }
          >
            <h1>DateView</h1>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/clock"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Clock
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Calendar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Compare
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/convert"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Convert
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Theme Controller Section */}
        <div className="theme-controller">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;