import { Plus, FunnelSimple } from '@phosphor-icons/react'
import StudioHeader from '../../components/StudioHeader'
import { weeklySchedule } from '../../data/backoffice'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = Array.from({ length: 15 }, (_, i) => i + 6) // 6am - 8pm

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
  return (
    <div className="min-h-screen bg-[#f2f2f5] font-poppins">
      <StudioHeader name="Schedule" variant="fluid" />

      <div className="px-6 py-6">
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
        <div className="flex gap-2 mb-4">
          {['All Rooms', 'Main Floor', 'Studio B'].map((f, i) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0 ? 'bg-[#334367] text-white' : 'bg-white text-[#334367] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="mx-2 border-l border-gray-300" />
          {['All Coaches', 'Maya', 'Dan', 'Noa', 'Tom', 'Liora'].map((f, i) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0 ? 'bg-[#334367] text-white' : 'bg-white text-[#334367] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="overflow-hidden" style={{ borderRadius: 24, background: '#fff' }}>
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
            {weeklySchedule.map((cls, idx) => {
              const row = timeToRow(cls.time)
              const span = durationToSpan(cls.time, cls.endTime)
              return (
                <div
                  key={idx}
                  className={`mx-1 rounded-lg px-2 py-1 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
                    cls.conflict ? 'ring-2 ring-red-400 ring-dashed' : ''
                  }`}
                  style={{
                    gridColumn: cls.day + 2,
                    gridRow: `${row} / span ${span}`,
                    background: `linear-gradient(205deg, ${cls.color}30 0%, ${cls.color}10 100%), #fff`,
                    borderBottom: `3px solid ${cls.color}`,
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
      </div>
    </div>
  )
}
