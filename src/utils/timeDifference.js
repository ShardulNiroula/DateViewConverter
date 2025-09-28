import moment from 'moment-timezone';

const pluralize = (value, unit) => {
  if (value === 1) {
    return `${value} ${unit}`;
  }
  return `${value} ${unit}s`;
};

export const formatDifferenceLabel = (totalMinutes = 0) => {
  const absolute = Math.abs(totalMinutes);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  const segments = [];

  if (hours > 0) {
    segments.push(pluralize(hours, 'hour'));
  }

  if (minutes > 0) {
    segments.push(pluralize(minutes, 'minute'));
  }

  if (segments.length === 0) {
    return '0 minutes';
  }

  if (segments.length === 1) {
    return segments[0];
  }

  return `${segments[0]} ${segments[1]}`;
};

export const buildTimeDifferenceSummary = ({
  totalMinutes = 0,
  fromLabel,
  toLabel
}) => {
  const label = formatDifferenceLabel(totalMinutes);

  if (totalMinutes === 0) {
    return {
      totalMinutes,
      label,
      direction: 'same',
      description: `${fromLabel} and ${toLabel} share the same current time.`
    };
  }

  const direction = totalMinutes > 0 ? 'ahead' : 'behind';
  const description = totalMinutes > 0
    ? `${fromLabel} is ${label} ahead of ${toLabel}.`
    : `${fromLabel} is ${label} behind ${toLabel}.`;

  return {
    totalMinutes,
    label,
    direction,
    description
  };
};

export const getOffsetDifference = (sourceMoment, targetMoment) => {
  if (!moment.isMoment(sourceMoment) || !moment.isMoment(targetMoment)) {
    return 0;
  }

  return sourceMoment.utcOffset() - targetMoment.utcOffset();
};
