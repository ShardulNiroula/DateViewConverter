import React from 'react';
import ClockDisplay from './components/ClockDisplay';
import FormatSwitcher from '../../components/common/FormatSwitcher';
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
      <div className="floating-controls">
        <FormatSwitcher
          format={format}
          onFormatChange={handleFormatChange}
        />
      </div>

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
            enableFullscreen
          />
        </div>
      </section>
    </div>
  );
};

export default Clock;