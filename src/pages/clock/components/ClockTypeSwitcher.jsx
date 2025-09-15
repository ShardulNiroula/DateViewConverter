import React from 'react';
import { Button } from '../../../components/ui';
import './ClockTypeSwitcher.css';

const ClockTypeSwitcher = ({ clockType, onClockTypeChange }) => {
  const handleDigitalClick = () => {
    onClockTypeChange('digital');
  };

  const handleAnalogClick = () => {
    onClockTypeChange('analog');
  };

  return (
    <div className="clock-type-switcher">
      <div className="switcher-buttons">
        <Button
          variant={clockType === 'digital' ? 'primary' : 'outline'}
          size="medium"
          onClick={handleDigitalClick}
          className="type-button"
        >
          Digital
        </Button>
        <Button
          variant={clockType === 'analog' ? 'primary' : 'outline'}
          size="medium"
          onClick={handleAnalogClick}
          className="type-button"
        >
          Analog
        </Button>
      </div>
      <div className="type-description">
        {clockType === 'digital' ? 'Digital clock display' : 'Analog clock display'}
      </div>
    </div>
  );
};

export default ClockTypeSwitcher;