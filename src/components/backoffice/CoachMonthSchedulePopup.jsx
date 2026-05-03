import { useMemo, useState } from 'react'
import { X, CalendarCheck, Clock } from '@phosphor-icons/react'
import { getWorkoutType } from '../../data/workoutTypes'
import { TODAY } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const DAY_HEAD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABEL = 'May 2026'   // Mock — derive from data when wired up.

// Coach monthly schedule popup. Renders a calendar grid for the current
// month with each day showing a small dot per scheduled class. Click a
// day to see the agenda for that day. Past classes render muted, today
// highlighted, future at full saturation.
export default function CoachMonthSchedulePopup({ coach, schedule, onClose }) {
  // Group schedule entries by date for fast cell lookup.
  const byDate = useMemo(() => {
    const m = {}
    schedule.forEach(c => { (m[c.date] = m[c.date] ?? []).push(c) })
    return m
  }, [schedule])

  const [selectedDate, setSelectedDate] = useState(() => {
    // Prefer today; fall back to first scheduled date.
    if (byDate[TODAY]) return TODAY
    return schedule[0]?.date ?? TODAY
  })

  // Build calendar cells for May 2026.
  const monthYear = 2026, monthIdx = 4
  const firstDow    = new Date(monthYear, monthIdx, 1).getDay()
  const daysInMonth = new Date(monthYear, monthIdx + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const totals = {
    total:    schedule.length,
    done:     schedule.filter(c => c.status === 'done').length,
    upcoming: schedule.filter(c => c.status === 'upcoming').length,
  }

  const dayClasses = (byDate[selectedDate] ?? [])
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 760,
        maxHeight: '92vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarCheck size={20} color={PRIMARY} weight="fill" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#333333' }}>{coach.name} · Monthly Schedule</h3>
              <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>
                {MONTH_LABEL} · {totals.done}/{totals.total} done · {totals.upcoming} upcoming
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 22 }}>
          {/* Calendar grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
              {DAY_HEAD.map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', padding: '4px 0' }}>{h}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {cells.map((d, i) => {
                if (d == null) return <div key={`pad-${i}`} />
                const dateISO = `2026-05-${String(d).padStart(2, '0')}`
                const items = byDate[dateISO] ?? []
                const isToday = dateISO === TODAY
                const isPast = dateISO < TODAY
                const isSelected = dateISO === selectedDate
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(dateISO)}
                    style={{
                      minHeight: 60, padding: '6px 6px 4px', borderRadius: 8,
                      border: `1.5px solid ${isSelected ? PRIMARY : isToday ? PRIMARY + '60' : '#e7e7e7'}`,
                      background: isSelected ? PRIMARY + '10' : '#fff',
                      cursor: items.length ? 'pointer' : 'default',
                      opacity: isPast && !isSelected ? 0.7 : 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                      fontFamily: FONT, textAlign: 'left',
                    }}
                  >
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: 18, height: 18, borderRadius: '50%',
                      background: isToday ? PRIMARY : 'transparent',
                      color:      isToday ? '#fff' : '#333333',
                      fontSize: 11, fontWeight: 700,
                      padding: '0 5px',
                    }}>{d}</div>

                    {items.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {items.slice(0, 3).map((c, j) => {
                          const wt = getWorkoutType(c.type)
                          return (
                            <span key={j} title={`${c.time} ${c.className}`} style={{
                              width: 14, height: 4, borderRadius: 2, background: wt.color,
                              opacity: c.status === 'done' ? 0.45 : 1,
                            }} />
                          )
                        })}
                        {items.length > 3 && (
                          <span style={{ fontSize: 9, color: '#8C8C8C', fontWeight: 700 }}>+{items.length - 3}</span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Day agenda */}
          <div>
            <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              {formatDay(selectedDate)}
            </div>
            {dayClasses.length === 0 ? (
              <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px', fontSize: 13, color: '#8C8C8C' }}>
                No classes scheduled.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dayClasses.map((c, i) => {
                  const wt = getWorkoutType(c.type)
                  const past = c.status === 'done'
                  return (
                    <div key={i} style={{
                      background: '#fff', border: `1px solid ${wt.border}`,
                      borderLeft: `4px solid ${wt.color}`, borderRadius: 10,
                      padding: '10px 12px', opacity: past ? 0.65 : 1,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Clock size={12} color="#8C8C8C" />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums' }}>{c.time}–{c.endTime}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: past ? '#8C8C8C' : wt.color }}>
                          {past ? 'Done' : 'Upcoming'}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#333333', marginBottom: 2 }}>{c.className}</div>
                      <div style={{ fontSize: 11, color: '#8C8C8C' }}>{c.room} · Zone {c.zone}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: '#8C8C8C' }}>
          <LegendDot color="#23B870" /> Today
          <LegendDot color={PRIMARY + '70'} /> Selected
          <LegendDot muted /> Past (faded)
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, muted }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 8, height: 8, borderRadius: 2, background: muted ? '#dcdcdc' : color, opacity: muted ? 0.45 : 1 }} />
    </span>
  )
}

function formatDay(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
