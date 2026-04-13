import { useState, useEffect } from 'react'
import { Barbell } from '@phosphor-icons/react'
import TrainingStructure from '../components/TrainingStructure'
import { ZONES } from '../data/zones'
import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import CountdownRing from '../components/CountdownRing'

const NEXT_BLOCK = {
  number: 4,
  label: 'Warm-up',
  icon: '/assets/thermo-strength-bare.svg',
  color: '#FF6B00',
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
  const r = parseInt(COLOR.slice(1,3),16), g = parseInt(COLOR.slice(3,5),16), b = parseInt(COLOR.slice(5,7),16)
  const GRAD = `linear-gradient(190deg, rgba(${r},${g},${b},0.30) 0%, rgba(${r},${g},${b},0.05) 100%)`

  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <div className="bg-white relative size-full">
        <StudioHeader />

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
            <div style={{ width: 88, height: 88, borderRadius: 16, background: COLOR, flexShrink: 0, overflow: 'hidden' }}>
              <img src={NEXT_BLOCK.icon} alt="" style={{ width: 88, height: 88, display: 'block' }} />
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
    </ScaledFrame>
  )
}
