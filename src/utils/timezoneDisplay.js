export const formatOffsetLabel = (offsetMinutes = 0) => {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (absoluteMinutes % 60).toString().padStart(2, '0');

  return `UTC${sign}${hours}:${minutes}`;
};

export const buildTimezoneDisplay = (timezone, details) => {
  const parts = timezone.split('/');
  const region = parts[0]?.replace(/_/g, ' ') || '';
  const city = parts.slice(1).join(' / ').replace(/_/g, ' ');

  return {
    title: details?.city || city || timezone,
    subtitle: details?.country || region || '',
    region,
    city,
    timezone,
    code: details?.value || timezone,
    description: details?.description || '',
    gmtLabel: details?.gmtLabel || null
  };
};
