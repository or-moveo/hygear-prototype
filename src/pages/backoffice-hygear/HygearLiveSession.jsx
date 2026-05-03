import { useState } from 'react'
import { Timer, TrendUp, Trophy, Heart, Barbell, Medal, User, House } from '@phosphor-icons/react'
import { liveSessionData } from '../../data/backoffice'
import { getWorkoutType } from '../../data/workoutTypes'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#cd7f32']  // gold, silver, bronze

// Status palette — keep these stable; referenced from multiple places.
const STATUS_COLOR = {
  active:   '#23B870',  // green  — trainee on station and working
  inactive: '#f59e0b',  // orange — station was assigned but the trainee didn't show
  empty:    '#dcdcdc',  // gray   — no trainee assigned
}
const STATUS_LABEL = {
  active:   'Active',
  inactive: 'Inactive',
  empty:    'Empty',
}

// Ranking criterion for medals on station cards.
// TODO(ranking): replace with whatever metric the product team finalises.
function rankMetric(s) {
  return (s.reps ?? 0) * (s.kg ?? 0)   // total volume = reps × weight
}

function StatBadge({ icon: Icon, label, value, color }) {
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

export default function HygearLiveSession() {
  const { studios } = liveSessionData
  const [activeId, setActiveId] = useState(studios[0].id)
  const studio = studios.find(s => s.id === activeId) ?? studios[0]
  const t = getWorkoutType(studio.type)

  // Compute Top 3 by ranking metric, ignoring empty/inactive stations.
  const ranked = studio.stations
    .filter(s => s.status === 'active')
    .slice()
    .sort((a, b) => rankMetric(b) - rankMetric(a))
  const top3Ids = new Set(ranked.slice(0, 3).map(s => s.id))
  const medalRank = (id) => top3Ids.has(id) ? ranked.findIndex(s => s.id === id) : null

  // Quick counts for the studio tab pills (active vs total participating stations).
  const studioCounts = (s) => {
    const total = s.stations.length
    const active = s.stations.filter(x => x.status === 'active').length
    return { total, active }
  }

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ── Studio tabs — switch between rooms running in parallel ──── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, padding: 5, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 12, width: 'fit-content' }}>
        {studios.map(s => {
          const isActive = s.id === activeId
          const { active, total } = studioCounts(s)
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: isActive ? '#fff' : 'transparent',
                color: isActive ? '#333333' : '#8C8C8C',
                fontFamily: FONT, fontSize: 13,
                fontWeight: isActive ? 700 : 600,
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
              }}
            >
              <House size={15} weight={isActive ? 'fill' : 'regular'} color={isActive ? PRIMARY : '#8C8C8C'} />
              <span>{s.name}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#8C8C8C', fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#23B870', display: 'inline-block' }} />
                {active}/{total}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Session header (no progress bar, cleaner two-column layout) ─
          Left: workout name + type badge + LIVE / coach · room
          Right: Elapsed and Phase compactly grouped */}
      <div style={{
        background: '#fff', border: '1px solid #dcdcdc',
        borderLeft: `4px solid ${t.color}`, borderRadius: 12,
        padding: '20px 24px', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#333333', letterSpacing: '-0.01em' }}>
              {studio.className}
            </h1>
            <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
              {t.label}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#23B870', color: '#fff', borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block', boxShadow: '0 0 0 0 rgba(255,255,255,0.7)', animation: 'live-pulse 1.6s ease-out infinite' }} />
              LIVE
            </span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: '#8C8C8C' }}>
            {studio.coach} · {studio.name}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <HeaderMeta label="Elapsed" primary={
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
              <Timer size={15} color="#8C8C8C" style={{ transform: 'translateY(2px)' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums' }}>{studio.elapsedTime}</span>
              <span style={{ fontSize: 12, color: '#8C8C8C' }}>/ {studio.totalDuration}</span>
            </span>
          } />
          <HeaderMeta label="Phase" primary={
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>{studio.currentPhase}</span>
          } />
        </div>

        <style>{`
          @keyframes live-pulse {
            0%   { box-shadow: 0 0 0 0   rgba(255,255,255,0.7); }
            70%  { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
            100% { box-shadow: 0 0 0 0   rgba(255,255,255,0); }
          }
        `}</style>
      </div>

      {/* Aggregate stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatBadge icon={Heart}    label="Avg Heart Rate" value={`${studio.aggregateStats.avgHR} bpm`} color="#ef4444" />
        <StatBadge icon={TrendUp}  label="Total Reps"     value={studio.aggregateStats.totalReps.toLocaleString()} color={PRIMARY} />
        <StatBadge icon={Barbell}  label="Total Weight"   value={`${studio.aggregateStats.totalKg.toLocaleString()} kg`} color="#8b5cf6" />
        <StatBadge icon={Trophy}   label="Top Performer"  value={studio.aggregateStats.topPerformer} color="#f59e0b" />
      </div>

      {/* Station grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333333', margin: 0 }}>Station Status</h2>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#8C8C8C' }}>
          {['active', 'inactive', 'empty'].map(k => (
            <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[k], display: 'inline-block' }} />
              {STATUS_LABEL[k]}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {studio.stations.map(st => {
          if (st.status === 'empty')    return <EmptyStationCard    key={st.id} st={st} />
          if (st.status === 'inactive') return <InactiveStationCard key={st.id} st={st} />
          return <OccupiedStationCard key={st.id} st={st} medalIdx={medalRank(st.id)} />
        })}
      </div>
    </div>
  )
}

function HeaderMeta({ label, primary }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
      {primary}
    </div>
  )
}

// Active station — full performance details (unchanged from original layout).
function OccupiedStationCard({ st, medalIdx }) {
  const borderColor = STATUS_COLOR.active
  return (
    <div style={{ background: '#fff', border: `2px solid ${borderColor}`, borderRadius: 10, padding: '12px 14px', position: 'relative' }}>
      {medalIdx != null && (
        <div title={['1st', '2nd', '3rd'][medalIdx]} style={{
          position: 'absolute', top: -8, right: -8,
          width: 24, height: 24, borderRadius: '50%',
          background: '#fff', border: `2px solid ${MEDAL_COLORS[medalIdx]}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}>
          <Medal size={14} weight="fill" color={MEDAL_COLORS[medalIdx]} />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C' }}>ST {st.id}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR.active, display: 'inline-block' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <User size={12} weight="fill" color={PRIMARY} />
        <div style={{ fontSize: 13, fontWeight: 700, color: '#333333' }}>{st.name}</div>
      </div>
      {st.reps !== undefined && <div style={{ fontSize: 12, color: PRIMARY, fontWeight: 600 }}>{st.reps} reps · {st.kg} kg</div>}
      {st.bpm !== undefined && <div style={{ fontSize: 11, color: '#8C8C8C' }}>HR: {st.bpm} bpm</div>}
    </div>
  )
}

// Inactive station — assigned trainee but they didn't show up.
// Same body layout as Active so the grid stays uniform; only colour
// and a small "No-show" hint differ.
function InactiveStationCard({ st }) {
  const c = STATUS_COLOR.inactive
  return (
    <div style={{ background: '#fff', border: `2px solid ${c}`, borderRadius: 10, padding: '12px 14px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C' }}>ST {st.id}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <User size={12} weight="fill" color={c} />
        <div style={{ fontSize: 13, fontWeight: 700, color: '#333333' }}>{st.name}</div>
      </div>
      <div style={{ fontSize: 10, color: c, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        No-show
      </div>
    </div>
  )
}

function EmptyStationCard({ st }) {
  return (
    <div style={{
      background: '#FAFBFD',
      border: '2px dashed #dcdcdc',
      borderRadius: 10, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 92,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C' }}>ST {st.id}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR.empty, display: 'inline-block' }} />
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '1.5px dashed #b9b9b9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 4,
      }}>
        <User size={14} color="#b9b9b9" />
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: '#b9b9b9' }}>Available</div>
    </div>
  )
}
