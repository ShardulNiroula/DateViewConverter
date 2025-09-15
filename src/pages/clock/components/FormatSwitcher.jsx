import React from 'react';
import { Switch } from '../../../components/ui';
import './FormatSwitcher.css';

const FormatSwitcher = ({ format, onFormatChange }) => {
  const handleFormatToggle = () => {
    const newFormat = format === '12' ? '24' : '12';
    onFormatChange(newFormat);
  };

  return (
    <div className="format-switcher">
      <div className="format-switcher-content">
        <span className="format-label">12H</span>
        <Switch
          checked={format === '24'}
          onChange={handleFormatToggle}
          size="small"
        />
        <span className="format-label">24H</span>
      </div>
      <div className="format-description">
        {format === '12' ? '12-hour format' : '24-hour format'}
      </div>
    </div>
  );
};

export default FormatSwitcher;