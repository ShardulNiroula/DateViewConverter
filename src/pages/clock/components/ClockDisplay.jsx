import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DigitalClock from './DigitalClock';
import AnalogClock from './AnalogClock';
import ClockTypeSwitcher from './ClockTypeSwitcher';
import CountrySelector from './CountrySelector';
import FormatSwitcher from '../../../components/common/FormatSwitcher';
import './ClockDisplay.css';
import { createClockSearchParams, toClockSearchString } from '../../../utils/clockParams';
import { ExpandIcon } from '../../../components/ui/Icons';

const ClockDisplay = ({
  time,
  clockType,
  format,
  timezone,
  timezoneTitle,
  offsetLabel,
  timezoneDetails,
  onClockTypeChange,
  onTimezoneChange,
  onFormatChange,
  showDate = true,
  showSeconds = true,
  enableFullscreen = false
}) => {
  const navigate = useNavigate();
  const displayRegion = useMemo(() => {
    if (timezoneDetails?.region) {
      return timezoneDetails.region;
    }
    const parts = timezone?.split('/') ?? [];
    return parts[0]?.replace(/_/g, ' ') || 'Global';
  }, [timezone, timezoneDetails]);

  const displayTitle = timezoneDetails?.city || timezoneTitle;
  const displayCountry = timezoneDetails?.country || displayRegion;
  const displayOffset = timezoneDetails?.gmtLabel || offsetLabel;
  const displayCode = timezoneDetails?.value || timezone;
  const displayDescription = timezoneDetails?.description;

  const headlineSubtextItems = useMemo(() => {
    const items = [
      { key: 'country', value: displayCountry, className: '' },
      { key: 'offset', value: displayOffset, className: '' },
      { key: 'code', value: displayCode, className: 'headline-subtext-code' }
    ];

    return items.filter((item) => Boolean(item.value));
  }, [displayCountry, displayOffset, displayCode]);

  const timezoneAbbr = time.format('z');
  const timezoneDisplay = timezone?.replace(/_/g, ' ') ?? 'UTC';

  const infoCards = [
    {
      label: 'Zone abbr',
      value: timezoneAbbr
    }
  ];

  const handleExpandClick = () => {
    if (!enableFullscreen) {
      return;
    }

    const params = createClockSearchParams({
      timezone,
      format,
      clockType,
      showDate,
      showSeconds
    });
    const search = toClockSearchString(params);
    navigate({ pathname: '/clock/fullscreen', search: search || undefined }, {
      state: {
        timezone,
        format,
        clockType,
        showDate,
        showSeconds
      }
    });
  };

  const canChangeTimezone = typeof onTimezoneChange === 'function';

  return (
    <div className="clock-display" aria-live="polite">
      {onClockTypeChange && (
        <div className="clock-inner-switcher">
          <ClockTypeSwitcher
            clockType={clockType}
            onClockTypeChange={onClockTypeChange}
          />
        </div>
      )}

      <header className="clock-headline">
        <div className="headline-text">
          <span className="status-chip">Live now</span>
          {canChangeTimezone ? (
            <div className="headline-selector">
              <CountrySelector
                className="headline-selector-input"
                selectedTimezone={timezone}
                onTimezoneChange={onTimezoneChange}
                hideLabel
              />
            </div>
          ) : (
            <h2 className="headline-title">{displayTitle}</h2>
          )}
          {headlineSubtextItems.length > 0 && (
            <div className="headline-subtext">
              {headlineSubtextItems.map((item, index) => (
                <React.Fragment key={item.key}>
                  {index > 0 && (
                    <span className="headline-subtext-divider" aria-hidden="true">
                      •
                    </span>
                  )}
                  <span
                    className={`headline-subtext-item${item.className ? ` ${item.className}` : ''}`}
                  >
                    {item.value}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          {displayDescription && (
            <p className="headline-description">{displayDescription}</p>
          )}
        </div>
        {displayRegion && (
          <div className="headline-meta">
            <span className="meta-chip">{displayRegion}</span>
            {onFormatChange && clockType === 'digital' && (
              <FormatSwitcher
                format={format}
                onFormatChange={onFormatChange}
              />
            )}
          </div>
        )}
      </header>

      <div className={`clock-visual clock-visual-${clockType}`}>
        {enableFullscreen && (
          <button
            type="button"
            className="clock-visual-expand"
            onClick={handleExpandClick}
          >
            <span className="sr-only">Open fullscreen clock view</span>
            <ExpandIcon className="expand-icon-svg" />
          </button>
        )}
        {clockType === 'digital' && (
          <div className="clock-visual-format">
            <span className="format-indicator">
              {format === '12' ? '12H' : '24H'}
            </span>
          </div>
        )}
        <div className="clock-visual-surface">
          {clockType === 'digital' ? (
            <DigitalClock
              time={time}
              format={format}
              showDate={showDate}
              showSeconds={showSeconds}
              hideFormat={true}
            />
          ) : (
            <AnalogClock time={time} size={360} />
          )}
        </div>
        <div className="clock-visual-footer">
          <span className="visual-footer-label">Timezone ID</span>
          <span className="visual-footer-value">{timezoneDisplay}</span>
        </div>
      </div>

      <div className="clock-info-grid">
        {infoCards.map(({ label, value }) => (
          <div className="clock-info-card" key={label}>
            <span className="info-label">{label}</span>
            <span className="info-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClockDisplay;