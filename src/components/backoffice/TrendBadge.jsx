import { ArrowUp, ArrowDown } from '@phosphor-icons/react'

const FONT = "'Heebo', 'Open Sans', sans-serif"
const THRESHOLD = 5  // brief: show only when |delta| >= 5%

// Small trend badge — green up arrow for improvement, red down for decline.
// Returns null when the change is below the visibility threshold.
export default function TrendBadge({ delta, size = 'sm' }) {
  if (delta == null || Math.abs(delta) < THRESHOLD) return null
  const positive = delta > 0
  const color = positive ? '#23B870' : '#F5365C'
  const bg    = positive ? '#d1f5e4' : '#fee2e8'
  const Icon  = positive ? ArrowUp : ArrowDown
  const fontSize = size === 'lg' ? 12 : 11
  const padding  = size === 'lg' ? '3px 9px' : '2px 7px'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      background: bg, color, borderRadius: 999,
      padding, fontSize, fontWeight: 700, fontFamily: FONT,
      border: `1px solid ${color}33`,
    }}>
      <Icon size={size === 'lg' ? 11 : 9} weight="bold" />
      {Math.abs(delta)}%
    </span>
  )
}
