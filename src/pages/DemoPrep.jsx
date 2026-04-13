import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import StudioHeader from '../components/StudioHeader'
import { ZONES } from '../data/zones'
import { DEMO_DURATION_PER_EXERCISE } from '../data/config'

const EXERCISE = {
  name: 'Arm Circles',
  video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8',
}

const NEXT_ZONE = ZONES[0] // Zone 1 — BASE

export default function DemoPrep({ onComplete }) {
  const [timer, setTimer] = useState(DEMO_DURATION_PER_EXERCISE)

  useEffect(() => {
    if (timer <= 0) {
      onComplete?.()
      return
    }
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer, onComplete])

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Demo & Prep">
      {/* Header */}
      <StudioHeader />

      {/* Right sidebar — Training structure */}
      <div className="absolute right-[51px] top-[142px]">
        <TrainingStructure />
      </div>

      {/* Main content area (left of sidebar) */}
      <div className="absolute flex gap-[24px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column: countdown ring + zone card */}
        <div className="flex flex-col gap-[24px] w-[420px] shrink-0">

          {/* Countdown ring */}
          <div className="flex items-center justify-center p-[36px] rounded-[16px] flex-1" style={{ background: 'linear-gradient(to bottom, #c8def5, #ffffff)' }}>
            <CountdownRing
              size={280}
              value={timer}
              max={DEMO_DURATION_PER_EXERCISE}
              label=""
              color="#43a77c"
              trackColor="white"
              danger={true}
            />
          </div>

          {/* Zone card */}
          <div
            className="flex flex-col gap-[12px] px-[32px] py-[28px] rounded-[16px] shrink-0"
            style={{
              background: `linear-gradient(205deg, ${NEXT_ZONE.color}40 0%, ${NEXT_ZONE.color}0D 100%), #fff`,
              borderBottom: `8px solid ${NEXT_ZONE.color}`,
            }}
          >
            <div style={{ borderBottom: `1px solid ${NEXT_ZONE.color}`, paddingBottom: 8 }}>
              <span className="font-poppins font-semibold text-[16px] uppercase tracking-widest" style={{ color: NEXT_ZONE.color }}>
                Zone {NEXT_ZONE.id}
              </span>
            </div>
            <p className="font-poppins font-bold text-[40px] leading-none text-black">{NEXT_ZONE.label}</p>
            <p className="font-poppins text-[16px] text-black/50">{NEXT_ZONE.desc}</p>
          </div>

        </div>

        {/* Video — full height, exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[32px] pointer-events-none">
            <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest">UP NEXT</p>
            <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{EXERCISE.name}</p>
          </div>
          <VideoPlayer src={EXERCISE.video} />
        </div>

      </div>
    </div>
    </ScaledFrame>
  )
}
