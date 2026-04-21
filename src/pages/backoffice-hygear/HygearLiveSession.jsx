import { Timer, TrendUp, Trophy, Heart, Barbell } from '@phosphor-icons/react'
import { liveSessionData } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

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
  const { className, coach, room, elapsedTime, totalDuration, overallProgress, currentPhase, aggregateStats, stations } = liveSessionData

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Session banner */}
      <div style={{ background: '#fff', border: `2px solid ${PRIMARY}`, borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>{className}</div>
            <div style={{ fontSize: 13, color: '#8C8C8C' }}>{coach} · {room}</div>
          </div>
          <span style={{ background: '#23B870', color: '#fff', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700 }}>● LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Timer size={18} color={PRIMARY} weight="bold" />
              <span style={{ fontSize: 24, fontWeight: 700, color: '#333333', fontVariantNumeric: 'tabular-nums' }}>{elapsedTime}</span>
              <span style={{ color: '#8C8C8C' }}>/ {totalDuration}</span>
            </div>
            <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Elapsed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: PRIMARY }}>{currentPhase}</div>
            <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Phase</div>
          </div>
          {/* Progress bar */}
          <div style={{ width: 160 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: '#8C8C8C' }}>
              <span>Progress</span><span style={{ fontWeight: 700, color: PRIMARY }}>{overallProgress}%</span>
            </div>
            <div style={{ height: 8, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${overallProgress}%`, background: PRIMARY, borderRadius: 999, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatBadge icon={Heart} label="Avg Heart Rate" value={`${aggregateStats.avgHR} bpm`} color="#ef4444" />
        <StatBadge icon={TrendUp} label="Total Reps" value={aggregateStats.totalReps.toLocaleString()} color={PRIMARY} />
        <StatBadge icon={Barbell} label="Total Weight" value={`${aggregateStats.totalKg.toLocaleString()} kg`} color="#8b5cf6" />
        <StatBadge icon={Trophy} label="Top Performer" value={aggregateStats.topPerformer} color="#f59e0b" />
      </div>

      {/* Station grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333333', margin: 0 }}>Station Status</h2>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#8C8C8C' }}>
          {[['#23B870', 'Active'], ['#f59e0b', 'Rest'], ['#dcdcdc', 'Empty']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {stations.map(st => (
          <div key={st.id} style={{ background: '#fff', border: `2px solid ${st.status === 'active' ? PRIMARY : st.status === 'resting' ? '#f59e0b' : '#dcdcdc'}`, borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C' }}>ST {st.id}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: st.status === 'active' ? '#23B870' : st.status === 'resting' ? '#f59e0b' : '#dcdcdc', display: 'inline-block' }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#333333' }}>{st.name}</div>
            {st.reps !== undefined && <div style={{ fontSize: 12, color: PRIMARY, fontWeight: 600, marginTop: 4 }}>{st.reps} reps</div>}
            {st.bpm !== undefined && <div style={{ fontSize: 11, color: '#8C8C8C' }}>HR: {st.bpm} bpm</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
