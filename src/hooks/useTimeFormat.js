import { useState, useCallback } from 'react';

const useTimeFormat = (initialFormat = '24') => {
  const [format, setFormat] = useState(initialFormat);

  const toggleFormat = useCallback(() => {
    setFormat(prev => prev === '12' ? '24' : '12');
  }, []);

  const formatTime = useCallback((date) => {
    if (format === '12') {
      return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });
    } else {
      return date.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  }, [format]);

  const formatTimeShort = useCallback((date) => {
    if (format === '12') {
      return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }, [format]);

  return {
    format,
    setFormat,
    toggleFormat,
    formatTime,
    formatTimeShort,
    is12Hour: format === '12',
    is24Hour: format === '24'
  };
};

export default useTimeFormat;