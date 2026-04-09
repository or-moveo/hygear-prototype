import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import ScaledFrame from '../components/ScaledFrame'

const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png"

const NEXT_VIDEO_URL =
  'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8'

const ZONES = [
  { id: 1, label: 'BASE',  hebrew: 'בסיס',  color: '#0ea5e9', bg: '#e0f2fe', desc: 'Light & easy. Full range of motion. No fatigue.' },
  { id: 2, label: 'FLOW',  hebrew: 'זרימה', color: '#22c55e', bg: '#dcfce7', desc: 'Moderate. Controlled. Sustainable for the full set.' },
  { id: 3, label: 'BUILD', hebrew: 'בנייה', color: '#eab308', bg: '#fef9c3', desc: 'Challenging. Muscle burning. Technique stays solid.' },
  { id: 4, label: 'PRIME', hebrew: 'פריים', color: '#f97316', bg: '#ffedd5', desc: 'Very hard. 2–3 reps in the tank. Full muscle engagement.' },
  { id: 5, label: 'PEAK',  hebrew: 'שיא',   color: '#ef4444', bg: '#fee2e2', desc: 'Max effort. Muscle failure. All or nothing.' },
]

const NEXT_EXERCISE = {
  name: 'Narrow Grip Chest Press',
  sets: 3,
  reps: 12,
  zone: 3,
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover rounded-[16px]"
      muted
      loop
      playsInline
      autoPlay
    />
  )
}

export default function InRest() {
  const zone = ZONES[NEXT_EXERCISE.zone - 1]

  return (
    <ScaledFrame>
    <div className="bg-[#0f1117] relative size-full" data-name="Studio Dashboard — In Rest">

      {/* Header */}
      <div className="absolute flex items-center left-[50px] top-[40px]">
        <img alt="" className="h-[40px] w-auto mr-[14px]" src={imgHabeastsByHygearLogo21} />
        <p className="font-poppins font-semibold text-[32px] text-white whitespace-nowrap">Studio name</p>
      </div>

      {/* ── Main layout: three columns ── */}
      <div className="absolute flex gap-[28px] left-[50px] right-[50px] top-[120px] bottom-[40px]">

        {/* Col 1 — Training Structure */}
        <div className="bg-[#1a1d26] border border-white/10 flex flex-col gap-[14px] p-[28px] rounded-[20px] w-[280px] shrink-0">
          <p className="font-poppins font-bold text-[20px] text-white mb-[4px]">Training structure</p>
          {[
            { label: 'Warm-up',   duration: '5 Min',  state: 'done' },
            { label: 'REST',      duration: '0:15',   state: 'active' },
            { label: 'Block 1',   duration: '18 Min', state: 'next' },
            { label: 'Block 2',   duration: '18 Min', state: 'upcoming' },
            { label: 'Cool-down', duration: '5 Min',  state: 'upcoming' },
          ].map((item) => {
            const styles = {
              done:     'bg-white/5 text-white/35',
              active:   'bg-[#758db2] text-white',
              next:     'bg-[#43a77c] text-white',
              upcoming: 'bg-white/5 text-white/60',
            }
            return (
              <div key={item.label} className={`flex items-center justify-between px-[16px] py-[12px] rounded-[10px] ${styles[item.state]}`}>
                <p className={`font-poppins font-semibold text-[16px] ${item.state === 'done' ? 'line-through' : ''}`}>{item.label}</p>
                <p className="font-poppins font-normal text-[14px] opacity-80">{item.duration}</p>
              </div>
            )
          })}
        </div>

        {/* Col 2 — Video */}
        <div className="flex-[1_0_0] min-w-0 relative rounded-[20px] overflow-hidden bg-black">
          <VideoPlayer src={NEXT_VIDEO_URL} />
          {/* Exercise label overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-[28px] py-[24px]">
            <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest mb-[4px]">Next Exercise</p>
            <p className="font-poppins font-bold text-[32px] text-white">{NEXT_EXERCISE.name}</p>
          </div>
        </div>

        {/* Col 3 — Timer + Goal + Zone */}
        <div className="flex flex-col gap-[24px] w-[380px] shrink-0">

          {/* REST Countdown */}
          <div className="bg-[#1a1d26] border border-white/10 flex flex-col items-center justify-center rounded-[20px] py-[40px] gap-[8px]">
            <p className="font-poppins font-semibold text-[16px] text-white/50 uppercase tracking-widest">Rest ends in</p>
            <p className="font-poppins font-bold text-white" style={{ fontSize: '120px', lineHeight: '1', letterSpacing: '-0.04em' }}>0:15</p>
            <p className="font-poppins font-medium text-[18px] text-white/40 uppercase tracking-widest">REST</p>
          </div>

          {/* Goal */}
          <div className="bg-[#1a1d26] border border-white/10 flex flex-col gap-[16px] p-[28px] rounded-[20px]">
            <p className="font-poppins font-semibold text-[16px] text-white/50 uppercase tracking-widest">Goal</p>
            <div className="flex items-center justify-between">
              <p className="font-poppins font-bold text-[28px] text-white">{NEXT_EXERCISE.sets} × {NEXT_EXERCISE.reps}</p>
              <p className="font-poppins text-[18px] text-white/50">Sets × Reps</p>
            </div>
          </div>

          {/* Zone */}
          <div
            className="flex flex-col gap-[12px] p-[28px] rounded-[20px] flex-1"
            style={{ background: zone.bg, border: `2px solid ${zone.color}` }}
          >
            <div className="flex items-center gap-[12px]">
              <div className="w-[14px] h-[14px] rounded-full shrink-0" style={{ background: zone.color }} />
              <p className="font-poppins font-bold text-[13px] uppercase tracking-widest" style={{ color: zone.color }}>
                Zone {zone.id}
              </p>
            </div>
            <div className="flex items-baseline gap-[10px]">
              <p className="font-poppins font-bold text-[42px] leading-none text-gray-900">{zone.label}</p>
              <p className="font-poppins font-semibold text-[24px] text-gray-500">{zone.hebrew}</p>
            </div>
            <p className="font-poppins font-normal text-[16px] text-gray-700 leading-snug">{zone.desc}</p>
          </div>

        </div>
      </div>

    </div>
    </ScaledFrame>
  )
}
