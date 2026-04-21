import { UserPlus, Star, CalendarBlank, Globe } from '@phosphor-icons/react'
import { coaches } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const AVATAR_COLORS = [PRIMARY, '#5389f3', '#43a77c', '#8b5cf6', '#e07b4c']
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function HygearCoaches() {
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Team ({coaches.length})</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <UserPlus size={16} weight="bold" /> Invite Coach
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {coaches.map((coach, idx) => {
          const color = AVATAR_COLORS[idx % AVATAR_COLORS.length]
          const activeDays = DAY_KEYS.filter(d => coach.availability[d]?.length > 0)
          return (
            <div key={coach.id} style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '20px', borderTop: `3px solid ${color}` }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0, fontFamily: FONT }}>
                  {coach.initials}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{coach.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Star size={12} weight="fill" color="#f59e0b" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', fontFamily: FONT }}>{coach.rating}</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {coach.specialties.map(s => (
                  <span key={s} style={{ background: color + '18', color, border: `1px solid ${color}40`, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600, fontFamily: FONT }}>{s}</span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{coach.classesThisWeek}</div>
                  <div style={{ fontSize: 11, color: '#8C8C8C', fontFamily: FONT }}>Classes / week</div>
                </div>
                <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{coach.avgAttendance}%</div>
                  <div style={{ fontSize: 11, color: '#8C8C8C', fontFamily: FONT }}>Avg attendance</div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONT }}>
                  <CalendarBlank size={12} /> Availability
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {DAY_KEYS.map((d, i) => {
                    const hasShifts = coach.availability[d]?.length > 0
                    return (
                      <div key={d} style={{ width: 28, height: 28, borderRadius: 6, background: hasShifts ? color + '20' : '#FAFBFD', border: `1px solid ${hasShifts ? color : '#dcdcdc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: hasShifts ? 700 : 400, color: hasShifts ? color : '#8C8C8C', fontFamily: FONT }}>
                        {DAY_LABELS[i]}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Timezone */}
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#8C8C8C' }}>
                <Globe size={12} />{coach.timezone}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
