import React from 'react';
import ClockDisplay from './components/ClockDisplay';
import useClockPageState from '../../hooks/useClockPageState';
import './Clock.css';

const Clock = () => {
  const {
    currentTime,
    format,
    clockType,
    selectedTimezone,
    offsetLabel,
    timezoneTitle,
    presetDetails,
    handleFormatChange,
    handleTimezoneChange,
    handleClockTypeChange
  } = useClockPageState();

  return (
    <div className="clock-page">
      <section className="clock-content">
        <div className="clock-main">
          <ClockDisplay
            time={currentTime}
            clockType={clockType}
            format={format}
            showDate={true}
            showSeconds={true}
            timezone={selectedTimezone}
            timezoneTitle={timezoneTitle}
            offsetLabel={offsetLabel}
            timezoneDetails={presetDetails}
            onClockTypeChange={handleClockTypeChange}
            onTimezoneChange={handleTimezoneChange}
            onFormatChange={handleFormatChange}
            enableFullscreen
          />
        </div>
      </section>
    </div>
  );
};

export default Clock;