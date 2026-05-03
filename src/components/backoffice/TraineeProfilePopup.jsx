import { X, Sparkle, Lightning, Heart, Barbell, Clock, Calendar, ChartLine, Info, User, Target, Envelope, Star, Warning, UserPlus, CalendarX, Phone, Lifebuoy } from '@phosphor-icons/react'
import TrendBadge from './TrendBadge'
import { aiFeedbackTemplates } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const NEW_ACCENT = '#3A86FF'
const MISSING_ACCENT = '#F5365C'
const FONT = "'Heebo', 'Open Sans', sans-serif"

// Stable pseudo-hash so the same trainee always sees the same mock numbers/feedback.
function hash(str) {
  return [...str].reduce((a, c) => a + c.charCodeAt(0), 0)
}

// TODO(backend): replace mock stats with real per-trainee data from API.
function mockStatsFor(trainee) {
  const h = hash(trainee.name)
  return {
    sessionsAttended: 12 + (h % 8),
    avgHR:            128 + (h % 24),
    avgScore:         620 + ((h * 7) % 200),
    totalKg:          18000 + ((h * 41) % 12000),
    streak:           1 + (h % 5),
    bestZone:         3 + (h % 3),
    recentSessions:   buildRecent(h, trainee.trendDelta ?? 0),
  }
}

function buildRecent(h, delta) {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu']
  const base = 700 + (h % 100)
  const step = Math.round(delta * 4)
  return labels.map((d, i) => ({ day: d, score: Math.max(300, base + step * (i - 1.5) + ((h * (i + 1)) % 30)) }))
}

function pickFeedback(trainee) {
  const delta = trainee.trendDelta ?? 0
  const bucket = delta >= 5 ? 'improving' : delta <= -5 ? 'declining' : 'steady'
  const list = aiFeedbackTemplates[bucket]
  return list[hash(trainee.name) % list.length]
}

export default function TraineeProfilePopup({ trainee, onClose }) {
  if (!trainee) return null
  const isNew     = trainee.firstSessionTime != null
  const isMissing = trainee.sessionsMissed   != null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 720,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {isNew
          ? <NewTraineeBody trainee={trainee} onClose={onClose} />
          : isMissing
            ? <MissingTraineeBody trainee={trainee} onClose={onClose} />
            : <ExistingTraineeBody trainee={trainee} onClose={onClose} isMissing={false} />}
      </div>
    </div>
  )
}

// ─── New trainee body ───────────────────────────────────────────
function NewTraineeBody({ trainee, onClose }) {
  return (
    <>
      {/* Header — blue accent + "First session today" pill */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={trainee.name} accent={NEW_ACCENT} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{trainee.name}</span>
              <span style={{
                background: '#e0eeff', color: NEW_ACCENT, border: `1px solid ${NEW_ACCENT}40`,
                borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <UserPlus size={12} weight="fill" /> First session today
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#8C8C8C', marginTop: 4 }}>
              {trainee.firstSessionClass} · {trainee.firstSessionTime} · joined {formatDate(trainee.joinedDate)}
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <X size={16} color="#8C8C8C" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* Quick facts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          <StatCell icon={User}      label="Age"           value={`${trainee.age}${trainee.gender ? ` · ${trainee.gender}` : ''}`} color={NEW_ACCENT} />
          <StatCell icon={Star}      label="Fitness Level" value={trainee.fitnessLevel} color="#FF6B00" />
          <StatCell icon={Clock}     label="Preferred"     value={trainee.preferredTime} color="#8b5cf6" />
          <StatCell icon={Calendar}  label="First Class"   value={trainee.firstSessionTime} color={NEW_ACCENT} />
        </div>

        {/* Goals */}
        <SectionLabel><Target size={12} color={NEW_ACCENT} weight="fill" /> Personal goals</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {trainee.goals.map(g => (
            <span key={g} style={{
              background: '#e0eeff', color: NEW_ACCENT, border: `1px solid ${NEW_ACCENT}40`,
              borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 600,
            }}>{g}</span>
          ))}
        </div>

        {/* Experience */}
        <SectionLabel>Experience</SectionLabel>
        <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#333333', lineHeight: 1.5, marginBottom: 18 }}>
          {trainee.experience}
        </div>

        {/* Medical / safety */}
        <SectionLabel><Warning size={12} color="#FF6B00" weight="fill" /> Medical &amp; safety notes</SectionLabel>
        <div style={{ background: '#fff7ed', border: '1px solid #FF6B0033', borderLeft: '3px solid #FF6B00', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#333333', lineHeight: 1.5, marginBottom: 18 }}>
          {trainee.medicalNotes}
        </div>

        {/* Contact */}
        {trainee.contact && (
          <>
            <SectionLabel><Envelope size={12} /> Contact</SectionLabel>
            <div style={{ fontSize: 13, color: '#333333', fontWeight: 600 }}>{trainee.contact}</div>
          </>
        )}
      </div>

      {/* Footer notice */}
      <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={14} color="#8C8C8C" />
        <span style={{ fontSize: 11, color: '#8C8C8C' }}>
          New trainee profile. Use it to give a personalized welcome from minute one.
        </span>
      </div>
    </>
  )
}

// ─── Missing trainee body — re-engagement focused ─────────────
function MissingTraineeBody({ trainee, onClose }) {
  return (
    <>
      {/* Header — red accent, "X sessions missed" pill */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={trainee.name} accent={MISSING_ACCENT} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{trainee.name}</span>
              <span style={{
                background: '#fee2e8', color: MISSING_ACCENT, border: `1px solid ${MISSING_ACCENT}40`,
                borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <CalendarX size={12} weight="fill" /> {trainee.sessionsMissed} sessions missed
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#8C8C8C', marginTop: 4 }}>
              Last attended {formatDate(trainee.lastAttended)} · member since {formatDate(trainee.memberSince)}
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <X size={16} color="#8C8C8C" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* Quick facts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          <StatCell icon={CalendarX} label="Missed"        value={trainee.sessionsMissed}            color={MISSING_ACCENT} />
          <StatCell icon={Calendar}  label="30-day rate"   value={`${trainee.attendanceRate30d}%`}   color="#FF6B00" />
          <StatCell icon={ChartLine} label="Lifetime rate" value={`${trainee.attendanceRateLifetime}%`} color={PRIMARY} />
          <StatCell icon={Star}      label="Primary class" value={trainee.primaryClass}              color="#8b5cf6" />
        </div>

        {/* Attendance comparison bar */}
        <SectionLabel>Attendance — 30 days vs lifetime</SectionLabel>
        <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px', marginBottom: 18 }}>
          <AttendanceBar label="Last 30 days" pct={trainee.attendanceRate30d}    color={MISSING_ACCENT} />
          <div style={{ height: 10 }} />
          <AttendanceBar label="Lifetime"     pct={trainee.attendanceRateLifetime} color={PRIMARY} />
        </div>

        {/* Missed sessions list */}
        <SectionLabel><CalendarX size={12} color={MISSING_ACCENT} weight="fill" /> Recently missed</SectionLabel>
        <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, overflow: 'hidden', marginBottom: 18 }}>
          {trainee.missedSessions.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px',
              borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {formatDate(s.date)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#333333' }}>{s.class}</span>
              </div>
              <span style={{
                background: '#fee2e8', color: MISSING_ACCENT, border: `1px solid ${MISSING_ACCENT}40`,
                borderRadius: 999, padding: '2px 9px', fontSize: 11, fontWeight: 700,
              }}>
                Missed
              </span>
            </div>
          ))}
        </div>

        {/* Re-engagement recommendation */}
        <SectionLabel><Lifebuoy size={12} color={PRIMARY} weight="fill" /> Re-engagement tip</SectionLabel>
        <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px', fontSize: 13, lineHeight: 1.55, color: '#333333', marginBottom: 18 }}>
          {trainee.reengagementTip}
        </div>

        {/* Contact */}
        {trainee.contact && (
          <>
            <SectionLabel><Envelope size={12} /> Contact</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#333333', fontWeight: 600 }}>{trainee.contact}</span>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={14} color="#8C8C8C" />
        <span style={{ fontSize: 11, color: '#8C8C8C' }}>
          Read-only profile. Use it to inform a personal re-engagement message.
        </span>
      </div>
    </>
  )
}

function AttendanceBar({ label, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: '#8C8C8C' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: '#fff', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999 }} />
      </div>
    </div>
  )
}

// ─── Existing trainee body (improving / declining / missing) ────
function ExistingTraineeBody({ trainee, onClose, isMissing }) {
  const stats = mockStatsFor(trainee)
  const feedback = pickFeedback(trainee)

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={trainee.name} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{trainee.name}</span>
              {!isMissing && <TrendBadge delta={trainee.trendDelta} size="lg" />}
            </div>
            <div style={{ fontSize: 13, color: '#8C8C8C', marginTop: 4 }}>
              {isMissing
                ? `${trainee.sessionsMissed} sessions missed · last attended ${formatDate(trainee.lastAttended)}`
                : `Last session ${formatDate(trainee.lastSession)} · ${stats.sessionsAttended} sessions attended`}
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <X size={16} color="#8C8C8C" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 22 }}>
          <StatCell icon={ChartLine} label="Avg Score"   value={stats.avgScore} color={PRIMARY} />
          <StatCell icon={Heart}     label="Avg HR"      value={`${stats.avgHR} bpm`} color="#ef4444" />
          <StatCell icon={Barbell}   label="Total Kg"    value={stats.totalKg.toLocaleString()} color="#8b5cf6" />
          <StatCell icon={Lightning} label="Best Zone"   value={`Z${stats.bestZone}`} color="#FF6B00" />
        </div>

        {!isMissing && (
          <>
            <SectionLabel>Recent sessions</SectionLabel>
            <Sparkline points={stats.recentSessions} delta={trainee.trendDelta ?? 0} />
          </>
        )}

        <SectionLabel>
          <Sparkle size={12} color={PRIMARY} weight="fill" /> System Recommendation
        </SectionLabel>
        <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#333333', marginBottom: 6 }}>{feedback.summary}</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: '#444', margin: '0 0 12px' }}>{feedback.body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {feedback.focus.map(f => (
              <span key={f} style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 999, padding: '3px 10px', fontSize: 12, color: '#333333', fontWeight: 500 }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={14} color="#8C8C8C" />
        <span style={{ fontSize: 11, color: '#8C8C8C' }}>
          Read-only profile. Use it to inform what you say in person.
        </span>
      </div>
    </>
  )
}

function Avatar({ name, accent = PRIMARY }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%',
      background: accent, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 17, flexShrink: 0,
    }}>{initials}</div>
  )
}

function StatCell({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        <Icon size={12} color={color} weight="fill" />{label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#333333' }}>{value}</div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 16, marginBottom: 10 }}>
      {children}
    </div>
  )
}

// Tiny inline sparkline — pure SVG, no deps.
function Sparkline({ points, delta }) {
  const max = Math.max(...points.map(p => p.score))
  const min = Math.min(...points.map(p => p.score))
  const range = Math.max(1, max - min)
  const w = 100, h = 36, pad = 4
  const xs = (i) => pad + (i / (points.length - 1)) * (w - 2 * pad)
  const ys = (s) => pad + (1 - (s - min) / range) * (h - 2 * pad)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(p.score)}`).join(' ')
  const stroke = delta >= 0 ? '#23B870' : '#F5365C'

  return (
    <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg viewBox={`0 0 ${w} ${h}`} width={140} height={50} preserveAspectRatio="none">
        <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={xs(i)} cy={ys(p.score)} r="1.6" fill={stroke} />
        ))}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <span style={{ color: '#8C8C8C', minWidth: 30 }}>{p.day}</span>
            <span style={{ color: '#333333', fontWeight: 600 }}>{p.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
