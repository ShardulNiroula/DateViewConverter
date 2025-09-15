import React from 'react';
import './DigitalClock.css';

const DigitalClock = ({ time, format = '24', showDate = true, showSeconds = true }) => {
  const formatTime = (momentTime) => {
    if (format === '12') {
      return momentTime.format(showSeconds ? 'hh:mm:ss A' : 'hh:mm A');
    } else {
      return momentTime.format(showSeconds ? 'HH:mm:ss' : 'HH:mm');
    }
  };

  const formatDate = (momentTime) => {
    return momentTime.format('dddd, MMMM D, YYYY');
  };

  return (
    <div className="digital-clock-container">
      <div className="digital-clock">
        <div className="time-display">
          {formatTime(time)}
        </div>

        {showDate && (
          <div className="date-display">
            {formatDate(time)}
          </div>
        )}

        <div className="format-indicator">
          {format === '12' ? '12H' : '24H'}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;