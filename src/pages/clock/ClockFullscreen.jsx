import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';
import useClock from '../../hooks/useClock';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import { createClockSearchParams, toClockSearchString } from '../../utils/clockParams';
import './ClockFullscreen.css';

const ClockFullscreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const hideTimeoutRef = useRef(null);

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

  const resetHideTimer = () => {
    setIsButtonVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsButtonVisible(false);
    }, 5000);
  };

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

  useEffect(() => {
    resetHideTimer();

    const handleActivity = () => {
      resetHideTimer();
    };

    // Handle hardware back button for fullscreen - use the same logic as UI back button
    const handleBackButton = (event) => {
      // Prevent default behavior and stop propagation
      if (event) {
        event.preventDefault?.();
      }
      handleExit();
      return false; // Return false to prevent other handlers from executing
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('touchstart', handleActivity);

    // Add Capacitor back button listener with priority
    const backButtonListener = App.addListener('backButton', handleBackButton);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('touchstart', handleActivity);
      
      // Remove back button listener
      backButtonListener.then(handle => handle.remove()).catch(() => {});
    };
  }, []);

  const analogSize = typeof window !== 'undefined'
    ? Math.min(window.innerWidth, window.innerHeight) * 0.7
    : 480;

  return (
    <div className="clock-fullscreen" data-visual={clockType}>
      <button
        type="button"
        className={`clock-fullscreen-back ${!isButtonVisible ? 'is-hidden' : ''}`}
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
