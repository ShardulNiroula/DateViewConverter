import React from 'react';
import './AnalogClock.css';

const AnalogClock = ({ time, size = 300 }) => {
  const seconds = time.seconds();
  const minutes = time.minutes();
  const hours = time.hours() % 12;

  // Calculate angles for clock hands
  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6 degrees per minute + smooth seconds
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30 degrees per hour + smooth minutes

  const clockSize = size;
  const center = clockSize / 2;
  const radius = center - 20;

  // Generate hour markers
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) - 90;
    const x1 = center + (radius - 20) * Math.cos(angle * Math.PI / 180);
    const y1 = center + (radius - 20) * Math.sin(angle * Math.PI / 180);
    const x2 = center + radius * Math.cos(angle * Math.PI / 180);
    const y2 = center + radius * Math.sin(angle * Math.PI / 180);

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--text-primary)"
        strokeWidth="3"
      />
    );
  });

  // Generate minute markers
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null; // Skip hour markers
    const angle = (i * 6) - 90;
    const x1 = center + (radius - 10) * Math.cos(angle * Math.PI / 180);
    const y1 = center + (radius - 10) * Math.sin(angle * Math.PI / 180);
    const x2 = center + radius * Math.cos(angle * Math.PI / 180);
    const y2 = center + radius * Math.sin(angle * Math.PI / 180);

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--text-secondary)"
        strokeWidth="1"
      />
    );
  });

  return (
    <div className="analog-clock-container">
      <svg
        width={clockSize}
        height={clockSize}
        viewBox={`0 0 ${clockSize} ${clockSize}`}
        className="analog-clock"
      >
        {/* Clock face */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="var(--bg-secondary)"
          stroke="var(--border-color)"
          strokeWidth="2"
        />

        {/* Hour markers */}
        {hourMarkers}

        {/* Minute markers */}
        {minuteMarkers}

        {/* Hour numbers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) - 90;
          const x = center + (radius - 35) * Math.cos(angle * Math.PI / 180);
          const y = center + (radius - 35) * Math.sin(angle * Math.PI / 180) + 5;

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-primary)"
              fontSize="16"
              fontWeight="bold"
            >
              {i === 0 ? 12 : i}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.5) * Math.cos(hourAngle * Math.PI / 180)}
          y2={center + (radius * 0.5) * Math.sin(hourAngle * Math.PI / 180)}
          stroke="var(--text-primary)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.7) * Math.cos(minuteAngle * Math.PI / 180)}
          y2={center + (radius * 0.7) * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.8) * Math.cos(secondAngle * Math.PI / 180)}
          y2={center + (radius * 0.8) * Math.sin(secondAngle * Math.PI / 180)}
          stroke="var(--danger-color)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r="6"
          fill="var(--text-primary)"
        />
      </svg>
    </div>
  );
};

export default AnalogClock;