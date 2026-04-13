import { Timer, TrendUp, Trophy, Heart, Barbell, Users } from '@phosphor-icons/react'
import StudioHeader from '../../components/StudioHeader'
import StatCard from '../../components/backoffice/StatCard'
import BOStationCard from '../../components/backoffice/BOStationCard'
import CountdownRing from '../../components/CountdownRing'
import { liveSessionData } from '../../data/backoffice'

export default function BOLiveSession() {
  const { className, coach, room, elapsedTime, totalDuration, overallProgress, currentPhase, aggregateStats, stations } = liveSessionData

  return (
    <div className="min-h-screen bg-[#f2f2f5] font-poppins">
      <StudioHeader name={`${className} — Live`} variant="fluid" />

      {/* Session status bar */}
      <div
        className="text-white px-8 py-4 flex items-center gap-6 mx-6 mt-4"
        style={{ background: 'linear-gradient(79.86deg, #435a97 0%, #6685cd 100%)', borderRadius: 24 }}
      >
        {/* Timer */}
        <div className="flex items-center gap-2">
          <Timer size={20} weight="bold" className="text-white/60" />
          <span className="font-bold text-2xl tabular-nums">{elapsedTime}</span>
          <span className="text-white/40 text-lg">/ {totalDuration}</span>
        </div>

        {/* Phase badge */}
        <div className="flex-1 flex justify-center">
          <span className="bg-[#43a77c] text-white text-sm font-semibold px-6 py-2 rounded-full">
            {currentPhase}
          </span>
        </div>

        {/* Overall progress */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60">Progress</span>
          <CountdownRing
            size={48}
            value={overallProgress}
            max={100}
            formatValue={(v) => `${Math.round(v)}%`}
            color="#43a77c"
            trackColor="rgba(255,255,255,0.15)"
            textColor="white"
          />
        </div>
      </div>

      {/* Station grid */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {stations.map(station => (
            <BOStationCard key={station.id} station={station} />
          ))}
        </div>
      </div>

      {/* Aggregate stats bar */}
      <div
        className="mx-6 mb-6 px-6 py-5"
        style={{
          background: 'linear-gradient(252.16deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)',
          borderRadius: 24,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Heart} label="Avg Heart Rate" value={aggregateStats.avgHR} sublabel="bpm" color="#ef4444" />
          <StatCard icon={TrendUp} label="Total Reps" value={aggregateStats.totalReps.toLocaleString()} color="#43a77c" />
          <StatCard icon={Barbell} label="Total Weight" value={`${aggregateStats.totalKg.toLocaleString()} kg`} color="#8b5cf6" />
          <StatCard icon={Trophy} label="Top Performer" value={aggregateStats.topPerformer} color="#f59e0b" />
        </div>
      </div>
    </div>
  )
}
