import React from 'react';
import DigitalClock from './DigitalClock';
import AnalogClock from './AnalogClock';
import './ClockDisplay.css';

const ClockDisplay = ({ time, clockType, format, showDate = true, showSeconds = true }) => {
  return (
    <div className="clock-display">
      <div className="clock-container">
        {clockType === 'digital' ? (
          <DigitalClock
            time={time}
            format={format}
            showDate={showDate}
            showSeconds={showSeconds}
          />
        ) : (
          <AnalogClock time={time} size={350} />
        )}
      </div>

      <div className="clock-info">
        <div className="time-details">
          <div className="detail-item">
            <span className="detail-label">Current Time:</span>
            <span className="detail-value">
              {time.format(format === '12' ? 'hh:mm:ss A' : 'HH:mm:ss')}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date:</span>
            <span className="detail-value">
              {time.format('dddd, MMMM D, YYYY')}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Timezone:</span>
            <span className="detail-value">
              {time.format('z (UTCZ)')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockDisplay;