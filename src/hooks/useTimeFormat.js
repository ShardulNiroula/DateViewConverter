import { useState, useCallback, useEffect } from 'react';

const useTimeFormat = (initialFormat = '12') => {
  const [format, setFormat] = useState(() => {
    const saved = localStorage.getItem('timeFormat');
    return saved || initialFormat;
  });

  useEffect(() => {
    localStorage.setItem('timeFormat', format);
  }, [format]);

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