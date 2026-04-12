import { useState, useEffect } from 'react'
import { Flame, ClipboardText, Barbell, Anchor, Lightning, Snowflake } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'

const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png"

const VIDEO_DURATION = 15

const EXERCISES = [
  { name: 'Arm Circles',  video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
  { name: 'Split Squat',  video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720439700/hyfit-prod/video/exercises/SPLIT_SQUAT_LEFT___L.m3u8' },
  { name: 'Deadlift',     video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720458615/hyfit-prod/video/exercises/DEADLIFT___L.m3u8' },
]

const SIDEBAR_ITEMS = [
  { label: 'Warm-up',          icon: Flame,         duration: '5 Min',  state: 'active'   },
  { label: 'Demo & Prep',      icon: ClipboardText, duration: '0:30',   state: 'next'     },
  { label: 'Strength Dynamic', icon: Barbell,       duration: '18 Min', state: 'upcoming' },
  { label: 'Holds Isometric',  icon: Anchor,        duration: '12 Min', state: 'upcoming' },
  { label: 'Finisher',         icon: Lightning,     duration: '8 Min',  state: 'upcoming' },
  { label: 'Cool-down',        icon: Snowflake,     duration: '5 Min',  state: 'upcoming' },
]

export default function WarmUpTraining2() {
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
      <div className="bg-white relative size-full" data-name="Studio Dashboard — Warm-up training Option 2">

        {/* Header */}
        <div className="absolute content-stretch flex items-center justify-between left-0 p-[50px] top-0 w-[1920px]">
          <div className="h-[42px] relative shrink-0">
            <div className="content-stretch flex gap-[16px] h-full items-center relative">
              <div className="h-[40px] relative shrink-0 w-[67px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[124.03%] left-[12.55%] max-w-none top-[-12.01%] w-[74.9%]" src={imgHabeastsByHygearLogo21} />
                </div>
              </div>
              <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap">
                Studio name
              </p>
            </div>
          </div>
        </div>

        {/* Left sidebar — Training structure */}
        <div className="absolute left-[51px] top-[142px]">
          <TrainingStructure />
        </div>

        {/* Main content area: video + right column (timer & next) */}
        <div className="absolute flex gap-[24px] left-[445px] top-[142px] w-[1425px] h-[882px]">

          {/* Video — full height, exercise name overlaid */}
          <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
            {/* Exercise name gradient overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[32px] pointer-events-none">
              <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest">GET READY</p>
              <p className="font-poppins font-bold text-[52px] leading-none text-white mt-[6px]">{currentExercise.name}</p>
            </div>
            <VideoPlayer src={currentExercise.video} />
          </div>

          {/* Right column: countdown ring + next exercise */}
          <div className="flex flex-col gap-[24px] w-[420px] shrink-0">

            {/* Countdown ring */}
            <div className="bg-[#f8f7f7] flex items-center justify-center p-[36px] rounded-[16px] flex-1">
              <CountdownRing
                size={280}
                value={timer}
                max={VIDEO_DURATION}
                label=""
                color="#43a77c"
                danger={true}
              />
            </div>

            {/* Next card */}
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
        </div>
      </div>
    </ScaledFrame>
  )
}
