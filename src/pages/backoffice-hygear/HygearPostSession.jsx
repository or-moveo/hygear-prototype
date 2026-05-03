import { useMemo, useState } from 'react'
import { Trophy, Medal, CheckCircle, XCircle, Sparkle, House, Clock } from '@phosphor-icons/react'
import { Heart, Users, Barbell, Target } from '@phosphor-icons/react'
import { postSessionData } from '../../data/backoffice'
import { getWorkoutType } from '../../data/workoutTypes'
import TrendBadge from '../../components/backoffice/TrendBadge'
import AiFeedbackDrawer from '../../components/backoffice/AiFeedbackDrawer'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#cd7f32']
// Fixed row height — keeps every leaderboard row uniform regardless of which
// row carries a Medal icon or a TrendBadge. (Was 'auto' before; medal rows
// rendered ~6px taller than plain rows.)
const ROW_HEIGHT = 48

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={20} weight="fill" color={color} />
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{value}</div>
        <div style={{ fontSize: 11, color: '#8C8C8C', fontFamily: FONT }}>{label}</div>
      </div>
    </div>
  )
}

export default function HygearPostSession() {
  const { sessions } = postSessionData
  const studios = useMemo(() => Array.from(new Set(sessions.map(s => s.studio))), [sessions])

  // Two filter dimensions — studio first, then a time pill within that studio.
  const [studio, setStudio] = useState(studios[0])
  const studioSessions = useMemo(
    () => sessions.filter(s => s.studio === studio).sort((a, b) => a.time.localeCompare(b.time)),
    [sessions, studio]
  )
  const [sessionId, setSessionId] = useState(studioSessions[0]?.id)
  // If the studio changes and the previously-selected session no longer
  // belongs to it, snap to that studio's first session.
  const selected =
    studioSessions.find(s => s.id === sessionId) ?? studioSessions[0]
  const activeId = selected?.id

  const [selectedTrainee, setSelectedTrainee] = useState(null)

  if (!selected) return null
  const { leaderboard, aggregateStats, className, type, time, endTime, coach } = selected
  const t = getWorkoutType(type)

  const onPickStudio = (s) => {
    setStudio(s)
    const next = sessions.find(x => x.studio === s)
    if (next) setSessionId(next.id)
  }

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ── Session picker — one card, two clearly-labelled rows.
            Row 1 picks the STUDIO; row 2 picks the CLASS within that
            studio. Both rows use the same pill button so the user
            understands they're the same control type. ────────────── */}
      <div style={{
        background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12,
        padding: '14px 18px', marginBottom: 18,
      }}>
        <FilterRow label="Studio">
          {studios.map(s => {
            const isActive = s === studio
            const count = sessions.filter(x => x.studio === s).length
            return (
              <FilterPill
                key={s}
                active={isActive}
                onClick={() => onPickStudio(s)}
                icon={<House size={13} weight={isActive ? 'fill' : 'regular'} color={isActive ? '#fff' : '#8C8C8C'} />}
              >
                <span>{s}</span>
                <Counter active={isActive}>{count}</Counter>
              </FilterPill>
            )
          })}
        </FilterRow>

        <div style={{ height: 1, background: '#f0f0f0', margin: '12px 0' }} />

        <FilterRow label="Class">
          {studioSessions.map(s => {
            const isActive = s.id === activeId
            const wt = getWorkoutType(s.type)
            return (
              <FilterPill
                key={s.id}
                active={isActive}
                onClick={() => setSessionId(s.id)}
                icon={<Clock size={13} weight="bold" color={isActive ? '#fff' : '#8C8C8C'} />}
              >
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{s.time}</span>
                <span style={{ opacity: isActive ? 0.85 : 0.6 }}>{s.className}</span>
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.22)' : wt.bg,
                  color: isActive ? '#fff' : wt.color,
                  border: isActive ? '1px solid rgba(255,255,255,0.35)' : `1px solid ${wt.border}`,
                  borderRadius: 999, padding: '0 7px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
                }}>{s.type}</span>
              </FilterPill>
            )
          })}
        </FilterRow>
      </div>

      {/* Summary banner — now reflects the SELECTED session */}
      <div style={{ background: '#fff', border: `2px solid ${t.color}`, borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Session Complete</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{className}</div>
            <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{t.label}</span>
          </div>
          <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 4 }}>
            {time}–{endTime} · {coach} · {studio}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[`${leaderboard.length} Participants`, new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })].map(label => (
            <span key={label} style={{ background: PRIMARY + '18', color: PRIMARY, border: `1px solid ${PRIMARY}40`, borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon={Heart}    label="Avg Heart Rate"  value={aggregateStats.classAvgHR}        color="#ef4444" />
        <StatCard icon={Barbell}  label="Total Weight"    value={aggregateStats.totalWeightMoved}  color="#8b5cf6" />
        <StatCard icon={Target}   label="Avg Completion"  value={`${aggregateStats.avgCompletion}%`} color={PRIMARY} />
        <StatCard icon={Users}    label="Participants"    value={leaderboard.length}                color="#5389f3" />
      </div>

      {/* Leaderboard — full-width now that the Notifications sidebar is removed. */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333333', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Trophy size={18} color="#f59e0b" weight="fill" /> Leaderboard
        </h2>
        <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: FONT }}>
              <thead>
                <tr style={{ background: PRIMARY }}>
                  {['Rank', 'Name', 'Score', 'Reps', 'Weight', 'Completion', 'Upload', 'AI'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: h === 'Name' ? 'left' : 'center', fontWeight: 600, color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((p, i) => (
                  <tr key={p.rank} style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD', height: ROW_HEIGHT }}>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                      {i < 3 ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <Medal size={18} weight="fill" color={MEDAL_COLORS[i]} />
                          <span style={{ fontWeight: 700, color: '#333333' }}>{p.rank}</span>
                        </span>
                      ) : (
                        <span style={{ color: '#8C8C8C' }}>{p.rank}</span>
                      )}
                    </td>
                    <td style={{ padding: '0 14px', borderTop: '1px solid #f0f0f0', fontWeight: 600, color: '#333333', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{p.name}</span>
                        <TrendBadge delta={p.trendDelta} />
                      </div>
                    </td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', fontWeight: 700, color: '#333333', verticalAlign: 'middle' }}>{p.score}</td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C', verticalAlign: 'middle' }}>{p.totalReps}</td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C', verticalAlign: 'middle' }}>{p.totalKg} kg</td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <div style={{ width: 60, height: 6, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${p.completionPct}%`, background: PRIMARY, borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#8C8C8C' }}>{p.completionPct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                      {p.uploadStatus === 'synced'
                        ? <CheckCircle size={16} weight="fill" color="#23B870" style={{ verticalAlign: 'middle' }} />
                        : p.uploadStatus === 'failed'
                          ? <XCircle size={16} weight="fill" color="#ef4444" style={{ verticalAlign: 'middle' }} />
                          : <span style={{ fontSize: 11, color: '#f59e0b' }}>Pending</span>}
                    </td>
                    <td style={{ padding: '0 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                      <button
                        onClick={() => setSelectedTrainee(p)}
                        title={`AI feedback for ${p.name}`}
                        style={{
                          width: 28, height: 28, borderRadius: 8,
                          background: selectedTrainee?.rank === p.rank ? PRIMARY : '#FAFBFD',
                          border: `1px solid ${selectedTrainee?.rank === p.rank ? PRIMARY : '#dcdcdc'}`,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', verticalAlign: 'middle',
                        }}
                      >
                        <Sparkle size={14} weight="fill" color={selectedTrainee?.rank === p.rank ? '#fff' : PRIMARY} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>

      <AiFeedbackDrawer trainee={selectedTrainee} onClose={() => setSelectedTrainee(null)} />
    </div>
  )
}

// One row of the filter card: small label on the left, pills on the right.
function FilterRow({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <span style={{
        fontSize: 11, fontWeight: 700, color: '#8C8C8C',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        minWidth: 56,
      }}>{label}</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  )
}

// Single pill — same shape & sizing for both Studio and Class so the user
// reads the two filters as variants of one control. Active = solid primary.
function FilterPill({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 12px', borderRadius: 999,
        border: `1px solid ${active ? PRIMARY : '#dcdcdc'}`,
        background: active ? PRIMARY : '#fff',
        color: active ? '#fff' : '#333333',
        fontFamily: FONT, fontSize: 12,
        fontWeight: active ? 700 : 600,
        cursor: 'pointer',
        boxShadow: active ? '0 1px 3px rgba(39,187,193,0.25)' : 'none',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {icon}
      {children}
    </button>
  )
}

function Counter({ active, children }) {
  return (
    <span style={{
      background: active ? 'rgba(255,255,255,0.22)' : '#FAFBFD',
      color: active ? '#fff' : '#8C8C8C',
      border: active ? '1px solid rgba(255,255,255,0.35)' : '1px solid #dcdcdc',
      borderRadius: 999, padding: '0 7px',
      fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
    }}>{children}</span>
  )
}
