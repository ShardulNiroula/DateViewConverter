import React, { useRef, useEffect } from 'react';
import './Convert.css';
import FormatSwitcher from '../../components/common/FormatSwitcher';
import { Button } from '../../components/ui';
import CountrySelector from '../clock/components/CountrySelector';
import useTimeConversion from '../../hooks/useTimeConversion';

const TIME_PARTS_BY_FORMAT = {
  '12': [
    { key: 'hours', label: 'Hours', placeholder: 'HH', min: 1, max: 12 },
    { key: 'minutes', label: 'Minutes', placeholder: 'MM', min: 0, max: 59 },
    { key: 'seconds', label: 'Seconds', placeholder: 'SS', min: 0, max: 59 }
  ],
  '24': [
    { key: 'hours', label: 'Hours', placeholder: 'HH', min: 0, max: 23 },
    { key: 'minutes', label: 'Minutes', placeholder: 'MM', min: 0, max: 59 },
    { key: 'seconds', label: 'Seconds', placeholder: 'SS', min: 0, max: 59 }
  ]
};

const Convert = () => {
  const resultRef = useRef(null);

  const {
    format,
    handleFormatChange,
    sourceTimezone,
    targetTimezone,
    sourceDisplay,
    targetDisplay,
    setSourceTimezone,
    setTargetTimezone,
    swapTimezones,
    dateValue,
    setDateValue,
    timeValues,
    setTimePart,
    handleConvert,
    errors,
    result
  } = useTimeConversion();

  const timeFormat = format === '12' ? 'hh:mm:ss A' : 'HH:mm:ss';
  const dateFormat = 'dddd, MMM D, YYYY';

  const hasResult = Boolean(result);
  const sourceMoment = result?.source.moment;
  const targetMoment = result?.target.moment;
  const difference = result?.difference;

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const sourceFormattedTime = hasResult ? sourceMoment.format(timeFormat) : null;
  const sourceFormattedDate = hasResult ? sourceMoment.format(dateFormat) : null;
  const targetFormattedTime = hasResult ? targetMoment.format(timeFormat) : null;
  const targetFormattedDate = hasResult ? targetMoment.format(dateFormat) : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleConvert();
  };

  const handleTimeInputChange = (part) => (event) => {
    setTimePart(part, event.target.value);
  };

  const timeParts = TIME_PARTS_BY_FORMAT[format] || TIME_PARTS_BY_FORMAT['24'];

  return (
    <div className="convert-page">
      <header className="convert-header">
        <div className="convert-headline">
          <h1 className="convert-title">Convert Time Zones Seamlessly</h1>
          <p className="convert-subtitle">
            Capture a moment in one location and instantly translate it to any destination timezone.
          </p>
        </div>

        <div className="convert-header-actions">
          <FormatSwitcher format={format} onFormatChange={handleFormatChange} />
          <Button
            type="button"
            variant="secondary"
            size="medium"
            className="convert-swap"
            onClick={swapTimezones}
          >
            Swap timezones
          </Button>
        </div>
      </header>

      <form className="convert-form" onSubmit={handleSubmit} noValidate>
        <div className="convert-grid">
          <section className="convert-card">
            <header className="convert-card-header">
              <h2>From</h2>
              <span>Original timezone and time</span>
            </header>

            <CountrySelector
              selectedTimezone={sourceTimezone}
              onTimezoneChange={setSourceTimezone}
              label="Source timezone"
              className="convert-selector"
            />

            <div className="convert-card-meta">
              {sourceDisplay.gmtLabel && (
                <span className="convert-card-chip">{sourceDisplay.gmtLabel}</span>
              )}
              {sourceDisplay.subtitle && (
                <span className="convert-card-chip muted">{sourceDisplay.subtitle}</span>
              )}
              <span className="convert-card-code">{sourceDisplay.timezone}</span>
            </div>

            <div className="convert-time-inputs" role="group" aria-label="Source time">
              {timeParts.map((part, index) => (
                <React.Fragment key={part.key}>
                  <div className="convert-time-field">
                    <label htmlFor={`convert-${part.key}`}>{part.label}</label>
                    <input
                      id={`convert-${part.key}`}
                      name={part.key}
                      type="number"
                      inputMode="numeric"
                      min={part.min}
                      max={part.max}
                      placeholder={part.placeholder}
                      value={timeValues[part.key]}
                      onChange={handleTimeInputChange(part.key)}
                    />
                  </div>
                  {index < timeParts.length - 1 && (
                    <span className="convert-time-separator" aria-hidden="true">:</span>
                  )}
                </React.Fragment>
              ))}
              {format === '12' && (
                <div className="convert-time-field convert-meridiem-field">
                  <label htmlFor="convert-meridiem">Period</label>
                  <select
                    id="convert-meridiem"
                    name="meridiem"
                    value={timeValues.meridiem}
                    onChange={(event) => setTimePart('meridiem', event.target.value)}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              )}
            </div>

            <div className="convert-date-field">
              <label htmlFor="convert-date">Date</label>
              <input
                id="convert-date"
                type="date"
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
              />
            </div>
          </section>

          <section className="convert-card">
            <header className="convert-card-header">
              <h2>To</h2>
              <span>Destination timezone</span>
            </header>

            <CountrySelector
              selectedTimezone={targetTimezone}
              onTimezoneChange={setTargetTimezone}
              label="Target timezone"
              className="convert-selector"
            />

            <div className="convert-card-meta">
              {targetDisplay.gmtLabel && (
                <span className="convert-card-chip">{targetDisplay.gmtLabel}</span>
              )}
              {targetDisplay.subtitle && (
                <span className="convert-card-chip muted">{targetDisplay.subtitle}</span>
              )}
              <span className="convert-card-code">{targetDisplay.timezone}</span>
            </div>

            <div className="convert-preview">
              <p>
                Conversion results will be displayed using the {format === '12' ? '12-hour' : '24-hour'} format.
              </p>
            </div>
          </section>
        </div>

        <div className="convert-actions">
          <Button type="submit" size="large" className="convert-submit">
            Convert
          </Button>
        </div>
      </form>

      {errors.length > 0 && (
        <div className="convert-errors" role="alert">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {hasResult && (
        <section className="convert-results" ref={resultRef}>
          <div className="convert-results-grid">
            <article className="convert-result-card">
              <header>
                <h3>Original</h3>
                <span>{result.source.display.subtitle}</span>
              </header>
              <div className="convert-result-time">{sourceFormattedTime}</div>
              <div className="convert-result-date">{sourceFormattedDate}</div>
              <div className="convert-result-meta">
                <span>{result.source.offsetLabel}</span>
                <span>{result.source.display.timezone}</span>
              </div>
            </article>

            <article className="convert-result-card highlight">
              <header>
                <h3>Converted</h3>
                <span>{result.target.display.subtitle}</span>
              </header>
              <div className="convert-result-time">{targetFormattedTime}</div>
              <div className="convert-result-date">{targetFormattedDate}</div>
              <div className="convert-result-meta">
                <span>{result.target.offsetLabel}</span>
                <span>{result.target.display.timezone}</span>
              </div>
            </article>
          </div>

          <div className="convert-difference" aria-live="polite">
            <span className="difference-label">Time difference</span>
            <h3 className="difference-value">{difference.label}</h3>
            <p className="difference-description">{difference.description}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Convert;