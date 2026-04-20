import { useState, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { REST_DURATION } from '../data/config'
import StageBackground from '../components/StageBackground'

const NEXT_VIDEO_URL =
  'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8'

const NEXT_EXERCISE = { name: 'Standing Wide Row', sets: 3, reps: 12, zone: 2 }

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

  const GRAD = `linear-gradient(180deg, color-mix(in srgb, ${zone.color} 60%, transparent) 0%, color-mix(in srgb, ${zone.color} 30%, transparent) 100%)`

  return (
    <ScaledFrame>
    <StageBackground variant="light">
    <div style={{ position: 'absolute', inset: 0, zIndex: 5 }} data-name="Studio Dashboard — In Rest">

      {/* Right sidebar — Training structure (narrower) */}
      <div className="absolute left-[1590px] top-[142px]">
        <TrainingStructure width={280} />
      </div>

      {/* Main content area */}
      <div className="absolute flex flex-col gap-[24px] left-[51px] top-[142px] w-[1510px] h-[882px]">

        {/* Bottom row: left column + video */}
        <div className="flex gap-[24px] flex-1 min-h-0">

          <div className="flex flex-col gap-[24px] w-[500px] shrink-0">
            {/* Circular countdown timer — enlarged */}
            <div
              className="flex items-center justify-center p-[24px] rounded-[16px] flex-1"
              style={{ background: GRAD }}
            >
              <CountdownRing
                size={420}
                value={timer}
                max={REST_DURATION}
                label="REST"
                color="#43a77c"
                trackColor="white"
                danger
              />
            </div>

            {/* Sets × Reps card */}
            <div className="bg-white border border-[#e5e5e5] flex items-center justify-between px-[32px] py-[24px] rounded-[16px] shrink-0">
              <div className="flex flex-col gap-[4px]">
                <p className="font-poppins font-normal text-[14px] text-black/40 uppercase tracking-widest">Sets × Reps</p>
                <p className="font-poppins font-bold text-[40px] leading-none text-black">
                  {NEXT_EXERCISE.sets} × {NEXT_EXERCISE.reps}
                </p>
              </div>
            </div>

            {/* Zone card — block-card style */}
            <div
              className="flex flex-col gap-[12px] rounded-[16px] px-[32px] py-[28px] shrink-0"
              style={{
                background: `${GRAD}, #fff`,
                borderBottom: `8px solid ${zone.color}`,
              }}
            >
              <div style={{ borderBottom: `1px solid ${zone.color}`, paddingBottom: 8 }}>
                <span
                  className="font-poppins font-semibold text-[16px] uppercase tracking-widest"
                  style={{ color: zone.color }}
                >
                  Zone {zone.id}
                </span>
              </div>
              <p className="font-poppins font-normal text-[17px] leading-relaxed text-black/60">
                {zone.desc}
              </p>
            </div>
          </div>

          {/* Video with overlay */}
          <div className="relative flex-[1_0_0] min-w-px overflow-hidden bg-[#f8f7f7]" style={{ borderRadius: '36px 18px 36px 36px' }}>
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[32px] pointer-events-none">
              <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest">Up Next</p>
              <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{NEXT_EXERCISE.name}</p>
            </div>
            <VideoPlayer src={NEXT_VIDEO_URL} />
          </div>

        </div>
      </div>
    </div>
    </StageBackground>
    </ScaledFrame>
  )
}
