import { useState } from 'react'
import { Users, Warning, Info, CalendarBlank, Target, ArrowsClockwise, X, CheckCircle } from '@phosphor-icons/react'
import { todayClasses, alerts } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const BLUE = '#5389f3'
const FONT = "'Heebo', 'Open Sans', sans-serif"

function StatCard({ icon: Icon, label, value, sublabel, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} weight="fill" color={color} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#333333', lineHeight: 1.1, fontFamily: FONT }}>{value}</div>
        <div style={{ fontSize: 12, color: '#8C8C8C', fontFamily: FONT }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: color, fontWeight: 500, fontFamily: FONT }}>{sublabel}</div>}
      </div>
    </div>
  )
}

const SEVERITY = {
  warning: { border: '#FF6B00', bg: '#fff7ed', icon: Warning },
  error:   { border: '#F5365C', bg: '#fef2f2', icon: Warning },
  info:    { border: '#3A86FF', bg: '#eff6ff', icon: Info },
}

const WORKOUT_TEMPLATES = {
  HIIT: { goal: 1800, blocks: ['Warm-Up', 'Demo & Prep', 'Dynamic Strength', 'Holds Isometric', 'All Out', 'Cool-down'] },
  Core: { goal: 900, blocks: ['Warm-Up', 'Core Circuit', 'Stability', 'Plank Series', 'Cool-down'] },
  Strength: { goal: 2400, blocks: ['Warm-Up', 'Demo & Prep', 'Push Strength', 'Pull Strength', 'Finisher', 'Cool-down'] },
}
const BLOCK_COLORS = [PRIMARY, '#5389f3', '#43a77c', '#43a77c', '#8b5cf6', '#6685cd']

function ClassModal({ cls, onClose }) {
  const tpl = WORKOUT_TEMPLATES[cls.type] || WORKOUT_TEMPLATES.HIIT
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #dcdcdc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ background: cls.color, color: '#fff', borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 700, fontFamily: FONT }}>{cls.time}</span>
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
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Type', value: cls.type },
              { label: 'Goal Reps', value: tpl.goal.toLocaleString() },
              { label: 'Participants', value: `${cls.enrolled} / ${cls.capacity}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: FONT }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{s.value}</div>
              </div>
            ))}
          </div>
          {/* Blocks */}
          <div style={{ fontSize: 12, fontWeight: 600, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: FONT }}>Training Blocks</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {tpl.blocks.map((block, i) => (
              <div key={block} style={{ flex: 1, background: '#fff', border: `2px solid ${BLOCK_COLORS[i] || PRIMARY}`, borderRadius: 10, padding: '12px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: BLOCK_COLORS[i] || PRIMARY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: FONT }}>Block {i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333333', fontFamily: FONT }}>{block}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HygearDashboard() {
  const [selectedClass, setSelectedClass] = useState(null)

  const totalEnrolled = todayClasses.reduce((a, c) => a + c.enrolled, 0)

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon={CalendarBlank} label="Today's Classes" value={todayClasses.length} color={PRIMARY} />
        <StatCard icon={Users} label="Total Enrolled" value={totalEnrolled} sublabel="+12 from yesterday" color={BLUE} />
        <StatCard icon={CheckCircle} label="Completed" value="2" color="#43a77c" />
        <StatCard icon={Target} label="Avg Capacity" value={`${Math.round((totalEnrolled / todayClasses.reduce((a,c)=>a+c.capacity,0))*100)}%`} color="#8b5cf6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Main: Today's Classes */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Today's Classes</h2>
            <span style={{ fontSize: 12, color: '#8C8C8C' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: FONT }}>
              <thead>
                <tr style={{ background: PRIMARY, color: '#fff' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Time</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Class</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Coach</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Room</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>Enrolled</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {todayClasses.map((cls, i) => (
                  <tr
                    key={cls.id}
                    onClick={() => setSelectedClass(cls)}
                    style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e6f7f8'}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFBFD'}
                  >
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0' }}>
                      <span style={{ background: cls.color, color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{cls.time}</span>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', fontWeight: 600, color: '#333333' }}>{cls.name}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>{cls.coach}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>{cls.room}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', textAlign: 'center', color: '#333333' }}>
                      <span style={{ fontWeight: 700 }}>{cls.enrolled}</span>
                      <span style={{ color: '#8C8C8C' }}> / {cls.capacity}</span>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                      <span style={{ background: PRIMARY + '18', color: PRIMARY, borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{cls.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Alerts */}
          <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '16px 18px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#333333', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Warning size={16} color="#FF6B00" weight="fill" /> Active Alerts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alerts.map(alert => {
                const s = SEVERITY[alert.severity]
                const Icon = s.icon
                return (
                  <div key={alert.id} style={{ background: s.bg, borderLeft: `3px solid ${s.border}`, borderRadius: 8, padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Icon size={14} weight="bold" color={s.border} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12, color: '#333333', fontFamily: FONT }}>{alert.message}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '16px 18px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#333333', margin: '0 0 12px' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Add Class', 'Invite Coach', 'Manage Rooms', 'View Reports'].map(label => (
                <button key={label} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '9px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: '#333333', fontWeight: 500, fontFamily: FONT }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedClass && <ClassModal cls={selectedClass} onClose={() => setSelectedClass(null)} />}
    </div>
  )
}
