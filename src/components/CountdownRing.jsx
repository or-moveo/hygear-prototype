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
  const ringColor = danger && value <= 5 ? '#dc2626' : color

  const displayValue = formatValue
    ? formatValue(value)
    : `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={trackColor} strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={ringColor} strokeWidth={stroke}
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
