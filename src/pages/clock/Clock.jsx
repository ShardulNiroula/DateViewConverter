import React, { useState } from 'react';
import useClock from '../../hooks/useClock';
import useTimeFormat from '../../hooks/useTimeFormat';
import useTimezone from '../../hooks/useTimezone';
import ClockDisplay from './components/ClockDisplay';
import FormatSwitcher from './components/FormatSwitcher';
import CountrySelector from './components/CountrySelector';
import ClockTypeSwitcher from './components/ClockTypeSwitcher';
import './Clock.css';

const Clock = () => {
  const [clockType, setClockType] = useState('digital');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  const { format, setFormat } = useTimeFormat('24');
  const { getCurrentTimeInTimezone, getTimezoneInfo } = useTimezone();
  const { time: currentTime } = useClock(0, selectedTimezone);

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };

  const handleClockTypeChange = (type) => {
    setClockType(type);
  };

  return (
    <div className="clock-page">
      <div className="clock-header">
        <h1 className="page-title">World Clock</h1>
        <p className="page-subtitle">View time across different timezones</p>
      </div>

      <div className="clock-controls">
        <div className="control-group">
          <CountrySelector
            selectedTimezone={selectedTimezone}
            onTimezoneChange={handleTimezoneChange}
          />
        </div>

        <div className="control-group">
          <ClockTypeSwitcher
            clockType={clockType}
            onClockTypeChange={handleClockTypeChange}
          />
        </div>

        <div className="control-group">
          <FormatSwitcher
            format={format}
            onFormatChange={handleFormatChange}
          />
        </div>
      </div>

      <div className="clock-main">
        <ClockDisplay
          time={currentTime}
          clockType={clockType}
          format={format}
          showDate={true}
          showSeconds={true}
        />
      </div>
    </div>
  );
};

export default Clock;