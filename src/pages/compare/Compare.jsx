import React from 'react';
import './Compare.css';
import FormatSwitcher from '../../components/common/FormatSwitcher';
import { Button } from '../../components/ui';
import CountrySelector from '../clock/components/CountrySelector';
import DigitalClock from '../clock/components/DigitalClock';
import useTimeComparison from '../../hooks/useTimeComparison';

const Compare = () => {
  const {
    timezoneA,
    timezoneB,
    timeA,
    timeB,
    format,
    displayA,
    displayB,
    difference,
    offsetLabelA,
    offsetLabelB,
    setTimezoneA,
    setTimezoneB,
    swapTimezones,
    handleFormatChange
  } = useTimeComparison();

  return (
    <div className="compare-page">
      <header className="compare-header">
        <div className="compare-headline">
          <h1 className="compare-title">Compare Time Zones Instantly</h1>
          <p className="compare-subtitle">
            Select two locations to see their current times side by side and understand the exact difference.
          </p>
        </div>
        <div className="compare-actions">
          <FormatSwitcher format={format} onFormatChange={handleFormatChange} />
          <Button
            variant="secondary"
            size="medium"
            className="compare-swap"
            onClick={swapTimezones}
            aria-label="Swap selected timezones"
          >
            Swap timezones
          </Button>
        </div>
      </header>

      <section className="compare-grid" aria-label="Time zone comparison">
        <article className="compare-card" aria-labelledby="compare-card-a">
          <div className="compare-selector">
            <CountrySelector
              selectedTimezone={timezoneA}
              onTimezoneChange={setTimezoneA}
              label="Primary timezone"
            />
          </div>
          <div className="compare-card-body">
            <header className="compare-card-header" id="compare-card-a">
              <div>
                <h2>{displayA.title}</h2>
                {displayA.subtitle && <span className="compare-card-subtitle">{displayA.subtitle}</span>}
              </div>
              <span className="compare-card-offset">{offsetLabelA}</span>
            </header>
            <DigitalClock
              time={timeA}
              format={format}
              showDate
              showSeconds
              hideFormat
            />
            <footer className="compare-card-footer">
              <span className="compare-card-code">{displayA.code}</span>
              {displayA.description && (
                <p className="compare-card-description">{displayA.description}</p>
              )}
            </footer>
          </div>
        </article>

        <article className="compare-card" aria-labelledby="compare-card-b">
          <div className="compare-selector">
            <CountrySelector
              selectedTimezone={timezoneB}
              onTimezoneChange={setTimezoneB}
              label="Secondary timezone"
            />
          </div>
          <div className="compare-card-body">
            <header className="compare-card-header" id="compare-card-b">
              <div>
                <h2>{displayB.title}</h2>
                {displayB.subtitle && <span className="compare-card-subtitle">{displayB.subtitle}</span>}
              </div>
              <span className="compare-card-offset">{offsetLabelB}</span>
            </header>
            <DigitalClock
              time={timeB}
              format={format}
              showDate
              showSeconds
              hideFormat
            />
            <footer className="compare-card-footer">
              <span className="compare-card-code">{displayB.code}</span>
              {displayB.description && (
                <p className="compare-card-description">{displayB.description}</p>
              )}
            </footer>
          </div>
        </article>
      </section>

      <section className="compare-difference" aria-live="polite">
        <span className="difference-label">Time difference</span>
        <h3 className="difference-value">{difference.label}</h3>
        <p className="difference-description">{difference.description}</p>
      </section>
    </div>
  );
};

export default Compare;