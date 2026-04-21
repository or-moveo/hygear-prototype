import { useState, useEffect } from 'react'
import { Fire, Stack, PersonArmsSpread, Lightning, ArrowRight } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import StageBackground from '../components/StageBackground'
import { ZONES } from '../data/zones'
import { DEMO_DURATION_PER_EXERCISE } from '../data/config'

const ZONE_BLOCK = [
  { number: 1, label: 'Warm-Up',          zoneLabel: 'ZONE 1', Icon: Fire },
  { number: 2, label: 'Demo & Prep',      zoneLabel: 'ZONE 2', Icon: Stack },
  { number: 3, label: 'Dynamic Strength', zoneLabel: 'ZONE 3', Icon: PersonArmsSpread },
  { number: 4, label: 'Isometric Holds',  zoneLabel: 'ZONE 4', Icon: PersonArmsSpread },
  { number: 5, label: 'All Out',          zoneLabel: 'ZONE 5', Icon: Lightning },
]

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
  const zIdx = zoneIdx ?? DEFAULT_ZONE_IDX
  const NEXT_ZONE = ZONES[zIdx]
  const BLOCK = ZONE_BLOCK[zIdx]
  const BlockIcon = BLOCK.Icon
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
  const grad = `linear-gradient(180deg, color-mix(in srgb, ${color} 60%, transparent) 0%, color-mix(in srgb, ${color} 30%, transparent) 100%)`
  const isUrgent = timer <= 5 && timer > 0

  return (
    <ScaledFrame>
    <style>{`
      @keyframes bp-urgentGlow {
        0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent),
                              0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
        50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent),
                              0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
      }
    `}</style>
    <StageBackground variant="light" glowColor={color}>
    <div className="relative size-full" style={{ position: 'absolute', inset: 0, zIndex: 5 }} data-name="Studio Dashboard — Demo & Prep">

      {/* Right sidebar — Training structure */}
      <div className="absolute right-[51px] top-[142px]" style={{ position: 'relative' }}>
        {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
        <TrainingStructure color={NEXT_ZONE.color} />
      </div>

      {/* Main content area */}
      <div className="absolute flex gap-[36px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column: timer + NEXT BLOCK */}
        <div className="flex flex-col gap-[36px] shrink-0" style={{ width: 450 }}>

          {/* Timer card — top */}
          <div
            className="relative flex items-center justify-center rounded-[36px]"
            style={{ height: 350, background: grad, borderRadius: '36px 18px 36px 36px', flexShrink: 0 }}
          >
            {isUrgent && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                pointerEvents: 'none', zIndex: 10,
                '--c': color,
                animation: 'bp-urgentGlow 0.75s ease-in-out infinite',
              }} />
            )}
            <CountdownRing
              size={280}
              value={timer}
              max={DEMO_DURATION_PER_EXERCISE}
              label="REST"
              color={color}
              textColor="white"
              trackColor="white"
            />
          </div>

          {/* NEXT BLOCK card — bottom */}
          <div
            className="flex flex-col justify-between flex-1"
            style={{
              position: 'relative',
              padding: 36,
              background: grad,
              borderBottom: `8px solid ${color}`,
              borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
            }}
          >
            {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
            <div className="flex flex-col" style={{ gap: 21 }}>
              <div style={{ borderBottom: `1px solid ${color}`, padding: '8px 0' }}>
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color }}>
                  NEXT BLOCK:&nbsp;&nbsp;{BLOCK.number}
                </span>
              </div>
              <div className="flex items-center justify-center" style={{ width: 88, height: 88, background: color, borderRadius: 24 }}>
                <BlockIcon size={50} color="#fff" weight="regular" />
              </div>
              <div className="flex flex-col" style={{ gap: 12 }}>
                <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>{BLOCK.label}</span>
                <span className="font-poppins font-normal text-white" style={{ fontSize: 24, lineHeight: '34px' }}>5 Minutes</span>
              </div>
            </div>
            <div className="relative" style={{ width: '100%', height: 54 }}>
              <div className="absolute" style={{ left: -10, right: -10, top: -10, bottom: -10, background: color, mixBlendMode: 'screen', opacity: 0.2, filter: 'blur(10px)', borderRadius: 10, pointerEvents: 'none' }} />
              <div className="relative flex items-center justify-center" style={{ width: '100%', height: 54, background: '#000', borderRadius: 8, boxShadow: '0 1px 0 rgba(0,0,0,0.05), 0 4px 4px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.1)' }}>
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color }}>{BLOCK.zoneLabel}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Video — exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px overflow-hidden" style={{ backgroundColor: 'rgba(248, 247, 247, 0.5)', borderRadius: '36px 18px 36px 36px' }}>
          {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 30, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[48px] pointer-events-none">
            <p className="font-poppins font-normal text-[23px] text-white/60 uppercase tracking-widest">REST</p>
            <p className="font-poppins font-bold text-[62px] leading-none text-white mt-[6px]">{EXERCISE.name}</p>
          </div>
          <VideoPlayer src={EXERCISE.video} />

          {/* UP NEXT badge — left edge of video */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 'calc(50% - 47px + 270px)',
              width: 257,
              height: 94,
              background: color,
              borderRadius: '0px 12px 24px 0px',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 12,
              zIndex: 20,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <ArrowRight size={46} weight="bold" color="#fff" />
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>
                UP NEXT
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
    </StageBackground>
    </ScaledFrame>
  )
}
