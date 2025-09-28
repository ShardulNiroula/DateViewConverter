import React from 'react';
import './FormatSwitcher.css';

const FORMAT_DETAILS = {
  '12': {
    title: '12-hour format',
    description: 'Classic AM / PM representation with a 12-hour cycle.'
  },
  '24': {
    title: '24-hour format',
    description: 'Continuous 24-hour clock, ideal for travel and scheduling.'
  }
};

const FormatSwitcher = ({ format, onFormatChange }) => {
  const selectFormat = (value) => {
    if (value !== format) {
      onFormatChange(value);
    }
  };

  return (
    <div className="format-switcher" role="group" aria-label="Time format">
      <div className="format-toggle">
        <span
          className={`format-toggle-glider ${format === '24' ? 'is-right' : ''}`}
          aria-hidden="true"
        />

        <button
          type="button"
          className={`format-toggle-option ${format === '12' ? 'is-active' : ''}`}
          onClick={() => selectFormat('12')}
          aria-pressed={format === '12'}
        >
          <span className="format-toggle-label">12H</span>
          <span className="format-toggle-support">AM · PM</span>
        </button>

        <button
          type="button"
          className={`format-toggle-option ${format === '24' ? 'is-active' : ''}`}
          onClick={() => selectFormat('24')}
          aria-pressed={format === '24'}
        >
          <span className="format-toggle-label">24H</span>
          <span className="format-toggle-support">00 – 23</span>
        </button>
      </div>
    </div>
  );
};

export default FormatSwitcher;