import { useState, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { Flame, ClipboardText, Coffee, Barbell, Anchor, Lightning, Snowflake } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { REST_DURATION } from '../data/config'
import StudioHeader from '../components/StudioHeader'

const NEXT_VIDEO_URL =
  'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8'

const NEXT_EXERCISE = { name: 'Narrow Grip Chest Press', sets: 3, reps: 12, zone: 3 }

function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}))
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])
  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      muted loop playsInline autoPlay
    />
  )
}

export default function InRest() {
  const zone = ZONES[NEXT_EXERCISE.zone - 1]
  const [timer, setTimer] = useState(REST_DURATION)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  const SIDEBAR_ITEMS = [
    { label: 'Warm-up',           icon: Flame,          duration: '5 Min',                        state: 'done' },
    { label: 'Demo & Prep',       icon: ClipboardText,  duration: '30s',                          state: 'done' },
    { label: 'REST',              icon: Coffee,         duration: `0:${String(timer).padStart(2,'0')}`, state: 'active' },
    { label: 'Strength Dynamic',  icon: Barbell,        duration: '18 Min',                       state: 'next' },
    { label: 'Holds Isometric',   icon: Anchor,         duration: '18 Min',                       state: 'upcoming' },
    { label: 'Finisher',          icon: Lightning,      duration: '5 Min',                        state: 'upcoming' },
    { label: 'Cool-down',         icon: Snowflake,      duration: '5 Min',                        state: 'upcoming' },
  ]

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — In Rest">
      {/* Header */}
      <StudioHeader />

      {/* Right sidebar — Training structure */}
      <div className="absolute left-[1500px] top-[142px]">
        <TrainingStructure />
      </div>

      {/* Main content area */}
      <div className="absolute flex flex-col gap-[24px] left-[51px] top-[142px] w-[1420px] h-[882px]">

        {/* Next Exercise banner */}
        <div className="bg-[#334367] content-stretch flex items-center justify-between px-[40px] py-[28px] rounded-[16px] shrink-0">
          <div className="flex flex-col gap-[4px]">
            <p className="font-poppins font-normal text-[16px] text-white/50 uppercase tracking-widest">Next Exercise</p>
            <p className="font-poppins font-bold text-[48px] leading-none text-white">{NEXT_EXERCISE.name}</p>
          </div>
          <div className="flex items-center gap-[32px]">
            <div className="flex flex-col items-center gap-[2px]">
              <p className="font-poppins font-bold text-[40px] leading-none text-white">{NEXT_EXERCISE.sets} × {NEXT_EXERCISE.reps}</p>
              <p className="font-poppins font-normal text-[16px] text-white/50">Sets × Reps</p>
            </div>
            <div className="flex items-center gap-[10px] px-[24px] py-[12px] rounded-full" style={{ background: zone.bg }}>
              <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: zone.color }} />
              <p className="font-poppins font-bold text-[20px]" style={{ color: zone.text }}>
                Zone {zone.id} · {zone.label}
              </p>
              <p className="font-poppins font-semibold text-[18px]" style={{ color: zone.text, opacity: 0.6 }}>{zone.hebrew}</p>
            </div>
          </div>
        </div>

        {/* Bottom row: left column + video */}
        <div className="flex gap-[24px] flex-1 min-h-0">

          <div className="flex flex-col gap-[24px] w-[420px] shrink-0">
            {/* Circular countdown timer */}
            <div className="content-stretch flex items-center justify-center p-[36px] relative rounded-[16px] flex-1" style={{ background: 'linear-gradient(to bottom, #c8def5, #ffffff)' }}>
              <CountdownRing
                size={280}
                value={timer}
                max={REST_DURATION}
                label="REST"
                color="#43a77c"
                trackColor="white"
                danger
              />
            </div>

            {/* Zone description card */}
            <div
              className="content-stretch flex flex-col justify-between rounded-[16px] p-[32px] shrink-0"
              style={{ background: zone.bg, minHeight: '200px' }}
            >
              <div className="flex items-center gap-[10px] mb-[12px]">
                <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: zone.color }} />
                <p className="font-poppins font-bold text-[12px] uppercase tracking-widest" style={{ color: zone.color }}>
                  Zone {zone.id} — {zone.label}
                </p>
              </div>
              <p className="font-poppins font-normal text-[17px] leading-relaxed" style={{ color: zone.text, opacity: 0.85 }}>
                {zone.desc}
              </p>
            </div>
          </div>

          <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
            <VideoPlayer src={NEXT_VIDEO_URL} />
          </div>

        </div>
      </div>
    </div>
    </ScaledFrame>
  )
}
