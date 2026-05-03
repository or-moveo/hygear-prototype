import { useState } from 'react'
import { X, Clock, CalendarBlank } from '@phosphor-icons/react'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const DAY_KEYS  = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DAY_FULL  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Per-day availability popup. The user can switch between days using the
// day pills at the top; the body shows the list of available time ranges
// for the selected day, or an empty-state if the coach is off that day.
export default function CoachAvailabilityPopup({ coach, onClose }) {
  // Default to the first day with shifts so the popup never opens empty.
  const firstActive = DAY_KEYS.find(d => coach.availability[d]?.length > 0) ?? 'sun'
  const [day, setDay] = useState(firstActive)

  const slots = coach.availability[day] ?? []

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 480,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarBlank size={20} color={PRIMARY} weight="fill" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#333333' }}>{coach.name} · Availability</h3>
              <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>Pick a day to see this coach's free hours.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {/* Day switcher */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {DAY_KEYS.map((d, i) => {
              const isActive = d === day
              const hasShifts = (coach.availability[d]?.length ?? 0) > 0
              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  title={hasShifts ? `${DAY_FULL[i]} — available` : `${DAY_FULL[i]} — off`}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 8,
                    border: `1px solid ${isActive ? PRIMARY : '#dcdcdc'}`,
                    background: isActive ? PRIMARY : (hasShifts ? PRIMARY + '12' : '#FAFBFD'),
                    color: isActive ? '#fff' : (hasShifts ? PRIMARY : '#8C8C8C'),
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
                    position: 'relative',
                  }}
                >
                  {DAY_SHORT[i]}
                  {!isActive && hasShifts && (
                    <span style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: PRIMARY }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Slots list */}
          <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {DAY_FULL[DAY_KEYS.indexOf(day)]} · {slots.length} {slots.length === 1 ? 'window' : 'windows'}
          </div>

          {slots.length === 0 ? (
            <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '20px 18px', textAlign: 'center', color: '#8C8C8C', fontSize: 13 }}>
              Not available on {DAY_FULL[DAY_KEYS.indexOf(day)]}.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {slots.map((slot, i) => {
                const [from, to] = slot.split('-')
                const minutes = rangeMinutes(from, to)
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10,
                    padding: '12px 14px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Clock size={16} color={PRIMARY} weight="fill" />
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums' }}>
                        {from} – {to}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: '#8C8C8C', fontWeight: 600 }}>
                      {Math.round(minutes / 60 * 10) / 10}h
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', fontSize: 11, color: '#8C8C8C' }}>
          Timezone: {coach.timezone}
        </div>
      </div>
    </div>
  )
}

// Total minutes between two HH:MM strings.
function rangeMinutes(from, to) {
  const [fh, fm] = from.split(':').map(Number)
  const [th, tm] = to.split(':').map(Number)
  return (th * 60 + tm) - (fh * 60 + fm)
}
