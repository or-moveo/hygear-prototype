import { useState } from 'react'
import { UserPlus, Star, CalendarBlank, Globe, CalendarCheck, CaretRight } from '@phosphor-icons/react'
import { coaches, getCoachMonthSchedule, getCoachMonthlyStats } from '../../data/backoffice'
import { WORKOUT_TYPES } from '../../data/workoutTypes'
import AddCoachModal from '../../components/backoffice/AddCoachModal'
import CoachAvailabilityPopup from '../../components/backoffice/CoachAvailabilityPopup'
import CoachMonthSchedulePopup from '../../components/backoffice/CoachMonthSchedulePopup'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const AVATAR_COLORS = [PRIMARY, '#5389f3', '#43a77c', '#8b5cf6', '#e07b4c']
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Returns the colour for a Build/Shield/Burn tag, or the avatar accent for
// any legacy free-text specialty (e.g. "HIIT").
function tagColors(spec, fallback) {
  const wt = WORKOUT_TYPES.find(w => w.short === spec || w.id === spec.toLowerCase())
  if (wt) return { color: wt.color, bg: wt.bg, border: wt.border, label: wt.label }
  return { color: fallback, bg: fallback + '18', border: fallback + '40', label: spec }
}

export default function HygearCoaches() {
  const [modalOpen, setModalOpen] = useState(false)
  // One coach can be open in the availability popup or the schedule popup
  // at a time — never both.
  const [availabilityCoach, setAvailabilityCoach] = useState(null)
  const [scheduleCoach, setScheduleCoach] = useState(null)

  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Team ({coaches.length})</h2>
        <button onClick={() => setModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <UserPlus size={16} weight="bold" /> Add Coach
        </button>
      </div>

      <AddCoachModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(payload) => {
          // TODO(backend): POST new coach to /coaches.
          console.log('Coach created:', payload)
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {coaches.map((coach, idx) => {
          const color = AVATAR_COLORS[idx % AVATAR_COLORS.length]
          const monthly = getCoachMonthlyStats(coach.name)
          return (
            <div key={coach.id} style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '20px', borderTop: `3px solid ${color}` }}>
              {/* ── Header: avatar + (name + rating-chip) + Specialty row ─
                    Two clean rows next to the avatar:
                      1) Name (primary) and a compact rating chip (right)
                      2) "SPECIALTY" eyebrow label · vertical divider · type tags
                    Removes the previous big SPECIALTY block above the tags. */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 16,
                  flexShrink: 0, fontFamily: FONT,
                }}>
                  {coach.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#333333', fontFamily: FONT, lineHeight: 1.2 }}>
                      {coach.name}
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: '#FFF8E5', border: '1px solid #f59e0b30',
                      borderRadius: 999, padding: '2px 9px',
                      flexShrink: 0,
                    }}>
                      <Star size={11} weight="fill" color="#f59e0b" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#b07300', fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>
                        {coach.rating}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', rowGap: 6 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: '#8C8C8C',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>Specialty</span>
                    <span style={{ width: 1, height: 12, background: '#dcdcdc', display: 'inline-block' }} />
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {coach.specialties.map(s => {
                        const tc = tagColors(s, color)
                        return (
                          <span key={s} style={{
                            background: tc.bg, color: tc.color,
                            border: `1px solid ${tc.border}`,
                            borderRadius: 999, padding: '2px 9px',
                            fontSize: 11, fontWeight: 700, fontFamily: FONT,
                            lineHeight: 1.2,
                          }}>{tc.label}</span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Stat: monthly classes (clickable → schedule popup) ── */}
              <button
                onClick={() => setScheduleCoach(coach)}
                title="Open monthly schedule"
                style={{
                  width: '100%', background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10,
                  padding: '12px 14px', marginBottom: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  cursor: 'pointer', fontFamily: FONT,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CalendarCheck size={16} color={PRIMARY} weight="fill" />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums' }}>
                      {monthly.done}<span style={{ color: '#8C8C8C', fontWeight: 500 }}> / {monthly.total}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#8C8C8C' }}>Classes this month · {monthly.done} done</div>
                  </div>
                </div>
                <CaretRight size={14} color="#8C8C8C" />
              </button>

              {/* ── Availability strip — entire group is clickable, with
                    a "Click to view hours" hint so users grok the affordance. */}
              <button
                onClick={() => setAvailabilityCoach(coach)}
                title="Click any day to see free hours"
                style={{
                  width: '100%', background: '#fff',
                  border: '1px solid #dcdcdc', borderRadius: 10,
                  padding: '10px 12px',
                  cursor: 'pointer', fontFamily: FONT, textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CalendarBlank size={12} /> Availability
                  </span>
                  <span style={{ fontSize: 10, color: PRIMARY, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    View hours <CaretRight size={10} weight="bold" />
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {DAY_KEYS.map((d, i) => {
                    const hasShifts = (coach.availability[d]?.length ?? 0) > 0
                    return (
                      <div key={d} style={{
                        flex: 1, height: 28, borderRadius: 6,
                        background: hasShifts ? color + '20' : '#FAFBFD',
                        border: `1px solid ${hasShifts ? color : '#dcdcdc'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: hasShifts ? 700 : 400,
                        color: hasShifts ? color : '#8C8C8C', fontFamily: FONT,
                      }}>
                        {DAY_LABELS[i]}
                      </div>
                    )
                  })}
                </div>
              </button>

              {/* Timezone footer */}
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#8C8C8C' }}>
                <Globe size={12} />{coach.timezone}
              </div>
            </div>
          )
        })}
      </div>

      {availabilityCoach && (
        <CoachAvailabilityPopup
          coach={availabilityCoach}
          onClose={() => setAvailabilityCoach(null)}
        />
      )}
      {scheduleCoach && (
        <CoachMonthSchedulePopup
          coach={scheduleCoach}
          schedule={getCoachMonthSchedule(scheduleCoach.name)}
          onClose={() => setScheduleCoach(null)}
        />
      )}
    </div>
  )
}
