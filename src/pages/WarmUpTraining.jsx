import { useState, useEffect } from 'react'
import { ArrowsClockwise } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import StageBackground from '../components/StageBackground'
import { ZONES } from '../data/zones'

const VIDEO_DURATION = 15

const EXERCISES = [
  { name: 'Arm Circles',        video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
  { name: 'Split Squat',        video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720439700/hyfit-prod/video/exercises/SPLIT_SQUAT_LEFT___L.m3u8' },
  { name: 'Deadlift',           video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720458615/hyfit-prod/video/exercises/DEADLIFT___L.m3u8' },
]

export default function WarmUpTraining({ zoneIdx }) {
  const WARMUP_ZONE = ZONES[zoneIdx ?? 0]
  const [exerciseIdx, setExerciseIdx] = useState(0)
  const [timer, setTimer] = useState(VIDEO_DURATION)

  const currentExercise = EXERCISES[exerciseIdx]
  const isLastExercise = exerciseIdx >= EXERCISES.length - 1

  useEffect(() => {
    setTimer(VIDEO_DURATION)
  }, [exerciseIdx])

  useEffect(() => {
    if (timer <= 0 && isLastExercise) return
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1
        if (!isLastExercise) {
          setExerciseIdx((idx) => idx + 1)
          return VIDEO_DURATION
        }
        return 0
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timer, isLastExercise])

  const WARMUP_GRAD = `linear-gradient(192.26deg, color-mix(in srgb, ${WARMUP_ZONE.color} 60%, transparent) 0%, color-mix(in srgb, ${WARMUP_ZONE.color} 30%, transparent) 99.98%)`
  const isUrgent = timer <= 5 && timer > 0

  // Ring geometry
  const RING_SIZE = 280
  const RING_STROKE = 20
  const RING_R = (RING_SIZE - RING_STROKE) / 2
  const RING_CIRC = 2 * Math.PI * RING_R
  const ringProgress = Math.min(timer / VIDEO_DURATION, 1)

  // Half-donut geometry (Group Target chart)
  const HD_W = 280
  const HD_H = 140
  const HD_R = 116
  const HD_CX = 140
  const HD_CY = 140
  const HD_LEN = Math.PI * HD_R
  const GOAL_POINTS = { current: 220, total: 300 }
  const goalPct = GOAL_POINTS.current / GOAL_POINTS.total
  const dotAngle = Math.PI - Math.PI * goalPct
  const dotX = HD_CX + HD_R * Math.cos(dotAngle)
  const dotY = HD_CY - HD_R * Math.sin(dotAngle)

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
    <StageBackground>
    <div style={{ position: 'absolute', inset: 0, zIndex: 5 }} data-name="Studio Dashboard — Warm-up training">
      {/* Right sidebar — Training structure */}
      <div className="absolute right-[51px] top-[142px]">
        {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': WARMUP_ZONE.color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
        <TrainingStructure color={WARMUP_ZONE.color} />
      </div>

      {/* Main content area (left of sidebar) */}
      <div className="absolute flex gap-[24px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column — new 450-wide two-block layout */}
        <div className="flex flex-col shrink-0 h-full" style={{ width: 450, gap: 20 }}>

          {/* Block A — timer */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{
              width: 450, height: 350,
              background: WARMUP_GRAD,
              borderRadius: '36px 18px 36px 36px',
            }}
          >
            {isUrgent && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                pointerEvents: 'none', zIndex: 10,
                '--c': WARMUP_ZONE.color,
                animation: 'bp-urgentGlow 0.75s ease-in-out infinite',
              }} />
            )}
            <div className="relative flex items-center justify-center" style={{ width: RING_SIZE, height: RING_SIZE }}>
              <svg width={RING_SIZE} height={RING_SIZE} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                  fill="none" stroke="#ffffff" strokeWidth={RING_STROKE}
                />
                <circle
                  cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                  fill="none" stroke={WARMUP_ZONE.color} strokeWidth={RING_STROKE}
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRC}
                  strokeDashoffset={RING_CIRC * (1 - ringProgress)}
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <p className="font-poppins text-white" style={{ fontSize: 56, lineHeight: '66px', fontWeight: 600 }}>
                  {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}
                </p>
                <p className="font-poppins text-white" style={{ fontSize: 18, lineHeight: '28px', fontWeight: 400 }}>
                  WORK
                </p>
              </div>
            </div>
          </div>

          {/* Block B — group target */}
          <div
            className="flex flex-col flex-1 min-h-0"
            style={{
              position: 'relative',
              width: 450,
              padding: 36, gap: 36,
              background: WARMUP_GRAD,
              borderRadius: 24,
              boxSizing: 'border-box',
            }}
          >
            {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': WARMUP_ZONE.color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
            {/* Row 1 — GROUP TARGET + ArrowsClockwise button */}
            <div className="flex items-center justify-between" style={{ height: 56 }}>
              <span className="font-poppins text-white" style={{ fontSize: 28, lineHeight: '34px', fontWeight: 600 }}>
                GROUP TARGET
              </span>
              <div
                className="flex items-center justify-center"
                style={{ width: 56, height: 56, background: WARMUP_ZONE.color, borderRadius: 12 }}
              >
                <ArrowsClockwise size={30} color="#fff" weight="bold" />
              </div>
            </div>

            {/* Row 2 — half-donut chart */}
            <div className="flex items-center justify-center">
              <svg width={HD_W} height={HD_H} viewBox={`0 0 ${HD_W} ${HD_H}`}>
                {/* White base arc */}
                <path
                  d={`M ${HD_CX - HD_R},${HD_CY} A ${HD_R},${HD_R} 0 0 1 ${HD_CX + HD_R},${HD_CY}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={47.191}
                  strokeLinecap="butt"
                />
                {/* Zone-colored progress arc */}
                <path
                  d={`M ${HD_CX - HD_R},${HD_CY} A ${HD_R},${HD_R} 0 0 1 ${HD_CX + HD_R},${HD_CY}`}
                  fill="none"
                  stroke={WARMUP_ZONE.color}
                  strokeWidth={47.191}
                  strokeLinecap="butt"
                  strokeDasharray={HD_LEN}
                  strokeDashoffset={HD_LEN * (1 - goalPct)}
                />
                {/* Inner dashed arc (Ellipse 54, rx=86.5 ry=43.25 approx halved — use r≈86 to match) */}
                <path
                  d={`M ${HD_CX - 86},${HD_CY} A 86,86 0 0 1 ${HD_CX + 86},${HD_CY}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={3}
                  strokeDasharray="6 6"
                />
                {/* End dot */}
                <circle
                  cx={dotX} cy={dotY}
                  r={33.82 / 2}
                  fill={WARMUP_ZONE.color}
                  stroke="#ffffff"
                  strokeWidth={3.93}
                />
              </svg>
            </div>

            {/* Row 3 — 220/300 */}
            <div className="flex items-center justify-center">
              <span className="font-poppins text-white text-center" style={{ fontSize: 56, lineHeight: '80px', fontWeight: 700 }}>
                {GOAL_POINTS.current}/{GOAL_POINTS.total}
              </span>
            </div>
          </div>

        </div>

        {/* Video — full height, exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px overflow-hidden bg-[#f8f7f7]" style={{ borderRadius: '36px 18px 36px 36px' }}>
          {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 30, '--c': WARMUP_ZONE.color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[48px] pointer-events-none">
            <p className="font-poppins font-normal text-[23px] text-white/60 uppercase tracking-widest">WORK</p>
            <p className="font-poppins font-bold text-[62px] leading-none text-white mt-[6px]">{currentExercise.name}</p>
          </div>
          <VideoPlayer src={currentExercise.video} />
        </div>

      </div>
    </div>
    </StageBackground>
    </ScaledFrame>
  )
}
