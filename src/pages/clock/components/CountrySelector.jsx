import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown } from '../../../components/ui';
import TimezoneService from '../../../services/TimezoneService';
import './CountrySelector.css';

const CountrySelector = ({ selectedTimezone, onTimezoneChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [popularOptions, setPopularOptions] = useState([]);

  useEffect(() => {
    // Load popular timezones first for quick access
    const popular = TimezoneService.getPopularTimezones();
    setPopularOptions(popular);
    console.log('Popular options loaded:', popular.length);

    // Load all options in background
    const loadAllOptions = async () => {
      const options = TimezoneService.getCountryOptions();
      console.log('All options loaded:', options.length);
      setAllOptions(options);
    };

    loadAllOptions();
  }, []);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    // If there's no search query, show the full list when dropdown is open
    if (!searchQuery.trim()) {
      const result = isOpen ? allOptions : popularOptions;
      console.log('Filtered options (no search):', result.length, 'isOpen:', isOpen);
      return result;
    }

    const query = searchQuery.toLowerCase();
    const allFiltered = allOptions.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.country.toLowerCase().includes(query) ||
      option.city.toLowerCase().includes(query) ||
      option.timezone.toLowerCase().includes(query)
    );

    // If no results in all options, also search popular
    const popularFiltered = popularOptions.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.country.toLowerCase().includes(query) ||
      option.city.toLowerCase().includes(query) ||
      option.timezone.toLowerCase().includes(query)
    );

    // Combine and deduplicate
    const combined = [...popularFiltered, ...allFiltered];
    const unique = combined.filter((option, index, self) =>
      index === self.findIndex(o => o.value === option.value)
    );

    const result = unique.slice(0, 50); // Limit results for performance
    console.log('Filtered options (with search):', result.length, 'query:', query);
    return result;
  }, [searchQuery, allOptions, popularOptions, isOpen]);

  const handleTimezoneChange = (option) => {
    onTimezoneChange(option.value);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setIsOpen(true);
  };

  const selectedOption = useMemo(() => {
    return [...popularOptions, ...allOptions].find(option => option.value === selectedTimezone);
  }, [selectedTimezone, popularOptions, allOptions]);

  const customOptions = filteredOptions.map(option => ({
    ...option,
    label: `${option.country} - ${option.city} (${option.timezone.replace('_', ' ')})`,
    customLabel: (
      <div className="timezone-option">
        <div className="timezone-main">
          <span className="country-name">{option.country}</span>
          <span className="city-name"> - {option.city}</span>
        </div>
        <div className="timezone-details">
          <span className="timezone-name">{option.timezone.replace('_', ' ')}</span>
          <span className="timezone-offset">{option.label.split('(')[1]?.replace(')', '')}</span>
        </div>
      </div>
    )
  }));

  return (
    <div className="country-selector">
      <label className="country-label">Select Timezone</label>

      <div className="search-container">
        <input
          type="text"
          className="timezone-search"
          placeholder="Search countries, cities, or timezones..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      <Dropdown
        options={customOptions}
        value={selectedTimezone}
        onChange={handleTimezoneChange}
        placeholder="Choose a timezone..."
        className="country-dropdown"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />

      {selectedOption && (
        <div className="timezone-info">
          <div className="selected-timezone">
            <span className="selected-country">{selectedOption.country}</span>
            <span className="selected-city"> - {selectedOption.city}</span>
          </div>
          <div className="selected-details">
            <span className="selected-timezone-name">{selectedOption.timezone.replace('_', ' ')}</span>
            <span className="selected-offset">
              {selectedOption.label.split('(')[1]?.replace(')', '')}
            </span>
          </div>
        </div>
      )}

      {!searchQuery && (
        <div className="popular-hint">
          <small>💡 Search or browse popular timezones above</small>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;