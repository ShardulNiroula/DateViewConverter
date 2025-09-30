import React from 'react';

// Shared SVG icon components used across layout and feature sections.
// Stroke-based icons inherit currentColor for easy theming.
const ICON_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const HomeIcon = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} {...ICON_PROPS} {...props}>
    <path d="M3 10.75 12 4l9 6.75" />
    <path d="M5.25 9.75V19.5A1.5 1.5 0 0 0 6.75 21h10.5a1.5 1.5 0 0 0 1.5-1.5V9.75" />
    <path d="M9.75 21V14.25h4.5V21" />
  </svg>
);

export const ClockIcon = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} {...ICON_PROPS} {...props}>
    <circle cx="12" cy="12" r="8.25" />
    <path d="M12 7.5v5l3 1.5" />
  </svg>
);

export const CompareIcon = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} {...ICON_PROPS} {...props}>
    <path d="M7.5 5.25 4.5 8.25l3 3" />
    <path d="M16.5 18.75 19.5 15.75l-3-3" />
    <path d="M4.5 8.25h15" />
    <path d="M4.5 15.75h15" />
  </svg>
);

export const ConvertIcon = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} {...ICON_PROPS} {...props}>
    <path d="M6 8.25H3l3-3" />
    <path d="M18 15.75h3l-3 3" />
    <path d="M3 8.25a9 9 0 0 1 16.2-3.9" />
    <path d="M21 15.75a9 9 0 0 1-16.2 3.9" />
  </svg>
);

export default { HomeIcon, ClockIcon, CompareIcon, ConvertIcon };