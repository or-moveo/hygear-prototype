import { useState, useEffect } from 'react'
import { Flame, ClipboardText, Barbell, Anchor, Lightning, Snowflake, ArrowsClockwise } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import StudioHeader from '../components/StudioHeader'
import { ZONES } from '../data/zones'

const VIDEO_DURATION = 15

const EXERCISES = [
  { name: 'Arm Circles',        video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
  { name: 'Split Squat',        video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720439700/hyfit-prod/video/exercises/SPLIT_SQUAT_LEFT___L.m3u8' },
  { name: 'Deadlift',           video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720458615/hyfit-prod/video/exercises/DEADLIFT___L.m3u8' },
]

const SIDEBAR_ITEMS = [
  { label: 'Warm-up',          icon: Flame,         duration: '5 Min',  state: 'active'   },
  { label: 'Demo & Prep',      icon: ClipboardText, duration: '0:30',   state: 'next'     },
  { label: 'Strength Dynamic', icon: Barbell,       duration: '18 Min', state: 'upcoming' },
  { label: 'Holds Isometric',  icon: Anchor,        duration: '12 Min', state: 'upcoming' },
  { label: 'Finisher',         icon: Lightning,     duration: '8 Min',  state: 'upcoming' },
  { label: 'Cool-down',        icon: Snowflake,     duration: '5 Min',  state: 'upcoming' },
]

const GROUP_REPS = { current: 0, total: 1800 }

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

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Warm-up training">
      {/* Header */}
      <StudioHeader />

      {/* Right sidebar — Training structure */}
      <div className="absolute right-[51px] top-[142px]">
        <TrainingStructure color={WARMUP_ZONE.color} />
      </div>

      {/* Main content area (left of sidebar) */}
      <div className="absolute flex gap-[24px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column */}
        <div className="flex flex-col gap-[20px] w-[420px] shrink-0 h-full">

          {/* Ring card — flex-1 to fill remaining space */}
          <div
            className="flex items-center justify-center rounded-[36px] flex-1 min-h-0"
            style={{ padding: 20, background: `linear-gradient(191deg, ${WARMUP_ZONE.color}4D 0%, ${WARMUP_ZONE.color}0D 100%)` }}
          >
            <CountdownRing
              size={240}
              value={timer}
              max={VIDEO_DURATION}
              label="REST"
              color={WARMUP_ZONE.color}
              trackColor="white"
              danger={true}
            />
          </div>

          {/* Zone card */}
          <div
            className="flex flex-col gap-[12px] rounded-[36px] shrink-0"
            style={{
              padding: '24px 28px',
              borderBottom: `8px solid ${WARMUP_ZONE.color}`,
              background: `linear-gradient(184deg, ${WARMUP_ZONE.color}4D 0%, ${WARMUP_ZONE.color}0D 100%), #fff`,
            }}
          >
            <div style={{ borderBottom: `1px solid ${WARMUP_ZONE.color}`, paddingBottom: 6 }}>
              <span className="font-poppins font-bold" style={{ fontSize: 22, color: WARMUP_ZONE.color }}>
                ZONE {WARMUP_ZONE.id} – {WARMUP_ZONE.label}
              </span>
            </div>
            <p className="font-poppins text-black" style={{ fontSize: 18, lineHeight: '26px', fontWeight: 300 }}>
              {WARMUP_ZONE.desc}
            </p>
          </div>

          {/* Group target */}
          <div
            className="flex flex-col justify-between rounded-[24px] shrink-0"
            style={{ padding: '20px 28px', background: `linear-gradient(185deg, ${WARMUP_ZONE.color}4D 0%, ${WARMUP_ZONE.color}0D 100%)` }}
          >
            <div className="flex items-center justify-between mb-[12px]">
              <span className="font-poppins text-black" style={{ fontSize: 20, lineHeight: '28px' }}>GROUP TARGET</span>
              <div
                className="flex items-center justify-center rounded-[12px]"
                style={{ width: 44, height: 44, background: WARMUP_ZONE.color }}
              >
                <ArrowsClockwise size={22} color="white" weight="bold" />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <span className="font-poppins font-semibold text-black" style={{ fontSize: 34, lineHeight: '44px' }}>
                Reps {GROUP_REPS.current}/{GROUP_REPS.total}
              </span>
              <div className="w-full rounded-full overflow-hidden" style={{ height: 10, background: 'rgba(255,255,255,0.6)' }}>
                <div
                  className="rounded-full h-full"
                  style={{
                    width: `${Math.round((GROUP_REPS.current / GROUP_REPS.total) * 100)}%`,
                    background: WARMUP_ZONE.color,
                  }}
                />
              </div>
            </div>
          </div>

          {/* UP NEXT */}
          <div
            className="flex flex-col gap-[6px] rounded-[24px] shrink-0"
            style={{
              padding: '20px 28px',
              border: `3px solid ${ZONES[1].color}`,
              background: `linear-gradient(198deg, ${ZONES[1].color}4D 22%, ${ZONES[1].color}00 58%)`,
            }}
          >
            <span className="font-poppins text-black" style={{ fontSize: 20, lineHeight: '28px' }}>UP NEXT</span>
            <span className="font-poppins font-semibold" style={{ fontSize: 26, lineHeight: '34px', color: ZONES[1].color }}>
              {isLastExercise
                ? (SIDEBAR_ITEMS.find(i => i.state === 'next')?.label ?? 'Demo & Prep').toUpperCase()
                : EXERCISES[exerciseIdx + 1].name.toUpperCase()}
            </span>
          </div>

        </div>

        {/* Video — full height, exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[48px] pointer-events-none">
            <p className="font-poppins font-normal text-[19px] text-white/60 uppercase tracking-widest">WORK</p>
            <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{currentExercise.name}</p>
          </div>
          <VideoPlayer src={currentExercise.video} />
        </div>

      </div>
    </div>
    </ScaledFrame>
  )
}
