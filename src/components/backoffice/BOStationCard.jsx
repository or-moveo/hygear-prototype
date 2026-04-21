import { Heart, Barbell, ArrowsCounterClockwise } from '@phosphor-icons/react'
import CountdownRing from '../CountdownRing'
import { ZONES } from '../../data/zones'

function getZone(bpm) {
  if (bpm >= 165) return ZONES[4] // PEAK
  if (bpm >= 150) return ZONES[3] // PRIME
  if (bpm >= 135) return ZONES[2] // BUILD
  if (bpm >= 120) return ZONES[1] // FLOW
  return ZONES[0] // BASE
}

const STATUS_STYLES = {
  active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
  resting: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resting' },
  transitioning: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Transitioning' },
}

export default function BOStationCard({ station }) {
  const zone = getZone(station.bpm)
  const statusStyle = STATUS_STYLES[station.status] || STATUS_STYLES.active

  return (
    <div
      className="flex flex-col gap-3"
      style={{
        background: `linear-gradient(205deg, ${zone.color}4D 0%, ${zone.color}0D 100%), #fff`,
        borderBottom: `6px solid ${zone.color}`,
        borderRadius: '36px 18px 36px 36px',
        padding: 20,
      }}
    >
      {/* Top: name + status */}
      <div className="flex items-center justify-between">
        <p className="font-poppins font-semibold text-[#334367] text-sm truncate">{station.name}</p>
        <span className={`${statusStyle.bg} ${statusStyle.text} text-[11px] font-poppins font-semibold px-2 py-0.5 rounded-full`}>
          {statusStyle.label}
        </span>
      </div>

      {/* Middle: exercise + ring */}
      <div className="flex items-center justify-between">
        <p className="font-poppins text-sm text-gray-500">{station.exercise}</p>
        <CountdownRing
          size={56}
          value={station.completionPct}
          max={100}
          formatValue={(v) => `${Math.round(v)}%`}
          color="#43a77c"
          trackColor="#e5e7eb"
          textColor="#334367"
        />
      </div>

      {/* Bottom: stat pills */}
      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full"
          style={{ backgroundColor: zone.bg, color: zone.text }}
        >
          <Heart size={14} weight="fill" />
          <span className="font-poppins font-bold text-xs">{station.bpm}</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full bg-gray-100 text-gray-700">
          <ArrowsCounterClockwise size={14} weight="bold" />
          <span className="font-poppins font-bold text-xs">{station.reps}</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full bg-gray-100 text-gray-700">
          <Barbell size={14} weight="bold" />
          <span className="font-poppins font-bold text-xs">{station.kg}kg</span>
        </div>
      </div>
    </div>
  )
}
