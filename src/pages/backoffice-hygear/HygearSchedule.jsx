import { useMemo, useState } from 'react'
import { Plus, FunnelSimple, Warning, X, Clock, MapPin, Barbell, Users, CalendarBlank } from '@phosphor-icons/react'
import { weeklySchedule } from '../../data/backoffice'
import { getWorkoutType, getWorkoutTemplate, WORKOUT_TYPES } from '../../data/workoutTypes'
import { ZONES } from '../../data/zones'
import AddClassWizard from '../../components/backoffice/AddClassWizard'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const CONFLICT = '#F5365C'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = Array.from({ length: 15 }, (_, i) => i + 6)
const ROOMS = ['All Rooms', 'Main Floor', 'Studio B']
const COACHES = ['All Coaches', 'Maya', 'Dan', 'Noa', 'Tom', 'Liora']
const TYPE_FILTERS = ['All Types', ...WORKOUT_TYPES.map(t => t.short)]

const ZONE_BY_ID = Object.fromEntries(ZONES.map(z => [z.id, z]))

// Zone mapping for blocks per the design brief:
// block 1 → Z1, 2 → Z2, ..., 5 → Z5, 6 → Z1 (cool-down loops back).
function blockZone(idx) {
  return ZONE_BY_ID[idx >= 5 ? 1 : (idx + 1)]
}

// Equipment per Workout Type — Hygear's own product names.
// TODO(backend): replace with per-workout equipment from API.
const EQUIPMENT_BY_TYPE = {
  Build:  ['Bands+', 'Straps', 'Spider', 'Rope'],
  Shield: ['Bands+', 'Spider', 'Straps'],
  Burn:   ['Bands+', 'Rope', 'Spider'],
}

// TODO(backend): replace with real per-class participant counts from API.
const MOCK_PARTICIPANTS = (cls) => 8 + ((cls.day + cls.time.charCodeAt(0)) % 9)

function timeToMin(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
function timeToRow(time) {
  const [h, m] = time.split(':').map(Number)
  return (h - 6) * 2 + (m >= 30 ? 1 : 0) + 2
}
function durationToSpan(startTime, endTime) {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  return Math.max(1, Math.round(((eh * 60 + em) - (sh * 60 + sm)) / 30))
}
function durationMin(startTime, endTime) {
  return timeToMin(endTime) - timeToMin(startTime)
}

// Build a conflict map for the given class list. A conflict is two classes
// on the same day whose times overlap AND that share a room or a coach.
// Returns { [classKey]: [otherKey, ...] }.
function buildConflicts(list) {
  const key = (c, idx) => `${c.day}-${c.time}-${idx}`
  const map = {}
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j]
      if (a.day !== b.day) continue
      const overlap = timeToMin(a.time) < timeToMin(b.endTime) && timeToMin(b.time) < timeToMin(a.endTime)
      if (!overlap) continue
      if (a.room !== b.room && a.coach !== b.coach && !a.conflict && !b.conflict) continue
      const ka = key(a, i), kb = key(b, j)
      ;(map[ka] = map[ka] || []).push({ name: b.name, time: b.time, room: b.room, coach: b.coach })
      ;(map[kb] = map[kb] || []).push({ name: a.name, time: a.time, room: a.room, coach: a.coach })
    }
  }
  return { map, key }
}

function ClassDetailModal({ cls, conflicts, onClose }) {
  const t = getWorkoutType(cls.type)
  const tpl = getWorkoutTemplate(cls.type)
  const equipment = EQUIPMENT_BY_TYPE[t.short] || []
  const participants = MOCK_PARTICIPANTS(cls)
  const duration = durationMin(cls.time, cls.endTime)
  const hasConflict = conflicts && conflicts.length > 0

  // Build a human-readable explanation of WHY this class conflicts.
  const conflictReason = (other) => {
    const sameRoom  = other.room  === cls.room
    const sameCoach = other.coach === cls.coach
    if (sameRoom && sameCoach) return 'Same room AND same coach at the same time.'
    if (sameRoom)  return `Both classes are booked in ${cls.room} at the same time.`
    if (sameCoach) return `Coach ${cls.coach.split(' ')[0]} is double-booked.`
    return 'Overlapping time slot flagged for review.'
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 760, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #dcdcdc' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{cls.name}</span>
              <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                {t.label}
              </span>
              {hasConflict && (
                <span style={{ background: CONFLICT, color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Warning size={12} weight="fill" /> Schedule conflict
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, color: '#8C8C8C' }}>
              {DAY_LABELS[cls.day]} · {cls.time}–{cls.endTime}
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        {/* Meta grid */}
        <div style={{ padding: 28 }}>
          {/* Conflict alert — bold and explicit so the coach knows what to fix */}
          {hasConflict && (
            <div style={{ background: '#fef2f2', border: `1px solid ${CONFLICT}`, borderLeft: `4px solid ${CONFLICT}`, borderRadius: 10, padding: '12px 16px', marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Warning size={16} color={CONFLICT} weight="fill" />
                <span style={{ fontSize: 14, fontWeight: 700, color: CONFLICT }}>
                  {conflicts.length === 1 ? 'Conflict with another class' : `Conflicts with ${conflicts.length} classes`}
                </span>
              </div>
              {conflicts.map((c, i) => (
                <div key={i} style={{ fontSize: 13, color: '#333333', lineHeight: 1.55, marginTop: i === 0 ? 0 : 6 }}>
                  <strong>{c.name}</strong> · {c.time} · {c.room} · coach {c.coach.split(' ')[0]}
                  <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>{conflictReason(c)}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 22 }}>
            <MetaCell icon={Users} label="Coach" value={cls.coach} />
            <MetaCell icon={MapPin} label="Room" value={cls.room} />
            <MetaCell icon={Clock} label="Duration" value={`${duration} min`} />
            <MetaCell label="Goal">
              <div style={{ fontSize: 14, fontWeight: 700, color: '#333333' }}>{tpl.goalValue}</div>
              <div style={{ fontSize: 11, color: '#8C8C8C' }}>{tpl.goalLabel}</div>
            </MetaCell>
            <MetaCell icon={Users} label="Registered" value={`${participants} trainees`} />
          </div>

          {/* Equipment */}
          <SectionLabel>Required Equipment</SectionLabel>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
            {equipment.map(e => (
              <span key={e} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 6, padding: '5px 10px', fontSize: 12, color: '#333333', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Barbell size={12} color={PRIMARY} />{e}
              </span>
            ))}
          </div>

          {/* Blocks + exercises */}
          <SectionLabel>Training Blocks &amp; Exercises</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tpl.blocks.map((b, i) => {
              const z = blockZone(i)
              return (
                <div key={b.name} style={{ background: '#FAFBFD', border: `1px solid #dcdcdc`, borderLeft: `3px solid ${z.color}`, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ background: z.color, color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>BLOCK {i + 1}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#333333' }}>{b.name}</span>
                    <span style={{ fontSize: 11, color: z.color, fontWeight: 700, letterSpacing: '0.04em' }}>· Z{z.id} {z.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8C8C8C' }}>{b.exercises.join(' · ')}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaCell({ icon: Icon, label, value, children }) {
  return (
    <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        {Icon && <Icon size={11} />}{label}
      </div>
      {children ?? <div style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>{value}</div>}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
      {children}
    </div>
  )
}

export default function HygearSchedule() {
  const [activeRoom, setActiveRoom] = useState('All Rooms')
  const [activeCoach, setActiveCoach] = useState('All Coaches')
  const [activeType, setActiveType] = useState('All Types')
  const [selectedClass, setSelectedClass] = useState(null)
  const [wizardOpen, setWizardOpen] = useState(false)

  const filtered = useMemo(() => weeklySchedule.filter(cls => {
    const roomOk  = activeRoom  === 'All Rooms'   || cls.room === activeRoom
    const coachOk = activeCoach === 'All Coaches' || cls.coach.startsWith(activeCoach)
    const typeOk  = activeType  === 'All Types'   || cls.type === activeType
    return roomOk && coachOk && typeOk
  }), [activeRoom, activeCoach, activeType])

  const conflicts = useMemo(() => buildConflicts(filtered), [filtered])

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <FunnelSimple size={16} color="#8C8C8C" />
          <span style={{ fontSize: 13, color: '#8C8C8C' }}>Filter:</span>

          <FilterRow active={activeRoom}  set={setActiveRoom}  options={ROOMS} />
          <Divider />
          <FilterRow active={activeCoach} set={setActiveCoach} options={COACHES} />
          <Divider />
          <FilterRow
            active={activeType}
            set={setActiveType}
            options={TYPE_FILTERS}
            renderLabel={(opt) => opt === 'All Types' ? opt : getWorkoutType(opt).label}
            getActiveColor={(opt) => opt === 'All Types' ? PRIMARY : getWorkoutType(opt).color}
          />
        </div>
        <button onClick={() => setWizardOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT, flexShrink: 0 }}>
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
          {filtered.map((cls, idx) => {
            const t = getWorkoutType(cls.type)
            const k = conflicts.key(cls, idx)
            const conflictList = conflicts.map[k]
            const hasConflict = !!conflictList
            const conflictTitle = hasConflict
              ? 'Conflict with ' + conflictList.map(c => c.name).join(', ')
              : undefined
            return (
              <div
                key={`${cls.day}-${cls.time}-${cls.name}`}
                onClick={() => setSelectedClass({ ...cls, _conflicts: conflictList || null })}
                title={conflictTitle}
                style={{
                  gridColumn: cls.day + 2,
                  gridRow: timeToRow(cls.time),
                  gridRowEnd: timeToRow(cls.time) + durationToSpan(cls.time, cls.endTime),
                  margin: '2px 3px',
                  background: hasConflict ? '#fef2f2' : t.bg,
                  border: hasConflict ? `2.5px solid ${CONFLICT}` : `1px solid ${t.border}`,
                  borderLeft: hasConflict ? `5px solid ${CONFLICT}` : `4px solid ${t.color}`,
                  borderRadius: 6,
                  padding: '4px 6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: hasConflict ? 2 : 1,
                  boxShadow: hasConflict ? `0 0 0 3px ${CONFLICT}33, 0 4px 10px rgba(245,54,92,0.25)` : 'none',
                  animation: hasConflict ? 'conflict-pulse 2s ease-in-out infinite' : undefined,
                }}
              >
                {hasConflict && (
                  <div style={{
                    position: 'absolute', top: -1, right: -1,
                    background: CONFLICT, color: '#fff',
                    fontSize: 8, fontWeight: 800, letterSpacing: '0.08em',
                    padding: '1px 5px', borderRadius: '0 4px 0 6px',
                  }}>CONFLICT</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: hasConflict ? CONFLICT : t.color, fontFamily: FONT }}>{cls.time}</div>
                  {hasConflict && <Warning size={12} color={CONFLICT} weight="fill" />}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: hasConflict ? CONFLICT : '#333333', fontFamily: FONT, lineHeight: 1.2 }}>{cls.name}</div>
                <div style={{ fontSize: 10, color: '#8C8C8C', fontFamily: FONT }}>{cls.coach.split(' ')[0]}</div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedClass && <ClassDetailModal cls={selectedClass} conflicts={selectedClass._conflicts} onClose={() => setSelectedClass(null)} />}

      {/* Conflict-card pulsing animation */}
      <style>{`
        @keyframes conflict-pulse {
          0%, 100% { box-shadow: 0 0 0 3px ${CONFLICT}33, 0 4px 10px rgba(245,54,92,0.25); }
          50%      { box-shadow: 0 0 0 6px ${CONFLICT}22, 0 6px 14px rgba(245,54,92,0.40); }
        }
      `}</style>

      <AddClassWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreate={(payload) => {
          // TODO(backend): POST new class to /classes; for now just log it.
          console.log('Class created:', payload)
        }}
      />
    </div>
  )
}

function FilterRow({ active, set, options, renderLabel, getActiveColor }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {options.map(o => {
        const isActive = active === o
        const activeColor = getActiveColor ? getActiveColor(o) : PRIMARY
        return (
          <button
            key={o}
            onClick={() => set(o)}
            style={{
              padding: '5px 12px', borderRadius: 999, border: '1px solid',
              borderColor: isActive ? activeColor : '#dcdcdc',
              background: isActive ? activeColor : '#fff',
              color: isActive ? '#fff' : '#333333',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT,
            }}
          >
            {renderLabel ? renderLabel(o) : o}
          </button>
        )
      })}
    </div>
  )
}

function Divider() {
  return <div style={{ width: 1, height: 18, background: '#dcdcdc', margin: '0 4px' }} />
}
