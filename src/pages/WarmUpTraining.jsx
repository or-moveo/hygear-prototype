import { useState, useEffect } from 'react'
import { Flame, ClipboardText, Barbell, Anchor, Lightning, Snowflake } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import StudioHeader from '../components/StudioHeader'


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

export default function WarmUpTraining() {
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
        <TrainingStructure />
      </div>

      {/* Main content area (left of sidebar) */}
      <div className="absolute flex gap-[24px] left-[51px] top-[142px] w-[1425px] h-[882px]">

        {/* Left column: countdown ring + next exercise */}
        <div className="flex flex-col gap-[24px] w-[420px] shrink-0">

          {/* Countdown ring */}
          <div className="flex items-center justify-center p-[36px] rounded-[16px] flex-1" style={{ background: 'linear-gradient(to bottom, #c8def5, #ffffff)' }}>
            <CountdownRing
              size={280}
              value={timer}
              max={VIDEO_DURATION}
              label=""
              color="#43a77c"
              trackColor="white"
              danger={true}
            />
          </div>

          {/* Next card — exercise or next section */}
          <div className="bg-white border border-[#e5e5e5] flex items-center px-[32px] py-[24px] rounded-[16px] shrink-0">
            <div className="flex flex-col gap-[4px]">
              <p className="font-poppins font-normal text-[14px] text-black/40 uppercase tracking-widest">NEXT</p>
              <p className="font-poppins font-bold text-[36px] leading-none text-black">
                {isLastExercise
                  ? SIDEBAR_ITEMS.find(i => i.state === 'next')?.label
                  : EXERCISES[exerciseIdx + 1].name}
              </p>
            </div>
          </div>

        </div>

        {/* Video — full height, exercise name overlaid */}
        <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[32px] pointer-events-none">
            <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest">GET READY</p>
            <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{currentExercise.name}</p>
          </div>
          <VideoPlayer src={currentExercise.video} />
        </div>

      </div>
    </div>
    </ScaledFrame>
  )
}
