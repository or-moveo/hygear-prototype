import { useState, useEffect, useCallback } from 'react'
import { Flame, ClipboardText, Barbell, Anchor, Lightning, Snowflake } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { DEMO_DURATION_PER_EXERCISE, GET_READY_COUNTDOWN } from '../data/config'

const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png"

const BLOCK = {
  label: 'Strength Dynamic',
  exercises: [
    { name: 'Chest Press',    sets: 3, reps: 12, zone: 3, video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
    { name: 'Shoulder Press',  sets: 3, reps: 10, zone: 4, video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
    { name: 'Incline Press',   sets: 3, reps: 10, zone: 3, video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8' },
  ],
}

export default function DemoPrep() {
  const [exerciseIdx, setExerciseIdx] = useState(0)
  const [demoTimer, setDemoTimer] = useState(DEMO_DURATION_PER_EXERCISE)
  const [readyTimer, setReadyTimer] = useState(GET_READY_COUNTDOWN)

  const currentExercise = BLOCK.exercises[exerciseIdx]
  const zone = ZONES[currentExercise.zone - 1]
  const isLastExercise = exerciseIdx >= BLOCK.exercises.length - 1

  // Overall GET READY countdown
  useEffect(() => {
    if (readyTimer <= 0) return
    const id = setInterval(() => {
      setReadyTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [readyTimer])

  // Per-exercise demo countdown with auto-advance
  useEffect(() => {
    if (demoTimer <= 0 && isLastExercise) return
    const id = setInterval(() => {
      setDemoTimer((prev) => {
        if (prev > 1) return prev - 1
        // Timer hit 0 — advance to next exercise if not last
        if (!isLastExercise) {
          setExerciseIdx((idx) => idx + 1)
          return DEMO_DURATION_PER_EXERCISE
        }
        return 0
      })
    }, 1000)
    return () => clearInterval(id)
  }, [demoTimer, isLastExercise])

  const SIDEBAR_ITEMS = [
    { label: 'Warm-up',            icon: Flame,         duration: '5 Min',  state: 'done'     },
    { label: 'Demo & Prep',        icon: ClipboardText, duration: '0:30',   state: 'active'   },
    { label: 'Strength Dynamic',   icon: Barbell,       duration: '18 Min', state: 'next'     },
    { label: 'Holds Isometric',    icon: Anchor,        duration: '12 Min', state: 'upcoming' },
    { label: 'Finisher',           icon: Lightning,     duration: '8 Min',  state: 'upcoming' },
    { label: 'Cool-down',          icon: Snowflake,     duration: '5 Min',  state: 'upcoming' },
  ]

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Demo & Prep">

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

      {/* Right sidebar — Training structure */}
      <div className="absolute bg-white border-2 border-[#dddfe9] border-solid content-stretch flex flex-col gap-[16px] h-[882px] items-center justify-center left-[1500px] overflow-clip p-[26px] rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)] top-[142px] w-[370px]">
        <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black w-[328px]">
          Training structure
        </p>
        <div className="flex-[828_0_0] min-h-px min-w-px relative w-[328px]">
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] size-full">
            {SIDEBAR_ITEMS.map((item) => {
              const bg = {
                done:     'bg-[#f8f7f7]',
                active:   'bg-[#758db2]',
                next:     'bg-[#43a77c]',
                upcoming: 'bg-[#edf3ef]',
              }[item.state]
              const textColor = (item.state === 'active' || item.state === 'next') ? 'text-white' : 'text-black'
              const strike = item.state === 'done' ? 'line-through opacity-50' : ''
              return (
                <div key={item.label} className={`${bg} content-stretch flex items-center justify-between p-[16px] relative rounded-[10px] shrink-0 w-[328px]`}>
                  <div className={`flex items-center gap-[8px] ${strike}`}>
                    <item.icon size={18} weight={(item.state === 'active' || item.state === 'next') ? 'fill' : 'regular'} className={textColor} />
                    <p className={`font-poppins font-semibold leading-[28px] text-[18px] ${textColor}`}>{item.label}</p>
                  </div>
                  <p className={`font-poppins font-normal leading-[24px] text-[16px] ${textColor} opacity-80`}>{item.duration}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="absolute flex flex-col gap-[24px] left-[51px] top-[142px] w-[1420px] h-[882px]">

        {/* GET READY banner */}
        <div className="bg-[#334367] content-stretch flex items-center justify-between px-[40px] py-[28px] rounded-[16px] shrink-0">
          <div className="flex flex-col gap-[4px]">
            <p className="font-poppins font-normal text-[16px] text-white/50 uppercase tracking-widest">GET READY</p>
            <p className="font-poppins font-bold text-[48px] leading-none text-white">{currentExercise.name}</p>
          </div>
          <div className="flex items-center gap-[32px]">
            {/* Goal */}
            <div className="flex flex-col items-center gap-[2px]">
              <p className="font-poppins font-bold text-[40px] leading-none text-white">{currentExercise.sets} &times; {currentExercise.reps}</p>
              <p className="font-poppins font-normal text-[16px] text-white/50">Sets &times; Reps</p>
            </div>
            {/* Zone badge */}
            <div className="flex items-center gap-[10px] px-[24px] py-[12px] rounded-full" style={{ background: zone.bg }}>
              <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: zone.color }} />
              <p className="font-poppins font-bold text-[20px]" style={{ color: zone.text }}>
                Zone {zone.id} &middot; {zone.label}
              </p>
              <p className="font-poppins font-semibold text-[18px]" style={{ color: zone.text, opacity: 0.6 }}>{zone.hebrew}</p>
            </div>
            {/* Overall countdown ring */}
            <CountdownRing
              size={100}
              value={readyTimer}
              max={GET_READY_COUNTDOWN}
              label=""
              color="#43a77c"
            />
          </div>
        </div>

        {/* Bottom row: video + right column */}
        <div className="flex gap-[24px] flex-1 min-h-0">

          {/* Video */}
          <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
            <VideoPlayer src={currentExercise.video} />
          </div>

          {/* Right column: countdown ring + zone description */}
          <div className="flex flex-col gap-[24px] w-[420px] shrink-0">

            {/* Per-exercise demo countdown */}
            <div className="bg-[#f8f7f7] content-stretch flex items-center justify-center p-[36px] relative rounded-[16px] flex-1">
              <CountdownRing
                size={280}
                value={demoTimer}
                max={DEMO_DURATION_PER_EXERCISE}
                label={currentExercise.name}
                color="#43a77c"
                danger={true}
              />
            </div>

            {/* Zone description card */}
            <div
              className="content-stretch flex flex-col justify-between rounded-[16px] p-[32px] shrink-0"
              style={{ background: zone.bg, minHeight: '200px' }}
            >
              <div className="flex items-center gap-[10px] mb-[12px]">
                <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: zone.color }} />
                <p className="font-poppins font-bold text-[12px] uppercase tracking-widest" style={{ color: zone.color }}>
                  Zone {zone.id} — {zone.label}
                </p>
              </div>
              <p className="font-poppins font-normal text-[17px] leading-relaxed" style={{ color: zone.text, opacity: 0.85 }}>
                {zone.desc}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    </ScaledFrame>
  )
}
