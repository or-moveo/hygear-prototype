import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import ScaledFrame from '../components/ScaledFrame'

const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png"

const NEXT_VIDEO_URL =
  'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8'

const ZONES = [
  { id: 1, label: 'BASE',  hebrew: 'בסיס',  color: '#0ea5e9', bg: '#e0f2fe', text: '#0c4a6e', desc: 'Light & easy. Full range of motion. No fatigue.' },
  { id: 2, label: 'FLOW',  hebrew: 'זרימה', color: '#22c55e', bg: '#43a77c', text: '#ffffff', desc: 'Controlled. Sustainable for the full set.' },
  { id: 3, label: 'BUILD', hebrew: 'בנייה', color: '#ca8a04', bg: '#fef08a', text: '#713f12', desc: 'Challenging. Muscle burning. Technique stays solid.' },
  { id: 4, label: 'PRIME', hebrew: 'פריים', color: '#ea580c', bg: '#fb6340', text: '#ffffff', desc: 'Very hard. 2–3 reps in the tank. Full engagement.' },
  { id: 5, label: 'PEAK',  hebrew: 'שיא',   color: '#dc2626', bg: '#fee2e2', text: '#7f1d1d', desc: 'Max effort. Muscle failure. All or nothing.' },
]

const NEXT_EXERCISE = { name: 'Narrow Grip Chest Press', sets: 3, reps: 12, zone: 3 }

function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}))
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])
  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      muted loop playsInline autoPlay
    />
  )
}

export default function InRest() {
  const zone = ZONES[NEXT_EXERCISE.zone - 1]

  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — In Rest">

      {/* Header — matches all other pages */}
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
            {[
              { label: 'Warm-up',   duration: '5 Min',  state: 'done'    },
              { label: 'REST',      duration: '0:15',   state: 'active'  },
              { label: 'Block 1',   duration: '18 Min', state: 'next'    },
              { label: 'Block 2',   duration: '18 Min', state: 'upcoming'},
              { label: 'Cool-down', duration: '5 Min',  state: 'upcoming'},
            ].map((item) => {
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
                  <p className={`font-poppins font-semibold leading-[28px] text-[18px] ${textColor} ${strike}`}>{item.label}</p>
                  <p className={`font-poppins font-normal leading-[24px] text-[16px] ${textColor} opacity-80`}>{item.duration}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="absolute flex gap-[28px] left-[51px] top-[142px] w-[1420px] h-[882px]">

        {/* Video — large left card */}
        <div className="relative flex-[1_0_0] min-w-px rounded-[16px] overflow-hidden bg-[#f8f7f7]">
          <VideoPlayer src={NEXT_VIDEO_URL} />
          {/* Overlay: exercise label at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-[36px] py-[32px]">
            <p className="font-poppins font-normal text-[16px] text-white/70 uppercase tracking-[0.12em] mb-[6px]">Next Exercise</p>
            <p className="font-poppins font-bold text-[40px] leading-tight text-white">{NEXT_EXERCISE.name}</p>
          </div>
        </div>

        {/* Right column: timer + goal + zone */}
        <div className="flex flex-col gap-[24px] w-[460px] shrink-0 h-full">

          {/* REST Countdown — navy card like the Training Name card */}
          <div className="bg-[#334367] content-stretch flex flex-col items-center justify-center rounded-[16px] p-[36px] gap-[8px]" style={{ height: '290px' }}>
            <p className="font-poppins font-normal text-[16px] text-white/60 uppercase tracking-widest">Rest ends in</p>
            <p className="font-poppins font-bold text-white leading-none" style={{ fontSize: '108px', letterSpacing: '-0.03em' }}>0:15</p>
            <div className="bg-white/20 px-[20px] py-[6px] rounded-full mt-[4px]">
              <p className="font-poppins font-semibold text-[16px] text-white tracking-widest uppercase">REST</p>
            </div>
          </div>

          {/* Goal — green card like Block 1 */}
          <div className="bg-[#43a77c] content-stretch flex items-center justify-between rounded-[16px] px-[36px] py-[28px] shrink-0">
            <div className="flex flex-col gap-[4px]">
              <p className="font-poppins font-normal text-[16px] text-white/70 uppercase tracking-widest">Goal</p>
              <p className="font-poppins font-bold text-white leading-none" style={{ fontSize: '56px', letterSpacing: '-0.02em' }}>
                {NEXT_EXERCISE.sets} × {NEXT_EXERCISE.reps}
              </p>
            </div>
            <p className="font-poppins font-normal text-[20px] text-white/60">Sets × Reps</p>
          </div>

          {/* Zone — flex-1 card with zone color */}
          <div
            className="content-stretch flex flex-col justify-between rounded-[16px] p-[36px] flex-1"
            style={{ background: zone.bg }}
          >
            <div className="flex items-center gap-[10px]">
              <div className="w-[12px] h-[12px] rounded-full shrink-0" style={{ background: zone.color }} />
              <p className="font-poppins font-bold text-[13px] uppercase tracking-widest" style={{ color: zone.color }}>
                Zone {zone.id}
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-[14px] mb-[12px]">
                <p className="font-poppins font-bold leading-none" style={{ fontSize: '64px', letterSpacing: '-0.03em', color: zone.text }}>
                  {zone.label}
                </p>
                <p className="font-poppins font-semibold text-[32px]" style={{ color: zone.text, opacity: 0.5 }}>
                  {zone.hebrew}
                </p>
              </div>
              <p className="font-poppins font-normal text-[18px] leading-snug" style={{ color: zone.text, opacity: 0.75 }}>
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
