import { useState } from 'react'
import { Plus, FunnelSimple } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import { weeklySchedule } from '../../data/backoffice'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = Array.from({ length: 15 }, (_, i) => i + 6) // 6am - 8pm
const ROOMS = ['All Rooms', 'Main Floor', 'Studio B']
const COACHES = ['All Coaches', 'Maya', 'Dan', 'Noa', 'Tom', 'Liora']

function timeToRow(time) {
  const [h, m] = time.split(':').map(Number)
  return (h - 6) * 2 + (m >= 30 ? 1 : 0) + 2 // +2 for header row offset
}

function durationToSpan(startTime, endTime) {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  const mins = (eh * 60 + em) - (sh * 60 + sm)
  return Math.max(1, Math.round(mins / 30))
}

export default function BOSchedule() {
  const [activeRoom, setActiveRoom] = useState('All Rooms')
  const [activeCoach, setActiveCoach] = useState('All Coaches')

  const filteredSchedule = weeklySchedule.filter(cls => {
    const roomMatch = activeRoom === 'All Rooms' || cls.room === activeRoom
    const coachMatch = activeCoach === 'All Coaches' || cls.coach.startsWith(activeCoach)
    return roomMatch && coachMatch
  })

  return (
    <BOPageLayout title="Schedule" fullWidth>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-xl text-[#334367]">Weekly Schedule</h2>
          <p className="text-sm text-gray-500">April 13 – 18, 2026</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-[#334367] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            <FunnelSimple size={14} weight="bold" />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-[#43a77c] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[#3a9670] transition-colors">
            <Plus size={16} weight="bold" />
            New Class
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ROOMS.map(f => (
          <button
            key={f}
            onClick={() => setActiveRoom(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeRoom === f ? 'bg-[#334367] text-white' : 'bg-white text-[#334367] border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="mx-2 border-l border-gray-300" />
        {COACHES.map(f => (
          <button
            key={f}
            onClick={() => setActiveCoach(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCoach === f ? 'bg-[#334367] text-white' : 'bg-white text-[#334367] border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="overflow-hidden" style={{ borderRadius: '36px 18px 36px 36px', background: '#fff' }}>
        <div
          className="grid relative"
          style={{
            gridTemplateColumns: '64px repeat(6, 1fr)',
            gridTemplateRows: `40px repeat(${HOURS.length * 2}, 28px)`,
          }}
        >
          {/* Header row */}
          <div className="bg-gray-50 border-b border-r border-gray-200" />
          {DAY_LABELS.map(day => (
            <div key={day} className="bg-gray-50 border-b border-r border-gray-200 flex items-center justify-center font-semibold text-sm text-[#334367]">
              {day}
            </div>
          ))}

          {/* Time labels + grid lines */}
          {HOURS.map(hour => (
            <div key={hour} className="border-r border-gray-100 flex items-start justify-end pr-2 pt-0.5 text-[11px] text-gray-400 font-medium" style={{ gridRow: `${(hour - 6) * 2 + 2} / span 2` }}>
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}

          {/* Grid background lines */}
          {HOURS.map(hour => (
            DAY_LABELS.map((_, di) => (
              <div
                key={`grid-${hour}-${di}`}
                className="border-b border-r border-gray-100"
                style={{
                  gridColumn: di + 2,
                  gridRow: `${(hour - 6) * 2 + 2} / span 2`,
                }}
              />
            ))
          ))}

          {/* Class blocks */}
          {filteredSchedule.map((cls, idx) => {
            const row = timeToRow(cls.time)
            const span = durationToSpan(cls.time, cls.endTime)
            return (
              <div
                key={idx}
                className={`mx-1 px-2 py-1 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
                  cls.conflict ? 'ring-2 ring-red-400 ring-dashed' : ''
                }`}
                style={{
                  gridColumn: cls.day + 2,
                  gridRow: `${row} / span ${span}`,
                  background: `linear-gradient(205deg, ${cls.color}30 0%, ${cls.color}10 100%), #fff`,
                  borderBottom: `3px solid ${cls.color}`,
                  borderRadius: '36px 18px 36px 36px',
                }}
              >
                <p className="text-[11px] font-semibold truncate" style={{ color: cls.color }}>{cls.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{cls.coach}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border-2 border-dashed border-red-400" />
          Schedule conflict
        </div>
      </div>
    </BOPageLayout>
  )
}
