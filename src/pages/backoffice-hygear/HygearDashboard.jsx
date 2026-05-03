import { useState } from 'react'
import { CalendarBlank, CalendarCheck, Equals, X, Plus, UserPlus, Gear, ChartLine, Lightning, ArrowRight } from '@phosphor-icons/react'
import { todayClasses, yesterdayClasses, equalizerBalance, traineesNeedingAttention } from '../../data/backoffice'
import { getWorkoutType, getWorkoutTemplate, WORKOUT_TYPES } from '../../data/workoutTypes'
import { ZONES } from '../../data/zones'
import TraineesNeedingAttention from '../../components/backoffice/TraineesNeedingAttention'
import AiFeedbackDrawer from '../../components/backoffice/AiFeedbackDrawer'
import AddClassWizard from '../../components/backoffice/AddClassWizard'
import AddCoachModal from '../../components/backoffice/AddCoachModal'
import TraineeProfilePopup from '../../components/backoffice/TraineeProfilePopup'
import EqualizerBalanceModal from '../../components/backoffice/EqualizerBalanceModal'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

// Block colors follow the Zone palette per the design brief:
// block 1 → Z1, 2 → Z2, ..., 5 → Z5, 6 → Z1 (cool-down).
const ZONE_BY_ID = Object.fromEntries(ZONES.map(z => [z.id, z]))
const blockZone = (idx) => ZONE_BY_ID[idx >= 5 ? 1 : (idx + 1)]

// ─── Class detail popup (used from inside the Today/Yesterday popups) ──
function ClassModal({ cls, onClose }) {
  const tpl = getWorkoutTemplate(cls.type)
  const t = getWorkoutType(cls.type)
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #dcdcdc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ background: t.color, color: '#fff', borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 700, fontFamily: FONT }}>{cls.time}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{cls.name}</div>
              <div style={{ fontSize: 13, color: '#8C8C8C', fontFamily: FONT }}>{cls.coach} · {cls.room}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>
        <div style={{ padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Type', value: t.label },
              { label: tpl.goalLabel, value: tpl.goalValue },
              { label: 'Participants', value: `${cls.enrolled} / ${cls.capacity}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: FONT }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: FONT }}>Training Blocks</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {tpl.blocks.map((block, i) => {
              const z = blockZone(i)
              return (
                <div key={block.name} style={{ flex: 1, background: '#fff', border: `2px solid ${z.color}`, borderRadius: 10, padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: z.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: FONT }}>Block {i + 1} · Z{z.id}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#333333', fontFamily: FONT }}>{block.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Today's Classes popup ─────────────────────────────────────
// Same table that used to live at the bottom of the dashboard, minus the
// Enrolled column (per the request).
function TodayClassesModal({ open, onClose }) {
  const [selected, setSelected] = useState(null)
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        <ModalHeader icon={CalendarBlank} title="Today's Classes" subtitle={`${todayClasses.length} classes · ${todayClasses.filter(c => c.done).length} completed`} onClose={onClose} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <ClassTable rows={todayClasses} variant="today" onRow={setSelected} />
        </div>
      </div>
      {selected && <ClassModal cls={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

// ─── Yesterday Classes popup ───────────────────────────────────
function YesterdayClassesModal({ open, onClose }) {
  const [selected, setSelected] = useState(null)
  if (!open) return null
  const totalAttended = yesterdayClasses.reduce((a, c) => a + c.attended, 0)
  const totalCapacity = yesterdayClasses.reduce((a, c) => a + c.capacity, 0)
  const avg = Math.round((totalAttended / totalCapacity) * 100)
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        <ModalHeader icon={CalendarCheck} title="Yesterday's Classes" subtitle={`${yesterdayClasses.length} classes · ${avg}% avg capacity`} onClose={onClose} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <ClassTable rows={yesterdayClasses} variant="yesterday" onRow={setSelected} />
        </div>
      </div>
      {selected && <ClassModal cls={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ModalHeader({ icon: Icon, title, subtitle, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={PRIMARY} weight="fill" />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#333333' }}>{title}</h3>
          <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
      <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <X size={16} color="#8C8C8C" />
      </button>
    </div>
  )
}

// Shared classes table — variant 'today' (no Enrolled col) or 'yesterday'
// (capacity % instead of Enrolled).
function ClassTable({ rows, variant, onRow }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: FONT }}>
        <thead>
          <tr style={{ background: PRIMARY, color: '#fff' }}>
            <th style={th('left')}>Time</th>
            <th style={th('left')}>Class</th>
            <th style={th('left')}>Coach</th>
            <th style={th('left')}>Room</th>
            <th style={th('center')}>Type</th>
            {variant === 'today' && <th style={th('center')}>Status</th>}
            {variant === 'yesterday' && <th style={th('center')}>Capacity</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((cls, i) => {
            const t = getWorkoutType(cls.type)
            const cap = variant === 'yesterday' ? Math.round((cls.attended / cls.capacity) * 100) : null
            return (
              <tr
                key={cls.id}
                onClick={() => onRow?.(cls)}
                style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e6f7f8'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFBFD'}
              >
                <td style={td()}>
                  <span style={{ background: t.color, color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{cls.time}</span>
                </td>
                <td style={{ ...td(), fontWeight: 600, color: '#333333' }}>{cls.name}</td>
                <td style={{ ...td(), color: '#8C8C8C' }}>{cls.coach}</td>
                <td style={{ ...td(), color: '#8C8C8C' }}>{cls.room}</td>
                <td style={{ ...td(), textAlign: 'center' }}>
                  <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{t.label}</span>
                </td>
                {variant === 'today' && (
                  <td style={{ ...td(), textAlign: 'center' }}>
                    <span style={{
                      background: cls.done ? '#d1f5e4' : '#FAFBFD',
                      color: cls.done ? '#23B870' : '#8C8C8C',
                      border: `1px solid ${cls.done ? '#23B870' : '#dcdcdc'}40`,
                      borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    }}>
                      {cls.done ? 'Completed' : 'Upcoming'}
                    </span>
                  </td>
                )}
                {variant === 'yesterday' && (
                  <td style={{ ...td(), textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <div style={{ width: 70, height: 6, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${cap}%`, background: cap >= 90 ? '#23B870' : cap >= 60 ? PRIMARY : '#f59e0b', borderRadius: 999 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums', minWidth: 36 }}>{cap}%</span>
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
const th = (align) => ({ padding: '12px 16px', textAlign: align, fontWeight: 600 })
const td = ()      => ({ padding: '12px 16px', borderTop: '1px solid #f0f0f0' })

// ─── Stats card ─────────────────────────────────────────────────
// Vertically-centered icon + label + content; chevron in the corner is
// the subtle clickable affordance. Hover: lift + colored shadow + chevron
// slides forward.
function StatsCard({ icon: Icon, label, color, children, onClick }) {
  return (
    <button onClick={onClick}
      className="stats-card"
      style={{
        position: 'relative',
        background: '#fff', border: '1px solid #dcdcdc', borderRadius: 14,
        padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 18,
        cursor: 'pointer', textAlign: 'left', fontFamily: FONT,
        transition: 'all 0.18s ease', width: '100%', minHeight: 116,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.boxShadow = `0 8px 20px ${color}26`
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#dcdcdc'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={28} weight="fill" color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        {children}
      </div>
      {/* Subtle chevron — sits in the corner to signal "click to expand" */}
      <span className="stats-card__cta" style={{
        position: 'absolute', top: 14, right: 16,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 24, height: 24, borderRadius: '50%',
        background: color + '14', color, opacity: 0.7,
        transition: 'all 0.18s ease',
      }}>
        <ArrowRight size={12} weight="bold" />
      </span>
      <style>{`
        .stats-card:hover .stats-card__cta { opacity: 1; transform: translateX(2px); }
      `}</style>
    </button>
  )
}

// ─── Page ───────────────────────────────────────────────────────
export default function HygearDashboard() {
  const [aiTrainee, setAiTrainee] = useState(null)
  const [profileTrainee, setProfileTrainee] = useState(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [todayOpen, setTodayOpen] = useState(false)
  const [yesterdayOpen, setYesterdayOpen] = useState(false)
  const [equalizerOpen, setEqualizerOpen] = useState(false)

  const QUICK_ACTIONS = [
    { label: 'Add Class',    desc: 'Schedule a new session',  icon: Plus,      onClick: () => setWizardOpen(true) },
    { label: 'Add Coach',    desc: 'Invite a new coach',      icon: UserPlus,  onClick: () => setCoachModalOpen(true) },
    { label: 'Manage Rooms', desc: 'Studio rooms & stations', icon: Gear,      onClick: () => {} },
    { label: 'View Reports', desc: 'Performance & analytics', icon: ChartLine, onClick: () => {} },
  ]

  const todayDone = todayClasses.filter(c => c.done).length
  const todayTotal = todayClasses.length
  // Equalizer: use weekly window for the inline summary on the card.
  const weekly = equalizerBalance.week
  const weeklyTotal = Object.values(weekly).reduce((a, b) => a + b, 0)
  const weeklyPercents = Object.fromEntries(
    Object.entries(weekly).map(([k, v]) => [k, Math.round((v / weeklyTotal) * 100)])
  )

  return (
    <div style={{ fontFamily: FONT }}>
      {/* 3 clickable stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatsCard icon={CalendarBlank} label="Today's Classes" color={PRIMARY} onClick={() => setTodayOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#333333', lineHeight: 1 }}>{todayTotal}</span>
            <span style={{ fontSize: 13, color: '#8C8C8C' }}>classes</span>
          </div>
          <div style={{ fontSize: 12, color: '#8C8C8C' }}>
            <span style={{ color: '#23B870', fontWeight: 700 }}>{todayDone} completed</span> · {todayTotal - todayDone} upcoming
          </div>
        </StatsCard>

        <StatsCard icon={CalendarCheck} label="Yesterday's Classes" color="#23B870" onClick={() => setYesterdayOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#333333', lineHeight: 1 }}>{yesterdayClasses.length}</span>
            <span style={{ fontSize: 13, color: '#8C8C8C' }}>classes</span>
          </div>
          <div style={{ fontSize: 12, color: '#8C8C8C' }}>
            All completed · <span style={{ color: '#23B870', fontWeight: 700 }}>{Math.round((yesterdayClasses.reduce((a, c) => a + c.attended, 0) / yesterdayClasses.reduce((a, c) => a + c.capacity, 0)) * 100)}%</span> avg capacity
          </div>
        </StatsCard>

        <StatsCard icon={Equals} label="Equalizer Balance" color="#8b5cf6" onClick={() => setEqualizerOpen(true)}>
          {/* Stacked bar */}
          <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', background: '#FAFBFD', border: '1px solid #dcdcdc' }}>
            {WORKOUT_TYPES.map(t => (
              <div key={t.short} style={{ width: `${weeklyPercents[t.short] || 0}%`, background: t.color }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8C8C8C' }}>
            {WORKOUT_TYPES.map(t => (
              <span key={t.short} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: t.color, display: 'inline-block' }} />
                <span style={{ color: '#333333', fontWeight: 600 }}>{t.short}</span>
                <span style={{ fontWeight: 700, color: t.color }}>{weeklyPercents[t.short] || 0}%</span>
              </span>
            ))}
          </div>
        </StatsCard>
      </div>

      {/* Trainees Needing Attention */}
      <TraineesNeedingAttention
        data={traineesNeedingAttention}
        onSelectTrainee={setProfileTrainee}
      />

      {/* Quick Actions */}
      <div style={{
        background: '#fff', border: '1px solid #dcdcdc', borderRadius: 14,
        boxShadow: '0 4px 14px rgba(34, 50, 84, 0.05)',
        padding: '20px 22px 18px',
        marginBottom: 26,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: PRIMARY + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lightning size={18} color={PRIMARY} weight="fill" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#333333' }}>
              Quick Actions
            </h2>
            <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>
              Common admin tasks · {QUICK_ACTIONS.length} shortcuts
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          {QUICK_ACTIONS.map(a => {
            const Icon = a.icon
            return (
              <button key={a.label} onClick={a.onClick}
                style={{
                  background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12,
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', textAlign: 'left', fontFamily: FONT,
                  transition: 'all 0.12s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.boxShadow = '0 4px 10px rgba(39,187,193,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#dcdcdc'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={PRIMARY} weight="fill" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#333333' }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: '#8C8C8C' }}>{a.desc}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      <TodayClassesModal      open={todayOpen}     onClose={() => setTodayOpen(false)} />
      <YesterdayClassesModal  open={yesterdayOpen} onClose={() => setYesterdayOpen(false)} />
      <EqualizerBalanceModal  open={equalizerOpen} onClose={() => setEqualizerOpen(false)} />

      <AiFeedbackDrawer trainee={aiTrainee} onClose={() => setAiTrainee(null)} />
      <TraineeProfilePopup trainee={profileTrainee} onClose={() => setProfileTrainee(null)} />

      <AddClassWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreate={(payload) => {
          // TODO(backend): POST new class to /classes; for now just log it.
          console.log('Class created:', payload)
        }}
      />

      <AddCoachModal
        open={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        onCreate={(payload) => {
          // TODO(backend): POST new coach to /coaches.
          console.log('Coach created:', payload)
        }}
      />
    </div>
  )
}
