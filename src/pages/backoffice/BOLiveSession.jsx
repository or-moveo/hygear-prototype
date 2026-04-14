import { Timer, TrendUp, Trophy, Heart, Barbell, Users } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import StatCard from '../../components/backoffice/StatCard'
import BOStationCard from '../../components/backoffice/BOStationCard'
import CountdownRing from '../../components/CountdownRing'
import { liveSessionData } from '../../data/backoffice'

export default function BOLiveSession() {
  const { className, coach, room, elapsedTime, totalDuration, overallProgress, currentPhase, aggregateStats, stations } = liveSessionData

  const sidebarContent = (
    <div className="flex flex-col gap-4">
      <StatCard icon={Heart} label="Avg Heart Rate" value={aggregateStats.avgHR} sublabel="bpm" color="#ef4444" />
      <StatCard icon={TrendUp} label="Total Reps" value={aggregateStats.totalReps.toLocaleString()} color="#43a77c" />
      <StatCard icon={Barbell} label="Total Weight" value={`${aggregateStats.totalKg.toLocaleString()} kg`} color="#8b5cf6" />
      <StatCard icon={Trophy} label="Top Performer" value={aggregateStats.topPerformer} color="#f59e0b" />
    </div>
  )

  return (
    <BOPageLayout title={className + ' — Live'} sidebar={sidebarContent}>
      {/* Session status bar */}
      <div
        className="text-[#1e293b] px-8 py-4 flex items-center gap-6"
        style={{
          background: 'linear-gradient(191deg, #3A86FF4D 0%, #3A86FF0D 100%), #fff',
          borderBottom: '6px solid #3A86FF',
          borderRadius: 36,
        }}
      >
        {/* Timer */}
        <div className="flex items-center gap-2">
          <Timer size={20} weight="bold" className="text-[#3A86FF]" />
          <span className="font-bold text-2xl tabular-nums">{elapsedTime}</span>
          <span className="text-[#64748b] text-lg">/ {totalDuration}</span>
        </div>

        {/* Phase badge */}
        <div className="flex-1 flex justify-center">
          <span className="bg-[#43a77c] text-white text-sm font-semibold px-6 py-2 rounded-full">
            {currentPhase}
          </span>
        </div>

        {/* Overall progress */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#64748b]">Progress</span>
          <CountdownRing
            size={48}
            value={overallProgress}
            max={100}
            formatValue={(v) => `${Math.round(v)}%`}
            color="#3A86FF"
            trackColor="rgba(58,134,255,0.15)"
            textColor="#1e293b"
          />
        </div>
      </div>

      {/* Station grid */}
      <div className="py-5">
        <div className="grid grid-cols-5 gap-4">
          {stations.map(station => (
            <BOStationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </BOPageLayout>
  )
}
