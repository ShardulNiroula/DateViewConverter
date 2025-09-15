import React from 'react';
import './Switch.css';

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'medium',
  className = '',
  ...props
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const switchClasses = [
    'switch',
    `switch-${size}`,
    checked && 'switch-checked',
    disabled && 'switch-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="switch-container">
      <button
        type="button"
        className={switchClasses}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        {...props}
      >
        <span className="switch-slider">
          <span className="switch-thumb"></span>
        </span>
      </button>
      {label && (
        <label className="switch-label" onClick={handleToggle}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;