import { useState } from 'react'
import { Plus, FunnelSimple } from '@phosphor-icons/react'
import { weeklySchedule } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = Array.from({ length: 15 }, (_, i) => i + 6)
const ROOMS = ['All Rooms', 'Main Floor', 'Studio B']
const COACHES = ['All Coaches', 'Maya', 'Dan', 'Noa', 'Tom', 'Liora']

function timeToRow(time) {
  const [h, m] = time.split(':').map(Number)
  return (h - 6) * 2 + (m >= 30 ? 1 : 0) + 2
}
function durationToSpan(startTime, endTime) {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  return Math.max(1, Math.round(((eh * 60 + em) - (sh * 60 + sm)) / 30))
}

export default function HygearSchedule() {
  const [activeRoom, setActiveRoom] = useState('All Rooms')
  const [activeCoach, setActiveCoach] = useState('All Coaches')

  const filtered = weeklySchedule.filter(cls => {
    const roomOk = activeRoom === 'All Rooms' || cls.room === activeRoom
    const coachOk = activeCoach === 'All Coaches' || cls.coach.startsWith(activeCoach)
    return roomOk && coachOk
  })

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FunnelSimple size={16} color="#8C8C8C" />
          <span style={{ fontSize: 13, color: '#8C8C8C' }}>Filter:</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {ROOMS.map(r => (
              <button key={r} onClick={() => setActiveRoom(r)} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid', borderColor: activeRoom === r ? PRIMARY : '#dcdcdc', background: activeRoom === r ? PRIMARY : '#fff', color: activeRoom === r ? '#fff' : '#333333', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
                {r}
              </button>
            ))}
          </div>
          <div style={{ width: 1, height: 18, background: '#dcdcdc', margin: '0 4px' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {COACHES.map(c => (
              <button key={c} onClick={() => setActiveCoach(c)} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid', borderColor: activeCoach === c ? PRIMARY : '#dcdcdc', background: activeCoach === c ? PRIMARY : '#fff', color: activeCoach === c ? '#fff' : '#333333', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <Plus size={16} weight="bold" /> Add Class
        </button>
      </div>

      {/* Grid */}
      <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '56px repeat(6, 1fr)',
          gridTemplateRows: `40px repeat(30, 28px)`,
          minHeight: 400,
        }}>
          {/* Header row */}
          <div style={{ gridColumn: 1, gridRow: 1, borderBottom: '1px solid #dcdcdc', borderRight: '1px solid #dcdcdc' }} />
          {DAY_LABELS.map((day, di) => (
            <div key={day} style={{ gridColumn: di + 2, gridRow: 1, borderBottom: `2px solid ${PRIMARY}`, borderRight: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#333333', background: '#FAFBFD' }}>
              {day}
            </div>
          ))}

          {/* Hour labels */}
          {HOURS.map((hour, hi) => (
            <div key={hour} style={{ gridColumn: 1, gridRow: hi * 2 + 2, gridRowEnd: hi * 2 + 4, borderRight: '1px solid #dcdcdc', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4, fontSize: 10, color: '#8C8C8C', fontWeight: 500 }}>
              {hour}:00
            </div>
          ))}

          {/* Grid lines */}
          {HOURS.map((hour, hi) =>
            DAY_LABELS.map((_, di) => (
              <div key={`${hour}-${di}`} style={{ gridColumn: di + 2, gridRow: hi * 2 + 2, gridRowEnd: hi * 2 + 4, borderTop: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }} />
            ))
          )}

          {/* Classes */}
          {filtered.map(cls => (
            <div
              key={cls.id}
              style={{
                gridColumn: cls.day + 2,
                gridRow: timeToRow(cls.time),
                gridRowEnd: timeToRow(cls.time) + durationToSpan(cls.time, cls.endTime),
                margin: '2px 3px',
                background: cls.color + '18',
                borderLeft: `3px solid ${cls.color}`,
                borderRadius: 6,
                padding: '4px 6px',
                overflow: 'hidden',
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: cls.color, fontFamily: FONT }}>{cls.time}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#333333', fontFamily: FONT, lineHeight: 1.2 }}>{cls.name}</div>
              <div style={{ fontSize: 10, color: '#8C8C8C', fontFamily: FONT }}>{cls.coach.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
