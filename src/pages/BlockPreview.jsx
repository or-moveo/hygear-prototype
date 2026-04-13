import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import CountdownRing from '../components/CountdownRing'

const BLOCK = {
  step: 1,
  label: 'Warm-Up',
  color: '#f5365c',
  icon: '/assets/thermo-warmup.svg',
  duration: '5 Minutes',
}

const EXERCISES = [
  { name: 'Arm Circles',  sets: 3, reps: 12, kg: null },
  { name: 'Split Squat',  sets: 3, reps: 10, kg: null },
  { name: 'Deadlift',     sets: 3, reps: 12, kg: 40   },
]

const START_COUNTDOWN = 15

export default function BlockPreview() {
  const [timer, setTimer] = useState(START_COUNTDOWN)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Block Preview">
      <StudioHeader />

      {/* Main content */}
      <div className="absolute flex gap-[32px] left-[51px] top-[142px] w-[1818px] h-[882px]">

        {/* Left column: block card + countdown */}
        <div className="flex flex-col gap-[24px] w-[420px] shrink-0">

          {/* Block card */}
          <div
            style={{
              flex: '1 0 0',
              padding: 48,
              borderRadius: 36,
              borderBottom: `8px solid ${BLOCK.color}`,
              background: `linear-gradient(205deg, ${BLOCK.color}4D 0%, ${BLOCK.color}0D 100%), #fff`,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              <div style={{ borderBottom: `1px solid ${BLOCK.color}`, paddingBottom: 10 }}>
                <span className="font-poppins" style={{ fontSize: 24, lineHeight: '34px', color: BLOCK.color }}>
                  BLOCK {BLOCK.step}
                </span>
              </div>
              <img src={BLOCK.icon} alt="" style={{ width: 88, height: 88, flexShrink: 0 }} />
              <span className="font-poppins font-semibold text-black" style={{ fontSize: 48, lineHeight: '58px' }}>
                {BLOCK.label}
              </span>
            </div>
            <div style={{ background: BLOCK.color, borderRadius: 999, padding: '10px 32px', alignSelf: 'flex-start' }}>
              <span className="font-poppins font-medium text-white" style={{ fontSize: 20, lineHeight: '30px' }}>
                {BLOCK.duration}
              </span>
            </div>
          </div>

          {/* Countdown ring */}
          <div
            className="flex items-center justify-center p-[36px] rounded-[16px] shrink-0"
            style={{ background: 'linear-gradient(to bottom, #c8def5, #ffffff)' }}
          >
            <CountdownRing
              size={220}
              value={timer}
              max={START_COUNTDOWN}
              label="STARTING"
              color="#43a77c"
              trackColor="white"
              danger
            />
          </div>

        </div>

        {/* Exercise list */}
        <div className="flex flex-col gap-[20px] flex-[2_0_0] min-w-px justify-center">
          <p className="font-poppins font-bold text-[28px] text-black mb-[8px]">Exercises</p>
          {EXERCISES.map((ex, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-[40px] py-[28px] rounded-[16px] bg-white border border-[#e5e7eb]"
              style={{ boxShadow: '-4px 3px 10px rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-[24px]">
                <span
                  className="font-poppins font-semibold text-[14px] px-[12px] py-[4px] rounded-full"
                  style={{ background: `${BLOCK.color}20`, color: BLOCK.color }}
                >
                  {i + 1}
                </span>
                <p className="font-poppins font-semibold text-[32px] text-black">{ex.name}</p>
              </div>
              <div className="flex items-center gap-[48px]">
                <div className="flex flex-col items-center gap-[2px]">
                  <p className="font-poppins font-bold text-[32px] text-black leading-none">{ex.sets} × {ex.reps}</p>
                  <p className="font-poppins font-normal text-[15px] text-black/40 uppercase tracking-wider">Sets × Reps</p>
                </div>
                {ex.kg && (
                  <div className="flex flex-col items-center gap-[2px]">
                    <p className="font-poppins font-bold text-[32px] text-black leading-none">{ex.kg} kg</p>
                    <p className="font-poppins font-normal text-[15px] text-black/40 uppercase tracking-wider">Weight</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gear in Active Use card */}
        <div
          className="flex flex-col rounded-[24px] overflow-hidden shrink-0 w-[360px]"
          style={{ background: '#eaf5ef', border: '1px solid rgba(67,167,124,0.2)' }}
        >
          {/* Title */}
          <div className="flex items-center gap-[12px] px-[28px] py-[24px]">
            <img src="/assets/equipment-icon.svg" alt="" style={{ width: 32, height: 32 }} />
            <p className="font-poppins font-bold text-[22px] text-black">Gear in Active Use</p>
          </div>

          {/* Bluetooth + battery row */}
          <div className="mx-[20px] bg-white rounded-[16px] flex items-center gap-[14px] px-[20px] py-[16px]">
            <div className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px]" style={{ background: '#43a77c' }}>
              <img src="/icons/bluetooth-active.svg" alt="bluetooth" style={{ width: 26, height: 26, filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="flex items-center gap-[8px] flex-1">
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                <rect x="0.5" y="0.5" width="19" height="13" rx="3.5" stroke="#333" strokeWidth="1"/>
                <rect x="2" y="2" width="15" height="10" rx="2" fill="#43a77c"/>
                <path d="M21 4.5V9.5C21.8 9.2 22 8.1 22 7C22 5.9 21.8 4.8 21 4.5Z" fill="#333"/>
              </svg>
              <span className="font-poppins font-semibold text-[20px] text-black">99%</span>
            </div>
          </div>

          {/* Device info row */}
          <div className="mx-[20px] mt-[12px] bg-white rounded-[16px] px-[20px] py-[16px]">
            <div className="flex items-center gap-[8px] mb-[4px]">
              <img src="/assets/equipment-icon.svg" alt="" style={{ width: 18, height: 18, opacity: 0.5 }} />
              <span className="font-poppins text-[14px] text-black/50 uppercase tracking-widest">Device</span>
            </div>
            <p className="font-poppins font-bold text-[28px] text-black leading-none">Bands+</p>
          </div>

          {/* Gear image */}
          <div className="mx-[20px] mt-[12px] mb-[20px] bg-white rounded-[16px] flex-1 flex items-center justify-center py-[24px]">
            <img src="/assets/rope.png" alt="Bands+" style={{ height: 160, objectFit: 'contain' }} />
          </div>
        </div>

      </div>
    </div>
    </ScaledFrame>
  )
}
