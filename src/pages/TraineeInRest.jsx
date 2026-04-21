import { Barbell, BatteryFull, SquaresFour, User } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'

const imgLogo     = '/icons/hygear-logo.png'
const imgGear     = '/assets/trainee-inrest/gear.png'
const imgDonutSm  = '/assets/trainee-inrest/donut-small.svg'
const imgDonutLg  = '/assets/trainee-inrest/donut-large.svg'
const imgScrollL  = '/assets/trainee-inrest/scrollbar-left.svg'
const imgScrollR  = '/assets/trainee-inrest/scrollbar-right.svg'
const imgBluetooth = '/assets/trainee-inrest/bluetooth.svg'

const SETS = [
  { set: 'Set 1', name: 'Decline Chest Press',  reps: 12, weight: 40, state: 'past' },
  { set: 'Set 1', name: 'Right Decline Chops',  reps: 10, weight: 30, state: 'past' },
  { set: 'Set 1', name: 'Left Decline Chops',   reps: 10, weight: 30, state: 'past' },
  { set: 'Set 2', name: 'Standing Wide Row',    reps: 12, weight: 35, state: 'active' },
  { set: 'Set 2', name: 'Squat + Heel R',       reps: 10, weight: 25, state: 'upcoming-blue' },
  { set: 'Set 2', name: 'Squat + Heel L',       reps: 10, weight: 25, state: 'upcoming-blue' },
  { set: 'Set 2', name: 'Crunches (Bosu)',      reps: 15, weight: 0,  state: 'upcoming-blue' },
]

function SetRow({ set, name, reps, weight, state }) {
  const isActive = state === 'active'
  const isBlue = state === 'upcoming-blue'
  const isPast = state === 'past'

  const bg = isActive ? 'bg-[#43a77c]' : 'bg-[#f8f7f7]'
  const badgeBg = isActive ? 'bg-white' : isBlue ? 'bg-[#758db2]' : 'bg-[#ccc]'
  const badgeText = isActive ? 'text-[#43a77c]' : 'text-white'
  const textColor = isActive ? 'text-white' : isBlue ? 'text-black' : 'text-[#ccc]'

  return (
    <div className={`${bg} flex flex-col h-[83px] items-start justify-between p-[12px] rounded-[10px] shrink-0 w-full`}>
      <div className="flex gap-[10px] items-center w-full">
        <div className={`${badgeBg} h-[26px] rounded-[6px] shrink-0 flex items-start pt-[5px] px-[10px] w-[49px]`}>
          <p className={`font-poppins font-bold leading-[16px] text-[12px] ${badgeText} whitespace-nowrap`}>{set}</p>
        </div>
        <p className={`font-poppins font-semibold text-[18px] leading-[28px] ${textColor} whitespace-nowrap`}>{name}</p>
      </div>
      <div className="flex gap-[24px] items-start">
        <div className={`flex gap-[8px] items-start font-poppins text-[16px] leading-[24px] ${textColor} whitespace-nowrap`}>
          <span className="font-normal">Reps:</span>
          <span className="font-bold">{reps}</span>
        </div>
        <div className={`flex gap-[8px] items-start font-poppins text-[16px] leading-[24px] ${textColor} whitespace-nowrap`}>
          <span className="font-normal">Weight:</span>
          <span className="font-bold">{weight} kg</span>
        </div>
      </div>
    </div>
  )
}

export default function TraineeInRest() {
  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      <div className="bg-white relative size-full font-poppins overflow-hidden" data-name="Trainee Dashboard - Studio Screen - In Rest">

        {/* ── Light animated background layer ── */}
        <style>{`
          @keyframes tir-drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(80px,-60px)} }
          @keyframes tir-drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-100px,70px)} }
          @keyframes tir-drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,-40px) scale(1.1)} }
          @keyframes tir-rise   { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-900px);opacity:0} }
        `}</style>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'#FF6B00', left:-180, top:120, filter:'blur(120px)', opacity:.10, mixBlendMode:'multiply', animation:'tir-drift1 22s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'#3A86FF', right:-180, top:-100, filter:'blur(120px)', opacity:.10, mixBlendMode:'multiply', animation:'tir-drift2 28s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'#43a77c', left:'30%', bottom:-280, filter:'blur(120px)', opacity:.08, mixBlendMode:'multiply', animation:'tir-drift3 30s ease-in-out infinite' }} />
          {Array.from({ length: 18 }, (_, i) => {
            const colors = ['rgba(255,107,0,.55)', 'rgba(58,134,255,.5)', 'rgba(67,167,124,.5)', 'rgba(51,67,103,.3)']
            const c = colors[i % colors.length]
            const size = 2 + (i * 1.3) % 3
            return (
              <div key={i} style={{
                position:'absolute', bottom:-10,
                width:size, height:size, borderRadius:'50%',
                background:c, boxShadow:`0 0 6px ${c}`,
                left:`${(i * 76) % 1366}px`,
                animationName:'tir-rise', animationTimingFunction:'linear', animationIterationCount:'infinite',
                animationDuration:`${12 + (i * 1.1) % 10}s`,
                animationDelay:`-${(i * 0.8) % 20}s`,
              }} />
            )
          })}
        </div>

        {/* Header */}
        <div
          className="absolute left-0 top-0 w-[1366px] h-[104px] flex items-center justify-between px-[50px]"
          style={{ background: '#334367', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
        >
          <div className="flex items-center gap-[16px]">
            <img alt="HyGear logo" className="h-[40px] w-[67px] object-contain" src={imgLogo} />
            <p className="font-semibold text-[36px] leading-[46px] text-white whitespace-nowrap">John Smith</p>
          </div>
          <div className="bg-[#319f70] h-[54px] w-[100px] rounded-[10px] flex items-center justify-center">
            <p className="font-bold text-[26px] leading-[34px] text-white">S1</p>
          </div>
        </div>

        {/* REST timer card */}
        <div
          className="absolute left-[50px] top-[154px] w-[869px] h-[420px] flex items-center gap-[48px] px-[28px] py-[28px]"
          style={{ background: 'linear-gradient(248.9deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)', borderRadius: '36px 18px 36px 36px' }}
        >
          {/* Timer ring — enlarged */}
          <div className="relative shrink-0 size-[380px] flex items-center justify-center">
            <div className="absolute inset-0">
              <img alt="rest timer ring" className="size-full" src={imgDonutLg} />
            </div>
            <div className="flex flex-col items-center justify-center not-italic text-black">
              <p className="font-semibold text-[84px] leading-[90px]">0:30</p>
              <p className="font-normal text-[22px] leading-[30px] text-center">REST</p>
            </div>
          </div>

          {/* Next exercise info */}
          <div className="flex flex-col gap-[12px] items-start w-[440px]">
            <div className="flex flex-col items-start text-black">
              <p className="font-normal text-[18px] leading-[28px] whitespace-nowrap">NEXT</p>
              <p className="font-semibold text-[36px] leading-[46px] whitespace-nowrap">Decline Chest Press</p>
            </div>
            <div className="flex gap-[12px] w-full">
              {[
                { label: 'SETS', value: '0/4', bg: 'bg-[#5a6187]', textColor: 'text-white' },
                { label: 'WORK', value: '0:45', bg: 'bg-[#758db2]', textColor: 'text-white' },
                { label: 'Reps', value: '8', bg: 'bg-white', textColor: 'text-black' },
                { label: 'Weight', value: '80 kg', bg: 'bg-white', textColor: 'text-black' },
              ].map(({ label, value, bg, textColor }) => (
                <div key={label} className={`${bg} flex-1 h-[74px] rounded-[10px] flex flex-col gap-[2px] items-center justify-center p-[18px] ${textColor} text-center`}>
                  <p className="font-normal text-[16px] leading-[24px] whitespace-nowrap">{label}</p>
                  <p className="font-bold text-[24px] leading-[34px] whitespace-nowrap">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Gear To Use card */}
        <div className="absolute left-[50px] top-[594px] w-[280px] h-[380px] bg-[#def2e8] rounded-[24px] flex flex-col items-center justify-between p-[28px]">
          <div className="flex gap-[6px] items-center justify-center">
            <Barbell size={28} weight="bold" className="text-black shrink-0" />
            <p className="font-semibold text-[20px] leading-[28px] text-black whitespace-nowrap">Next Gear To Use</p>
          </div>
          <div className="flex flex-col gap-[8px] items-center w-full">
            <div className="flex flex-col h-[130px] items-start justify-between w-full">
              {/* Bluetooth + Battery row */}
              <div className="flex gap-[5px] items-start w-full">
                <div className="bg-[#43a77c] flex items-center justify-center p-[8px] rounded-[8px] shrink-0 w-[40px] h-[40px]">
                  <img alt="bluetooth" className="size-[24px]" src={imgBluetooth} />
                </div>
                <div className="bg-white flex-1 flex gap-[6px] items-center justify-center p-[8px] rounded-[8px]">
                  <BatteryFull size={24} className="text-black shrink-0" />
                  <p className="font-normal text-[16px] leading-[24px] text-black text-center whitespace-nowrap">99%</p>
                </div>
              </div>
              {/* Device info */}
              <div className="bg-white flex flex-col gap-[4px] h-[80px] items-start justify-center p-[12px] rounded-[8px] w-full">
                <div className="flex gap-[6px] items-start">
                  <Barbell size={24} className="text-black shrink-0" />
                  <p className="font-normal text-[14px] leading-[22px] text-black">Device</p>
                </div>
                <p className="font-semibold text-[16px] leading-[24px] text-black">Bands+</p>
              </div>
            </div>
            {/* Gear image */}
            <div className="bg-white h-[190px] overflow-hidden rounded-[12px] w-full flex items-center justify-center">
              <img alt="gear equipment" className="h-[170px] w-[101px] object-contain" src={imgGear} />
            </div>
          </div>
        </div>

        {/* My Workout Targets card */}
        <div
          className="absolute left-[380px] top-[594px] w-[539px] h-[380px] flex flex-col items-center justify-between p-[28px]"
          style={{ background: 'linear-gradient(87.4deg, #435a97 0%, #6685cd 180%)', borderRadius: '36px 18px 36px 36px' }}
        >
          <div className="flex gap-[6px] items-center justify-center">
            <User size={28} className="text-white shrink-0" />
            <p className="font-semibold text-[20px] leading-[28px] text-white whitespace-nowrap">My Workout Targets</p>
          </div>
          {/* Donut chart */}
          <div className="relative shrink-0 size-[220px] flex items-center justify-center">
            <img alt="workout targets donut" className="absolute inset-0 size-full" src={imgDonutSm} />
            <div className="flex flex-col items-center text-white">
              <p className="font-semibold text-[24px] leading-[34px]">100%</p>
              <p className="font-light text-[14px] leading-[22px]">Complete</p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex flex-col gap-[12px] items-start w-full">
            {[
              { dot: 'bg-[#43a77c]', label: 'Reps', value: '96/120' },
              { dot: 'bg-[#758db2]', label: 'Weight', value: '624/960 kg' },
              { dot: 'bg-[#dddfe9]', label: 'Sets', value: '9/12' },
            ].map(({ dot, label, value }) => (
              <div key={label} className="flex items-center justify-between w-full">
                <div className="flex gap-[8px] items-center">
                  <div className={`${dot} rounded-full shrink-0 size-[8px]`} />
                  <p className="font-normal text-[16px] leading-[24px] text-white whitespace-nowrap">{label}</p>
                </div>
                <p className="font-semibold text-[16px] leading-[24px] text-white whitespace-nowrap">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Training Structure panel (narrower) */}
        <div className="absolute left-[1036px] top-[154px] w-[280px] h-[820px] bg-white border-2 border-[#43a77c] flex items-center justify-center overflow-hidden py-[26px] px-[2px]" style={{ borderRadius: '36px 18px 36px 36px' }}>
          {/* Left scroll indicator */}
          <div className="h-full w-[16px] shrink-0 relative">
            <img alt="" className="absolute inset-0 size-full object-fill" src={imgScrollL} />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-[16px] items-start h-full w-[244px] overflow-hidden">
            <div className="flex gap-[8px] items-center justify-center shrink-0">
              <SquaresFour size={34} weight="fill" className="text-black shrink-0" />
              <p className="font-bold text-[24px] leading-[34px] text-black whitespace-nowrap">Training structure</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center w-full overflow-hidden flex-1">
              {SETS.map((s, i) => <SetRow key={i} {...s} />)}
              <div className="bg-[#dddfe9] flex flex-col items-start p-[12px] rounded-[10px] shrink-0 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="font-semibold text-[18px] leading-[28px] text-black whitespace-nowrap">Abdominal</p>
                  <p className="font-normal text-[16px] leading-[24px] text-black">5s</p>
                </div>
              </div>
              <div className="bg-[#edf3ef] flex flex-col items-start p-[12px] rounded-[10px] shrink-0 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="font-semibold text-[18px] leading-[28px] text-black whitespace-nowrap">Take The Straps</p>
                  <p className="font-normal text-[16px] leading-[24px] text-black">15s</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right scroll indicator */}
          <div className="h-full w-[16px] shrink-0 relative">
            <img alt="" className="absolute inset-0 size-full object-fill" src={imgScrollR} />
          </div>
        </div>

      </div>
    </ScaledFrame>
  )
}
