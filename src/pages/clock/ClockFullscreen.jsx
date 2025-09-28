import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useClock from '../../hooks/useClock';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import { createClockSearchParams, toClockSearchString } from '../../utils/clockParams';
import './ClockFullscreen.css';

const ClockFullscreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const routeState = location.state ?? {};

  const timezoneParam = params.get('tz') || routeState.timezone || 'UTC';
  const formatParam = params.get('format') || routeState.format || '24';
  const typeParam = params.get('type') || routeState.clockType || 'digital';
  const showDateParam = params.get('date');
  const showSecondsParam = params.get('seconds');

  const timezone = timezoneParam;
  const format = formatParam === '12' ? '12' : '24';
  const clockType = typeParam === 'analog' ? 'analog' : 'digital';
  const showDate = showDateParam === 'false' ? false : routeState.showDate === false ? false : true;
  const showSeconds = showSecondsParam === 'false' ? false : routeState.showSeconds === false ? false : true;

  const { time } = useClock(0, timezone);

  const handleExit = () => {
    const params = createClockSearchParams({
      timezone,
      format,
      showDate,
      showSeconds
    });
    const nextSearch = toClockSearchString(params);
    navigate(
      {
        pathname: '/clock',
        search: nextSearch || undefined
      },
      {
        state: { clockType }
      }
    );
  };

  const analogSize = typeof window !== 'undefined'
    ? Math.min(window.innerWidth, window.innerHeight) * 0.7
    : 480;

  return (
    <div className="clock-fullscreen" data-visual={clockType}>
      <button
        type="button"
        className="clock-fullscreen-back"
        onClick={handleExit}
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </button>

      <div className="clock-fullscreen-stage">
        {clockType === 'digital' ? (
          <DigitalClock
            time={time}
            format={format}
            showDate={showDate}
            showSeconds={showSeconds}
            hideLive={true}
            hideFormat={true}
          />
        ) : (
          <AnalogClock time={time} size={analogSize} />
        )}
      </div>
    </div>
  );
};

export default ClockFullscreen;
