import { Trophy, Medal, Bell, CheckCircle, XCircle } from '@phosphor-icons/react'
import { Heart, Users, Barbell, Target } from '@phosphor-icons/react'
import { postSessionData } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#cd7f32']

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
  const { leaderboard, aggregateStats, notifications } = postSessionData

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Summary banner */}
      <div style={{ background: '#fff', border: `2px solid ${PRIMARY}`, borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Session Complete</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#333333' }}>Post-Session Summary</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[`${leaderboard.length} Participants`, new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })].map(t => (
            <span key={t} style={{ background: PRIMARY + '18', color: PRIMARY, border: `1px solid ${PRIMARY}40`, borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard icon={Heart} label="Avg Heart Rate" value={aggregateStats.classAvgHR} color="#ef4444" />
        <StatCard icon={Barbell} label="Total Weight" value={aggregateStats.totalWeightMoved} color="#8b5cf6" />
        <StatCard icon={Target} label="Avg Completion" value={`${aggregateStats.avgCompletion}%`} color={PRIMARY} />
        <StatCard icon={Users} label="Participants" value={leaderboard.length} color="#5389f3" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Leaderboard */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333333', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={18} color="#f59e0b" weight="fill" /> Leaderboard
          </h2>
          <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: FONT }}>
              <thead>
                <tr style={{ background: PRIMARY }}>
                  {['Rank', 'Name', 'Score', 'Reps', 'Weight', 'Completion', 'Upload'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: h === 'Name' ? 'left' : 'center', fontWeight: 600, color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((p, i) => (
                  <tr key={p.rank} style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD' }}>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                      {i < 3 ? <Medal size={18} weight="fill" color={MEDAL_COLORS[i]} /> : <span style={{ color: '#8C8C8C' }}>{p.rank}</span>}
                    </td>
                    <td style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', fontWeight: 600, color: '#333333' }}>{p.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', fontWeight: 700, color: '#333333' }}>{p.score}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>{p.totalReps}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>{p.totalKg} kg</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <div style={{ width: 60, height: 6, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${p.completionPct}%`, background: PRIMARY, borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#8C8C8C' }}>{p.completionPct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                      {p.uploadStatus === 'synced' ? <CheckCircle size={16} weight="fill" color="#23B870" /> : p.uploadStatus === 'failed' ? <XCircle size={16} weight="fill" color="#ef4444" /> : <span style={{ fontSize: 11, color: '#f59e0b' }}>Pending</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications sidebar */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333333', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={18} color={PRIMARY} weight="fill" /> Notifications
          </h2>
          <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, color: '#8C8C8C', marginBottom: 12 }}>Push notifications sent to participants</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#333333', fontWeight: 500, fontFamily: FONT }}>Sent</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#23B870', fontFamily: FONT }}>{notifications.sent}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#333333', fontWeight: 500, fontFamily: FONT }}>Pending</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', fontFamily: FONT }}>{notifications.pending}</span>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: '#8C8C8C', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery rate</span>
                <span style={{ fontWeight: 700, color: PRIMARY }}>{Math.round((notifications.sent / (notifications.sent + notifications.pending)) * 100)}%</span>
              </div>
              <div style={{ height: 8, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(notifications.sent / (notifications.sent + notifications.pending)) * 100}%`, background: PRIMARY, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
