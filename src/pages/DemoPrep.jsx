import { useState, useEffect } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
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

const DEFAULT_ZONE_IDX = 0

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Ropes',
}

export default function DemoPrep({ onComplete, zoneIdx }) {
  const NEXT_ZONE = ZONES[zoneIdx ?? DEFAULT_ZONE_IDX]
  const [timer, setTimer] = useState(DEMO_DURATION_PER_EXERCISE)

  useEffect(() => {
    if (timer <= 0) {
      onComplete?.()
      return
    }
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer, onComplete])

  const color = NEXT_ZONE.color
  const grad = `linear-gradient(190deg, ${NEXT_ZONE.color}4D 0%, ${NEXT_ZONE.color}0D 100%)`

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Demo & Prep">
      <StudioHeader />

      {/* Right sidebar — Training structure */}
      <div className="absolute right-[51px] top-[142px]">
        <TrainingStructure color={NEXT_ZONE.color} />
      </div>

      {/* Main content area */}
      <div className="absolute flex gap-[36px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column: UP NEXT + ring, zone card, device card */}
        <div className="flex flex-col gap-[36px] shrink-0" style={{ width: 420 }}>

          {/* Top card: UP NEXT + ring */}
          <div
            className="flex flex-col gap-[28px] items-center rounded-[36px] flex-1 min-h-0"
            style={{ padding: 24, background: grad }}
          >
            <div
              className="flex items-center gap-[14px] w-full rounded-[20px]"
              style={{ background: color, padding: '16px 24px' }}
            >
              <ArrowRight size={30} color="white" weight="bold" />
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 28, lineHeight: '38px' }}>
                UP NEXT
              </span>
            </div>
            <div className="flex items-center justify-center flex-1 min-h-0">
              <CountdownRing
                size={270}
                value={timer}
                max={DEMO_DURATION_PER_EXERCISE}
                label=""
                color={color}
                trackColor="white"
                danger={true}
              />
            </div>
          </div>

          {/* Zone card */}
          <div
            className="flex flex-col gap-[12px] rounded-[36px] shrink-0"
            style={{
              padding: 32,
              borderBottom: '8px solid ' + color,
              background: grad + ', #fff',
            }}
          >
            <div style={{ borderBottom: '1px solid ' + color, paddingBottom: 8 }}>
              <span className="font-poppins font-semibold uppercase tracking-widest" style={{ fontSize: 18, color }}>
                Zone {NEXT_ZONE.id}
              </span>
            </div>
            <span className="font-poppins font-bold text-black" style={{ fontSize: 36, lineHeight: '46px' }}>
              {NEXT_ZONE.label}
            </span>
            <span className="font-poppins text-black" style={{ fontSize: 18, lineHeight: '28px', fontWeight: 300 }}>
              {NEXT_ZONE.desc}
            </span>
          </div>


        </div>

        {/* Video — exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[48px] pointer-events-none">
            <p className="font-poppins font-normal text-[19px] text-white/60 uppercase tracking-widest">WORK</p>
            <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{EXERCISE.name}</p>
          </div>
          <VideoPlayer src={EXERCISE.video} />
        </div>

      </div>
    </div>
    </ScaledFrame>
  )
}
