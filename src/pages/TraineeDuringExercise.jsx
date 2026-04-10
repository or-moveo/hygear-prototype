import { Lightning, Coffee, Wind, Stack, ArrowsCounterClockwise, Barbell, Timer, Heart, Target, UsersThree, ClockCounterClockwise } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'

const imgLogo      = "/icons/hygear-logo.png"
const imgTimerRing = "/assets/timer-ring-trainee.svg"
const imgDonutMe   = "/assets/timer-ring-trainee.svg"
const imgDonutGroup = "/assets/donut-group.svg"

const EXERCISE_HISTORY = [
  { set: 'Set 3', name: 'Bench Press', reps: 12, weight: 75, state: 'active'  },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'past'    },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'past'    },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'past'    },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'past'    },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'past'    },
  { set: 'Set 4', name: 'Bench Press', reps: 12, weight: 75, state: 'upcoming'},
]

export default function TraineeDuringExercise() {
  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      <div className="bg-white relative size-full font-poppins" data-name="Trainee Dashboard — During Exercise">

        {/* Header */}
        <div className="absolute flex items-center justify-between left-0 px-[50px] py-[28px] top-0 w-[1366px]">
          <div className="flex items-center gap-[16px]">
            <div className="h-[40px] w-[67px] relative shrink-0 overflow-hidden">
              <img alt="" className="absolute h-[124.03%] left-[12.55%] max-w-none top-[-12.01%] w-[74.9%]" src={imgLogo} />
            </div>
            <p className="font-semibold text-[36px] leading-[46px] text-black whitespace-nowrap">John Smith</p>
          </div>
          <div className="bg-[#43a77c] h-[54px] w-[100px] rounded-[10px] flex items-center justify-center">
            <p className="font-bold text-[26px] text-white leading-none">S1</p>
          </div>
        </div>

        {/* Main layout */}
        <div className="absolute left-[20px] top-[110px] flex gap-[20px] w-[1326px] h-[894px]">

          {/* Left area */}
          <div className="flex flex-col gap-[16px] flex-1 min-w-0">

            {/* Exercise card: timer + info */}
            <div className="bg-[#f8f7f7] rounded-[16px] p-[28px] flex items-center gap-[48px] shrink-0">

              {/* Circular timer */}
              <div className="relative shrink-0 size-[220px] flex items-center justify-center">
                <img alt="" className="absolute inset-0 size-full" src={imgTimerRing} />
                <div className="relative flex flex-col items-center gap-[2px]">
                  <p className="font-semibold text-[52px] leading-none text-[#0f172a] tabular-nums">0:45</p>
                  <div className="flex items-center gap-[4px] text-black/50 mt-[4px]">
                    <Timer size={14} />
                    <p className="font-normal text-[16px]">seconds left</p>
                  </div>
                </div>
              </div>

              {/* Exercise info */}
              <div className="flex flex-col gap-[14px] flex-1">
                <p className="font-semibold text-[28px] text-black leading-tight">Bench Press</p>

                {/* WORK / REST / AERO / SETS badges */}
                <div className="flex gap-[12px]">
                  {[
                    { label: 'WORK', value: '0:45', bg: '#d9e7e0', text: '#000', icon: Lightning },
                    { label: 'REST', value: '1:00', bg: '#dddfe9', text: '#000', icon: Coffee },
                    { label: 'AERO', value: '0:30', bg: '#758db2', text: '#fff', icon: Wind },
                    { label: 'SETS', value: '3/4',  bg: '#5a6187', text: '#fff', icon: Stack },
                  ].map(b => (
                    <div key={b.label} className="rounded-[10px] w-[100px] h-[68px] flex flex-col items-center justify-center gap-[2px]"
                      style={{ background: b.bg }}>
                      <div className="flex items-center gap-[4px]">
                        <b.icon size={12} weight="fill" style={{ color: b.text, opacity: 0.7 }} />
                        <p className="font-normal text-[13px]" style={{ color: b.text }}>{b.label}</p>
                      </div>
                      <p className="font-bold text-[22px] leading-none" style={{ color: b.text }}>{b.value}</p>
                    </div>
                  ))}
                </div>

                {/* Current Reps / Current Weight */}
                <div className="flex gap-[16px]">
                  <div className="bg-white rounded-[14px] flex-1 h-[90px] flex flex-col items-center justify-center gap-[4px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-[4px] text-black/60">
                      <ArrowsCounterClockwise size={14} />
                      <p className="font-normal text-[14px]">Current Reps</p>
                    </div>
                    <p className="font-bold text-[36px] leading-none text-black">8</p>
                  </div>
                  <div className="bg-white rounded-[14px] flex-1 h-[90px] flex flex-col items-center justify-center gap-[4px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-[4px] text-black/60">
                      <Barbell size={14} />
                      <p className="font-normal text-[14px]">Current Weight</p>
                    </div>
                    <div className="flex items-end gap-[3px]">
                      <p className="font-bold text-[36px] leading-none text-black">80</p>
                      <p className="font-normal text-[18px] text-black mb-[2px]">kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: 3 cards */}
            <div className="flex gap-[16px] flex-1 min-h-0">

              {/* My Workout Targets */}
              <div className="bg-[#334367] rounded-[16px] p-[20px] flex flex-col items-center gap-[20px] flex-1">
                <div className="flex items-center gap-[6px] text-white">
                  <Target size={16} />
                  <p className="font-semibold text-[16px]">My Workout Targets</p>
                </div>
                <div className="relative size-[160px] flex items-center justify-center">
                  <img alt="" className="absolute inset-0 size-full" src={imgTimerRing} />
                  <div className="relative flex flex-col items-center">
                    <p className="font-semibold text-[22px] text-white leading-tight">100%</p>
                    <p className="font-light text-[12px] text-white/70">Complete</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  {[
                    { icon: ArrowsCounterClockwise, dot: '#43a77c', label: 'Reps',   value: '96/120'    },
                    { icon: Barbell,                dot: '#758db2', label: 'Weight', value: '624/960 kg'},
                    { icon: Stack,                  dot: '#dddfe9', label: 'Sets',   value: '9/12'      },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <r.icon size={14} style={{ color: r.dot }} />
                        <p className="font-normal text-[14px] text-white">{r.label}</p>
                      </div>
                      <p className="font-semibold text-[14px] text-white">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Workout Targets */}
              <div className="bg-[#edf3ef] rounded-[16px] p-[20px] flex flex-col items-center gap-[20px] flex-1">
                <div className="flex items-center gap-[6px] text-black">
                  <UsersThree size={16} />
                  <p className="font-semibold text-[16px]">Group Workout Targets</p>
                </div>
                <div className="relative size-[160px] flex items-center justify-center">
                  <img alt="" className="absolute inset-0 size-full" src={imgDonutGroup} />
                  <div className="relative flex flex-col items-center">
                    <p className="font-semibold text-[22px] text-black leading-tight">73%</p>
                    <p className="font-light text-[12px] text-black/60">Complete</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  {[
                    { icon: ArrowsCounterClockwise, dot: '#4c735e', label: 'Reps',    value: '1530/1800'},
                    { icon: Stack,                  dot: '#659a7e', label: 'Sets',    value: '140/180'  },
                    { icon: Heart,                  dot: '#8db49f', label: 'Avg BPM', value: '142'      },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <r.icon size={14} weight={r.label === 'Avg BPM' ? 'fill' : 'regular'} style={{ color: r.dot }} />
                        <p className="font-normal text-[14px] text-black">{r.label}</p>
                      </div>
                      <p className="font-semibold text-[14px] text-black">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BPM */}
              <div className="bg-[#758db2] rounded-[16px] flex-1 flex flex-col items-center justify-center gap-[8px] p-[20px]">
                <Heart size={28} weight="fill" className="text-white" />
                <p className="font-normal text-[16px] text-white">BPM</p>
                <p className="font-bold text-[72px] leading-none text-white">145</p>
                <p className="font-normal text-[16px] text-white">beats per minute</p>
              </div>

            </div>
          </div>

          {/* Right sidebar — Exercise History */}
          <div className="bg-white border-2 border-[#dddfe9] rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)] w-[320px] shrink-0 flex flex-col gap-[16px] p-[22px] overflow-hidden">
            <div className="flex items-center gap-[8px] text-black shrink-0">
              <ClockCounterClockwise size={18} />
              <p className="font-semibold text-[18px]">Exercise History</p>
            </div>
            <div className="flex flex-col gap-[10px] overflow-y-auto flex-1">
              {EXERCISE_HISTORY.map((item, i) => {
                const isActive = item.state === 'active'
                const rowBg    = isActive ? '#edf3ef' : '#f8f7f7'
                const badgeBg  = isActive ? '#43a77c' : '#758db2'
                return (
                  <div key={i} className="rounded-[10px] p-[12px] flex flex-col gap-[8px] shrink-0"
                    style={{ background: rowBg }}>
                    <div className="flex items-center gap-[10px]">
                      <div className="h-[26px] px-[10px] rounded-[6px] flex items-center justify-center shrink-0"
                        style={{ background: badgeBg }}>
                        <p className="font-bold text-[12px] text-white leading-none">{item.set}</p>
                      </div>
                      <p className="font-semibold text-[14px] text-black">{item.name}</p>
                    </div>
                    <div className="flex gap-[24px]">
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-normal text-[13px] text-black/60">Reps</p>
                        <p className="font-bold text-[15px] text-black">{item.reps}</p>
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-normal text-[13px] text-black/60">Weight</p>
                        <p className="font-bold text-[15px] text-black">{item.weight} kg</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </ScaledFrame>
  )
}
