import { useMemo } from 'react'

export default function CountdownRing({
  size = 280,
  value = 0,
  max = 60,
  label = '',
  color = '#43a77c',
  textColor = 'black',
  trackColor = '#e5e7eb',
  danger = false,
  formatValue,
}) {
  const stroke = size * 0.06
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = max > 0 ? Math.min(value / max, 1) : 0
  const offset = circumference * (1 - progress)

  // Determine gradient colors based on remaining seconds
  const gradientId = useMemo(() => `ring-grad-${Math.random().toString(36).slice(2)}`, [])

  const useGradient = value <= 5
  let gradStart = color
  let gradEnd = color

  if (value <= 2) {
    // Last 2 seconds: full red
    gradStart = '#ef4444'
    gradEnd = '#dc2626'
  } else if (value <= 5) {
    // 3–5 seconds: green → orange → red gradient
    gradStart = '#43a77c'
    gradEnd = value <= 3 ? '#ef4444' : '#f97316'
  }

  const flatColor = !useGradient ? color : null

  const displayValue = formatValue
    ? formatValue(value)
    : `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={trackColor} strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={flatColor || `url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <p className="font-poppins font-semibold leading-none" style={{ fontSize: size * 0.2, color: textColor }}>
          {displayValue}
        </p>
        {label && (
          <p className="font-poppins font-normal text-center" style={{ fontSize: size * 0.064, color: textColor }}>
            {label}
          </p>
        )}
      </div>
    </div>
  )
}
