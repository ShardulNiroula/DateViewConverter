export const createClockSearchParams = ({
  timezone,
  format,
  clockType,
  showDate,
  showSeconds
} = {}) => {
  const params = new URLSearchParams();

  if (timezone) {
    params.set('tz', timezone);
  }

  if (format) {
    params.set('format', format);
  }

  if (clockType === 'analog') {
    params.set('type', 'analog');
  }

  if (showDate === false) {
    params.set('date', 'false');
  }

  if (showSeconds === false) {
    params.set('seconds', 'false');
  }

  return params;
};

export const toClockSearchString = (params) => {
  const search = params.toString();
  return search ? `?${search}` : '';
};
