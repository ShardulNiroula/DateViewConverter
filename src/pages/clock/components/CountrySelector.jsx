import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePresetTimezones from '../../../hooks/usePresetTimezones';
import './CountrySelector.css';

const formatOptionLabel = (option) => `${option.city}, ${option.country} (${option.gmtLabel})`;

const CountrySelector = ({
  selectedTimezone,
  onTimezoneChange,
  hideLabel = false,
  label = 'Select Timezone',
  className
}) => {
  const { timezones, searchTimezones } = usePresetTimezones();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const containerClassName = ['country-selector', className].filter(Boolean).join(' ');

  const selectedOption = useMemo(
    () => timezones.find((timezone) => timezone.value === selectedTimezone) || null,
    [timezones, selectedTimezone]
  );

  const effectiveSearchTerm = hasTyped ? searchTerm : '';

  const filteredTimezones = useMemo(
    () => searchTimezones(effectiveSearchTerm),
    [effectiveSearchTerm, searchTimezones]
  );

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setHasTyped(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
    setHasTyped(false);
    const label = selectedOption ? formatOptionLabel(selectedOption) : '';
    setSearchTerm(label);
  };

  const handleInputChange = (event) => {
    setHasTyped(true);
    setSearchTerm(event.target.value);
  };

  const handleInputMouseDown = (event) => {
    if (isOpen) {
      event.preventDefault();
      setIsOpen(false);
      setHasTyped(false);
      setSearchTerm('');
      inputRef.current?.blur();
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setHasTyped(false);
        setSearchTerm('');
      }
    }, 120);
  };

  const handleToggleMouseDown = (event) => {
    event.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      setHasTyped(false);
      setSearchTerm('');
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleOptionSelect = (option) => {
    onTimezoneChange(option.value);
    setIsOpen(false);
    setHasTyped(false);
    setSearchTerm('');
    inputRef.current?.blur();
  };

  const inputValue = isOpen
    ? searchTerm
    : selectedOption
    ? formatOptionLabel(selectedOption)
    : '';

  const optionsToRender = filteredTimezones;

  return (
    <div className={containerClassName} ref={containerRef}>
      {!hideLabel && (
        <div className="selector-label-group">
          <span className="selector-label">{label}</span>
        </div>
      )}

      <div className={`selector-input ${isOpen ? 'selector-input--open' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className="selector-input-field"
          placeholder="Search countries, cities, or timezones..."
          value={inputValue}
          onMouseDown={handleInputMouseDown}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <button
          type="button"
          className={`selector-toggle ${isOpen ? 'selector-toggle--open' : ''}`}
          onMouseDown={handleToggleMouseDown}
          aria-label={isOpen ? 'Close timezone list' : 'Open timezone list'}
        >
          <span aria-hidden="true">⌄</span>
        </button>
      </div>

      {isOpen && (
        <div className="selector-dropdown" role="listbox">
          {optionsToRender.length > 0 ? (
            <ul>
              {optionsToRender.map((option) => (
                <li
                  key={option.value}
                  className={`selector-option ${
                    option.value === selectedOption?.value ? 'selector-option--active' : ''
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={option.value === selectedOption?.value}
                >
                  <div className="selector-option-main">
                    <span className="selector-option-city">{option.city}</span>
                    <span className="selector-option-country">{option.country}</span>
                  </div>
                  <div className="selector-option-meta">
                    <span className="selector-option-offset">{option.gmtLabel}</span>
                    <span className="selector-option-code">{option.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="selector-empty">No results found. Try another search.</div>
          )}
        </div>
      )}

    </div>

  );
};

export default CountrySelector;