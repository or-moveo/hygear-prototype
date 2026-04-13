import { Trophy, Medal, CloudArrowUp, Bell, Export, CheckCircle, SpinnerGap, XCircle } from '@phosphor-icons/react'
import StudioHeader from '../../components/StudioHeader'
import StatCard from '../../components/backoffice/StatCard'
import { postSessionData } from '../../data/backoffice'
import { Heart, Users, Barbell, Target } from '@phosphor-icons/react'

const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#cd7f32']
const UPLOAD_ICONS = {
  synced: { icon: CheckCircle, color: '#43a77c' },
  pending: { icon: SpinnerGap, color: '#f59e0b' },
  failed: { icon: XCircle, color: '#ef4444' },
}

export default function BOPostSession() {
  const { leaderboard, aggregateStats, notifications, bigqueryStatus } = postSessionData

  return (
    <div className="min-h-screen bg-[#f2f2f5] font-poppins">
      <StudioHeader name="Post-Session Summary" variant="fluid" />

      <div className="px-6 py-6">
        {/* Hero summary banner */}
        <div
          className="flex items-center justify-between px-8 py-5 mb-6"
          style={{ background: 'linear-gradient(79.86deg, #435a97 0%, #6685cd 100%)', borderRadius: 24 }}
        >
          <div className="flex flex-col gap-1">
            <p className="font-poppins font-normal text-sm text-white/60 uppercase tracking-widest">Session Complete</p>
            <p className="font-poppins font-bold text-2xl text-white">Post-Session Summary</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-poppins font-medium text-sm text-white/80 px-5 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)' }}>
              {leaderboard.length} Participants
            </span>
            <span className="font-poppins font-medium text-sm text-white/80 px-5 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Heart} label="Class Avg HR" value={aggregateStats.classAvgHR} color="#ef4444" />
          <StatCard icon={Barbell} label="Total Weight Moved" value={aggregateStats.totalWeightMoved} color="#8b5cf6" />
          <StatCard icon={Target} label="Avg Completion" value={`${aggregateStats.avgCompletion}%`} color="#43a77c" />
          <StatCard icon={Users} label="Participants" value={leaderboard.length} color="#6685cd" />
        </div>

        {/* Leaderboard */}
        <h2 className="font-bold text-lg text-[#334367] mb-3">Leaderboard</h2>
        <div className="overflow-hidden mb-6" style={{ borderRadius: 24, background: '#fff' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white font-semibold" style={{ background: 'linear-gradient(79.86deg, #435a97 0%, #6685cd 100%)' }}>
                <th className="px-4 py-3 w-16 text-center">Rank</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3 text-center">Total Reps</th>
                <th className="px-4 py-3 text-center">Total KG</th>
                <th className="px-4 py-3 text-center">Calories</th>
                <th className="px-4 py-3 text-center">Completion</th>
                <th className="px-4 py-3 text-center">Upload</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((p, i) => {
                const upload = UPLOAD_ICONS[p.uploadStatus]
                const UploadIcon = upload.icon
                return (
                  <tr key={p.rank} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-2.5 text-center">
                      {i < 3 ? (
                        <Medal size={20} weight="fill" color={MEDAL_COLORS[i]} className="inline-block" />
                      ) : (
                        <span className="text-gray-400">{p.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-[#334367]">{p.name}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-[#334367]">{p.score}</td>
                    <td className="px-4 py-2.5 text-center text-gray-600">{p.totalReps}</td>
                    <td className="px-4 py-2.5 text-center text-gray-600">{p.totalKg.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-center text-gray-600">{p.calories}</td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-[#43a77c] rounded-full" style={{ width: `${p.completionPct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{p.completionPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <UploadIcon size={18} weight={p.uploadStatus === 'pending' ? 'bold' : 'fill'} color={upload.color} className={p.uploadStatus === 'pending' ? 'animate-spin inline-block' : 'inline-block'} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Notifications */}
          <div className="p-6" style={{ borderRadius: 24, background: '#fff' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} weight="bold" className="text-[#334367]" />
              <h3 className="font-semibold text-[#334367]">Push Notifications</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Sent</span>
                  <span className="font-semibold text-[#334367]">{notifications.sent}/{notifications.sent + notifications.pending}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-[#43a77c] rounded-full transition-all"
                    style={{ width: `${(notifications.sent / (notifications.sent + notifications.pending)) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-yellow-600 font-semibold">{notifications.pending} pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
