import { useState, useEffect } from 'react'
import { Barbell } from '@phosphor-icons/react'
import TrainingStructure from '../components/TrainingStructure'
import { ZONES } from '../data/zones'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'

const NEXT_BLOCK = {
  number: 4,
  label: 'All Out',
  icon: '/assets/thermo-allout.svg',
  color: '#F5365C',
  duration: '15 Minutes',
}

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Ropes',
  image: '/assets/rope.png',
}

const EXERCISES = [
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 2, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
]

const REST_SECONDS = 30

export default function BlockPreview({ zoneIdx }) {
  const zone = ZONES[zoneIdx ?? 0]
  const COLOR = zone.color
  // Match the block-card gradient from High Level (1. High Level) exactly
  const GRAD = `linear-gradient(180deg, color-mix(in srgb, ${COLOR} 60%, transparent) 0%, color-mix(in srgb, ${COLOR} 30%, transparent) 100%)`

  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <StageBackground>
        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

        {/* Timer ring — top-left */}
        <div
          className="absolute flex items-center justify-center rounded-[36px]"
          style={{ left: 50, top: 142, width: 450, height: 350, background: GRAD }}
        >
          <CountdownRing
            size={280}
            value={timer}
            max={REST_SECONDS}
            label="REST"
            color={COLOR}
            textColor="white"
            trackColor="white"
          />
        </div>

        {/* Next Block card — bottom-left */}
        <div
          className="absolute flex flex-col justify-between rounded-[36px]"
          style={{
            left: 50, top: 528,
            width: 450, height: 502,
            padding: 36,
            borderBottom: '8px solid ' + COLOR,
            background: GRAD + ', #fff',
          }}
        >
          <div className="flex flex-col gap-[36px]">
            <div style={{ borderBottom: '1px solid ' + COLOR, paddingBottom: 8 }}>
              <span className="font-poppins font-semibold" style={{ fontSize: 24, lineHeight: '34px', color: COLOR }}>
                NEXT BLOCK:&nbsp;&nbsp;{NEXT_BLOCK.number}
              </span>
            </div>
            <div style={{ width: 88, height: 88, borderRadius: 16, background: COLOR, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 88, height: 88 }}>
                <path d="M37.5714 17L35.2857 28.4286L44.4286 31.8571L28.4286 49L30.7143 37.5714L21.5714 34.1429L37.5714 17Z" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-poppins font-semibold text-black" style={{ fontSize: 36, lineHeight: '46px' }}>
              {NEXT_BLOCK.label}
            </span>
          </div>
          <div
            className="flex items-center justify-center w-full"
            style={{ background: COLOR, borderRadius: 999, padding: '8px 24px' }}
          >
            <span className="font-poppins font-medium text-white" style={{ fontSize: 18, lineHeight: '28px' }}>
              {NEXT_BLOCK.duration}
            </span>
          </div>
        </div>

        {/* Next Gear To Use — center (widened since right panel is now narrower) */}
        <div
          className="absolute flex flex-col gap-[36px] rounded-[36px]"
          style={{ left: 536, top: 142, width: 900, height: 888, padding: 36, background: GRAD }}
        >
          <div className="flex items-center gap-[16px]">
            <Barbell size={32} />
            <span className="font-poppins font-semibold text-black" style={{ fontSize: 46, lineHeight: '46px' }}>
              Next Gear To Use
            </span>
          </div>
          <div className="flex flex-col gap-[16px] flex-1 justify-end min-h-0">
            <div
              className="flex flex-col gap-[8px] items-start justify-center rounded-[24px] w-full"
              style={{ background: COLOR, padding: 36 }}
            >
              <span className="font-poppins text-white" style={{ fontSize: 28, lineHeight: '38px' }}>{GEAR.deviceName}</span>
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>{GEAR.deviceLabel}</span>
            </div>
            <div
              className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1 min-h-0"
              style={{ background: 'white' }}
            >
              <img src={GEAR.image} alt={GEAR.deviceLabel} style={{ maxHeight: 380, objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* Training Structure — right */}
        <div className="absolute" style={{ right: 51, top: 142 }}>
          <TrainingStructure color={COLOR} />
        </div>

        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
