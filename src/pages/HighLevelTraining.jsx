import { useState } from 'react'
import { Timer, ArrowsCounterClockwise, Stack, Barbell as BarbellIcon } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'

const LABEL_ICON = {
  'Time:':      Timer,
  'Reps:':      ArrowsCounterClockwise,
  'Sets/Reps:': Stack,
  'Weight:':    BarbellIcon,
}
const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png";
const imgCopyOfCopyOfGear1Render025 = "/assets/gear-render.png";
const imgSpiderXRightSideLightsOff1 = "/assets/spider-x.png";
const imgRope = "/assets/rope.png";
const imgCopyOfHybarRender0061 = "/assets/hybar.png";
const imgBarbell = "/assets/barbell-hl.png";
const imgArrowsClockwise = "/assets/arrows-hl.png";
const imgBarbell1 = "/assets/equipment-icon.png";
const imgThermometer = "/assets/thermo-warmup.png";
const imgThermometer1 = "/assets/thermo-block.png";
const imgThermometer2 = "/assets/thermo-cooldown.png";

export default function HighLevelTraining() {
  const [option, setOption] = useState(1)
  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — high level training" data-node-id="376:5367">
      <div className="absolute content-stretch flex items-center justify-between left-0 p-[50px] top-0 w-[1920px]" data-name="Container" data-node-id="376:5368">
        <div className="h-[42px] relative shrink-0" data-name="Container" data-node-id="376:5369">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
            <div className="h-[40px] relative shrink-0 w-[67px]" data-name="Habeasts_by_hygear_logo_2 1" data-node-id="376:5370">
              <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[124.03%] left-[12.55%] max-w-none top-[-12.01%] w-[74.9%]" src={imgHabeastsByHygearLogo21} />
              </div>
            </div>
            <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:5371">
              Studio name
            </p>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[36px] h-[888px] items-start left-[28px] top-[142px] w-[1820px]" data-name="Container" data-node-id="382:11282">
        <div className="relative shrink-0 w-[1820px]" data-node-id="389:13013">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[36px] items-start relative w-full">
            <div className="bg-[#334367] content-stretch flex flex-col h-[266px] items-center justify-center p-[24px] relative rounded-[16px] shrink-0 w-[650px]" data-name="Container" data-node-id="382:11283">
              <div className="content-stretch flex flex-col gap-[24px] items-start justify-end relative shrink-0" data-node-id="389:13048">
                <p className="font-poppins font-bold leading-[66px] not-italic relative shrink-0 text-[48px] text-white whitespace-nowrap" data-node-id="382:11285">
                  Upper Body Power
                </p>
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-node-id="382:12867">
                  <div className="bg-white content-stretch flex gap-[var(--spacing,0px)] items-center justify-center px-[var(--h-padding,24px)] py-[6px] relative rounded-[var(--radius\/full,999px)] shrink-0" data-name="Buttons" data-node-id="382:12868">
                    <div className="flex flex-col font-poppins font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap" data-node-id="382:12869">
                      <p className="leading-[28px]">Strength Training</p>
                    </div>
                  </div>
                  <div className="bg-white content-stretch flex gap-[var(--spacing,0px)] items-center justify-center px-[var(--h-padding,24px)] py-[6px] relative rounded-[var(--radius\/full,999px)] shrink-0" data-name="Buttons" data-node-id="382:12870">
                    <div className="flex flex-col font-poppins font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap" data-node-id="382:12871">
                      <p className="leading-[28px]">Push Focus</p>
                    </div>
                  </div>
                  <div className="bg-white content-stretch flex gap-[var(--spacing,0px)] items-center justify-center px-[var(--h-padding,24px)] py-[6px] relative rounded-[var(--radius\/full,999px)] shrink-0" data-name="Buttons" data-node-id="382:12872">
                    <div className="flex flex-col font-poppins font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center whitespace-nowrap" data-node-id="382:12873">
                      <p className="leading-[28px]">50 Minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#fb6340] content-stretch flex flex-col h-[266px] items-start justify-between p-[36px] relative rounded-[16px] shrink-0 w-[600px]" data-name="Container" data-node-id="382:11288">
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="392:13437">
                <div className="relative shrink-0 size-[46px]" data-name="Barbell" data-node-id="392:13426">
                  <img alt="" className="absolute block max-w-none size-full" src={imgBarbell} />
                </div>
                <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-white whitespace-pre" data-node-id="382:11290">{`Training  Goal`}</p>
              </div>
              <p className="font-poppins font-normal leading-[34px] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="382:11292">
                Full Body work that combines dynamic strength, static stability, and aerobics.
              </p>
              <div className="bg-white content-stretch flex gap-[var(--spacing,12px)] items-center pr-[16px] relative rounded-[var(--radius\/full,999px)] shrink-0" data-name="Buttons" data-node-id="392:13482">
                <div className="relative shrink-0 size-[48px]" data-name="ArrowsClockwise" data-node-id="392:13485">
                  <img alt="" className="absolute block max-w-none size-full" src={imgArrowsClockwise} />
                </div>
                <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-center whitespace-nowrap" data-node-id="392:13483">
                  <p className="leading-[34px]">Reps 0/1800</p>
                </div>
              </div>
            </div>
            <div className="bg-[#62c098] flex flex-[1_0_0] flex-col gap-[24px] h-[266px] items-start min-w-px p-[36px] rounded-[16px]">
              {/* Header */}
              <div className="flex gap-[10px] items-center shrink-0">
                <img alt="" className="w-[36px] h-[36px] object-contain" src={imgBarbell1} />
                <p className="font-poppins font-semibold text-[30px] text-black">Equipment</p>
              </div>
              {/* Items */}
              <div className="flex gap-[12px] w-full flex-1">
                {[
                  { src: imgCopyOfCopyOfGear1Render025, name: 'HyGear' },
                  { src: imgSpiderXRightSideLightsOff1, name: 'Spider X' },
                  { src: imgRope, name: 'Jump Rope' },
                  { src: imgCopyOfHybarRender0061, name: 'HyBar', rotate: true },
                  { src: null, name: 'GEAR X' },
                ].map((item) => (
                  <div key={item.name} className="bg-white flex-1 rounded-[12px] flex flex-col items-center justify-center gap-[8px] py-[12px] px-[8px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
                    <div className="w-[64px] h-[64px] flex items-center justify-center">
                      {item.src ? (
                        <img
                          alt={item.name}
                          src={item.src}
                          className={`max-w-full max-h-full object-contain${item.rotate ? ' -rotate-90' : ''}`}
                        />
                      ) : (
                        <div className="w-[52px] h-[52px] rounded-full bg-[#334367] flex items-center justify-center">
                          <span className="font-poppins font-bold text-white text-[16px]">GX</span>
                        </div>
                      )}
                    </div>
                    <p className="font-poppins text-[13px] text-[#2d5a3d] font-semibold text-center leading-tight">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Option toggle */}
        <div className="flex items-center gap-[12px] shrink-0 mb-[-20px]">
          <p className="font-poppins font-semibold text-[14px] text-black/40 uppercase tracking-widest">Layout</p>
          {[1, 2, 3].map(o => (
            <button
              key={o}
              onClick={() => setOption(o)}
              className="px-[20px] py-[8px] rounded-full font-poppins font-semibold text-[14px] transition-all duration-200"
              style={{
                background: option === o ? '#334367' : 'rgba(51,67,103,0.08)',
                color: option === o ? 'white' : '#334367',
              }}
            >
              Option {o}
            </button>
          ))}
        </div>

        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1820px]">
          <div className="content-stretch flex gap-[16px] items-stretch relative size-full">

          {option === 2 && (
            <>
            {/* OPTION 2 — 3 cards */}

            {/* Card 1: Warm-up & Prep */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px p-[28px] rounded-[20px]"
              style={{
                background: 'rgba(249,134,157,0.13)',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 2px 8px rgba(249,134,157,0.10), 0 8px 24px rgba(249,134,157,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer} />
                  <p className="font-poppins font-semibold text-[32px]" style={{ color: '#c0174e' }}>Warm-up & Prep</p>
                </div>
                <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(249,134,157,0.20)' }}>
                  <p className="font-poppins font-bold text-[14px]" style={{ color: '#c0174e' }}>10 Min</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full flex-1">
                {[
                  { set: 'Set 1', name: 'Arm Circles',      label: 'Time:', value: '30s', accent: '#aa0929' },
                  { set: 'Set 2', name: 'Band Pull Aparts', label: 'Time:', value: '30s', accent: '#aa0929' },
                  { set: 'Set 3', name: 'Shoulder Rotations', label: 'Time:', value: '30s', accent: '#aa0929' },
                  { set: 'Set 4', name: 'Equipment Setup',  label: 'Time:', value: '60s', accent: '#7a4500' },
                  { set: 'Set 5', name: 'Movement Demo',    label: 'Time:', value: '90s', accent: '#7a4500' },
                  { set: 'Set 6', name: 'Practice Reps',    label: 'Reps:', value: '5',   accent: '#7a4500' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: item.accent }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Main Training */}
            <div className="flex flex-[2_0_0] flex-col gap-[16px] h-full min-w-px p-[28px] rounded-[20px]"
              style={{
                background: 'rgba(67,167,124,0.13)',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 2px 8px rgba(67,167,124,0.10), 0 8px 24px rgba(67,167,124,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer1} />
                  <p className="font-poppins font-semibold text-[32px]" style={{ color: '#0f3925' }}>Main Training</p>
                </div>
                <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(67,167,124,0.20)' }}>
                  <p className="font-poppins font-bold text-[14px]" style={{ color: '#0f3925' }}>36 Min</p>
                </div>
              </div>
              {/* Two columns: Strength Dynamic + Holds Isometric */}
              <div className="flex gap-[16px] flex-1 min-h-0">
                {/* Strength Dynamic sub-column */}
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-[16px] uppercase tracking-wider mb-[2px]" style={{ color: 'rgba(15,57,37,0.55)' }}>Strength Dynamic</p>
                  {[
                    { set: 'Set 1', name: 'Chest Press',     label: 'Sets/Reps:', value: '3×12' },
                    { set: 'Set 2', name: 'Shoulder Press',  label: 'Weight:',    value: '3×12' },
                    { set: 'Set 3', name: 'Incline Press',   label: 'Weight:',    value: '3×10' },
                    { set: 'Set 4', name: 'Triceps Ext',     label: 'Weight:',    value: '3×15' },
                    { set: 'Set 5', name: 'Push-ups',        label: 'Reps:',      value: '2×10' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0f3925' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div className="w-[1px] self-stretch rounded-full" style={{ background: 'rgba(67,167,124,0.20)' }} />
                {/* Holds Isometric sub-column */}
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-[16px] uppercase tracking-wider mb-[2px]" style={{ color: 'rgba(10,42,74,0.55)' }}>Holds Isometric</p>
                  {[
                    { set: 'Set 1', name: 'Pull-ups',      label: 'Sets/Reps:', value: '3×8'  },
                    { set: 'Set 2', name: 'Rows',          label: 'Weight:',    value: '3×12' },
                    { set: 'Set 3', name: 'Bicep Curls',   label: 'Weight:',    value: '3×12' },
                    { set: 'Set 4', name: 'Lat Pulldown',  label: 'Weight:',    value: '3×10' },
                    { set: 'Set 5', name: 'Face Pulls',    label: 'Reps:',      value: '2×15' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0a2a4a' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Recovery */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px p-[28px] rounded-[20px]"
              style={{
                background: 'rgba(117,141,178,0.13)',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 2px 8px rgba(117,141,178,0.10), 0 8px 24px rgba(117,141,178,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer2} />
                  <p className="font-poppins font-semibold text-[32px]" style={{ color: '#334367' }}>Recovery</p>
                </div>
                <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(117,141,178,0.20)' }}>
                  <p className="font-poppins font-bold text-[14px]" style={{ color: '#334367' }}>10 Min</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full flex-1">
                {[
                  { set: 'Set 1', name: 'Burpees',          label: 'Reps:', value: '10',  accent: '#6b1a0e' },
                  { set: 'Set 2', name: 'Jump Squats',       label: 'Reps:', value: '15',  accent: '#6b1a0e' },
                  { set: 'Set 3', name: 'Mountain Climbers', label: 'Time:', value: '30s', accent: '#6b1a0e' },
                  { set: 'Set 4', name: 'Chest Stretch',     label: 'Time:', value: '30s', accent: '#334367' },
                  { set: 'Set 5', name: 'Shoulder Stretch',  label: 'Time:', value: '30s', accent: '#334367' },
                  { set: 'Set 6', name: 'Hip Flexor',        label: 'Time:', value: '45s', accent: '#334367' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: item.accent }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </>
          )}

          {option === 1 && (<>

            {/* Column 1: Warm-up + Demo & Prep stacked */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px">

              {/* 1. Warm-up — 5 min */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{
                  background: 'rgba(249,134,157,0.13)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 2px 8px rgba(249,134,157,0.10), 0 8px 24px rgba(249,134,157,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(20px)',
                }}>
                <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#c0174e', opacity: 0.07 }}>1</div>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#c0174e' }}>Warm-up</p>
                  </div>
                  <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(249,134,157,0.20)' }}>
                    <p className="font-poppins font-bold text-[14px]" style={{ color: '#c0174e' }}>5 Min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Arm Circles', label: 'Time:', value: '30s' },
                    { set: 'Set 2', name: 'Band Pull Aparts', label: 'Time:', value: '30s' },
                    { set: 'Set 3', name: 'Shoulder Rotations', label: 'Time:', value: '30s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#aa0929' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Demo & Prep — 5 min */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{
                  background: 'rgba(245,166,35,0.13)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 2px 8px rgba(245,166,35,0.10), 0 8px 24px rgba(245,166,35,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(20px)',
                }}>
                <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#7a4500', opacity: 0.07 }}>2</div>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#7a4500' }}>Demo & Prep</p>
                  </div>
                  <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(245,166,35,0.20)' }}>
                    <p className="font-poppins font-bold text-[14px]" style={{ color: '#7a4500' }}>5 Min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Equipment Setup', label: 'Time:', value: '60s' },
                    { set: 'Set 2', name: 'Movement Demo', label: 'Time:', value: '90s' },
                    { set: 'Set 3', name: 'Practice Reps', label: 'Reps:', value: '5' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#7a4500' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Block 1 — 18 min */}
            <div className="relative overflow-hidden flex flex-[0.95_0_0] flex-col gap-[20px] h-full min-w-px p-[24px] rounded-[20px]"
              style={{
                background: 'rgba(67,167,124,0.13)',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 2px 8px rgba(67,167,124,0.10), 0 8px 24px rgba(67,167,124,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#0f3925', opacity: 0.07 }}>3</div>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer1} />
                  <p className="font-poppins font-semibold text-[28px]" style={{ color: '#0f3925' }}>Strength Dynamic</p>
                </div>
                <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(67,167,124,0.20)' }}>
                  <p className="font-poppins font-bold text-[14px]" style={{ color: '#0f3925' }}>18 Min</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                {[
                  { set: 'Set 1', name: 'Chest Press', label: 'Sets/Reps:', value: '3x12' },
                  { set: 'Set 2', name: 'Shoulder Press', label: 'Weight:', value: '3x12' },
                  { set: 'Set 3', name: 'Incline Press', label: 'Weight:', value: '3x10' },
                  { set: 'Set 4', name: 'Triceps Ext', label: 'Weight:', value: '3x15' },
                  { set: 'Set 5', name: 'Push-ups', label: 'Reps:', value: '2x10' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0f3925' }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Block 2 — 18 min */}
            <div className="relative overflow-hidden flex flex-[0.95_0_0] flex-col gap-[20px] h-full min-w-px p-[24px] rounded-[20px]"
              style={{
                background: 'rgba(91,155,213,0.13)',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 2px 8px rgba(91,155,213,0.10), 0 8px 24px rgba(91,155,213,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(20px)',
              }}>
              <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#0a2a4a', opacity: 0.07 }}>4</div>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer1} />
                  <p className="font-poppins font-semibold text-[28px]" style={{ color: '#0a2a4a' }}>Holds Isometric</p>
                </div>
                <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(91,155,213,0.20)' }}>
                  <p className="font-poppins font-bold text-[14px]" style={{ color: '#0a2a4a' }}>18 Min</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                {[
                  { set: 'Set 1', name: 'Pull-ups', label: 'Sets/Reps:', value: '3x8' },
                  { set: 'Set 2', name: 'Rows', label: 'Weight:', value: '3x12' },
                  { set: 'Set 3', name: 'Bicep Curls', label: 'Weight:', value: '3x12' },
                  { set: 'Set 4', name: 'Lat Pulldown', label: 'Weight:', value: '3x10' },
                  { set: 'Set 5', name: 'Face Pulls', label: 'Reps:', value: '2x15' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0a2a4a' }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 5: Finisher + Cool-down stacked */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px">

              {/* 5. Finisher — 5 min */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{
                  background: 'rgba(232,93,74,0.13)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 2px 8px rgba(232,93,74,0.10), 0 8px 24px rgba(232,93,74,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(20px)',
                }}>
                <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#6b1a0e', opacity: 0.07 }}>5</div>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer2} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#6b1a0e' }}>Finisher</p>
                  </div>
                  <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(232,93,74,0.20)' }}>
                    <p className="font-poppins font-bold text-[14px]" style={{ color: '#6b1a0e' }}>5 Min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Burpees', label: 'Reps:', value: '10' },
                    { set: 'Set 2', name: 'Jump Squats', label: 'Reps:', value: '15' },
                    { set: 'Set 3', name: 'Mountain Climbers', label: 'Time:', value: '30s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#6b1a0e' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Cool-down — 5 min */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{
                  background: 'rgba(117,141,178,0.13)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 2px 8px rgba(117,141,178,0.10), 0 8px 24px rgba(117,141,178,0.14), 0 20px 40px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(20px)',
                }}>
                <div className="absolute bottom-[-24px] right-[-8px] font-poppins font-bold select-none pointer-events-none" style={{ fontSize: '160px', lineHeight: 1, color: '#334367', opacity: 0.07 }}>6</div>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer2} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#334367' }}>Cool-down</p>
                  </div>
                  <div className="flex items-center justify-center px-[14px] py-[6px] rounded-[9px]" style={{ background: 'rgba(117,141,178,0.20)' }}>
                    <p className="font-poppins font-bold text-[14px]" style={{ color: '#334367' }}>5 Min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Chest Stretch', label: 'Time:', value: '30s' },
                    { set: 'Set 2', name: 'Shoulder Stretch', label: 'Time:', value: '30s' },
                    { set: 'Set 3', name: 'Hip Flexor', label: 'Time:', value: '45s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#334367' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            </>)}

          {option === 3 && (<>
            {/* OPTION 3 — 6 cards, number badge instead of time */}

            {/* Column 1: Warm-up + Demo & Prep stacked */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px">

              {/* 1. Warm-up */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{ background: 'rgba(249,134,157,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(249,134,157,0.10), 0 8px 24px rgba(249,134,157,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#c0174e' }}>Warm-up</p>
                  </div>
                  <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(249,134,157,0.20)' }}>
                    <p className="font-poppins font-bold text-[22px]" style={{ color: '#c0174e' }}>1</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Arm Circles',       label: 'Time:', value: '30s' },
                    { set: 'Set 2', name: 'Band Pull Aparts',  label: 'Time:', value: '30s' },
                    { set: 'Set 3', name: 'Shoulder Rotations',label: 'Time:', value: '30s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#aa0929' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Demo & Prep */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{ background: 'rgba(245,166,35,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(245,166,35,0.10), 0 8px 24px rgba(245,166,35,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#7a4500' }}>Demo & Prep</p>
                  </div>
                  <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.20)' }}>
                    <p className="font-poppins font-bold text-[22px]" style={{ color: '#7a4500' }}>2</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Equipment Setup', label: 'Time:', value: '60s' },
                    { set: 'Set 2', name: 'Movement Demo',   label: 'Time:', value: '90s' },
                    { set: 'Set 3', name: 'Practice Reps',   label: 'Reps:', value: '5'   },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#7a4500' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Strength Dynamic */}
            <div className="relative overflow-hidden flex flex-[0.95_0_0] flex-col gap-[20px] h-full min-w-px p-[24px] rounded-[20px]"
              style={{ background: 'rgba(67,167,124,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(67,167,124,0.10), 0 8px 24px rgba(67,167,124,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer1} />
                  <p className="font-poppins font-semibold text-[28px]" style={{ color: '#0f3925' }}>Strength Dynamic</p>
                </div>
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(67,167,124,0.20)' }}>
                  <p className="font-poppins font-bold text-[22px]" style={{ color: '#0f3925' }}>3</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                {[
                  { set: 'Set 1', name: 'Chest Press',    label: 'Sets/Reps:', value: '3x12' },
                  { set: 'Set 2', name: 'Shoulder Press', label: 'Weight:',    value: '3x12' },
                  { set: 'Set 3', name: 'Incline Press',  label: 'Weight:',    value: '3x10' },
                  { set: 'Set 4', name: 'Triceps Ext',    label: 'Weight:',    value: '3x15' },
                  { set: 'Set 5', name: 'Push-ups',       label: 'Reps:',      value: '2x10' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0f3925' }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Holds Isometric */}
            <div className="relative overflow-hidden flex flex-[0.95_0_0] flex-col gap-[20px] h-full min-w-px p-[24px] rounded-[20px]"
              style={{ background: 'rgba(91,155,213,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(91,155,213,0.10), 0 8px 24px rgba(91,155,213,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-[12px]">
                  <img alt="" className="w-[50px] h-[50px]" src={imgThermometer1} />
                  <p className="font-poppins font-semibold text-[28px]" style={{ color: '#0a2a4a' }}>Holds Isometric</p>
                </div>
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(91,155,213,0.20)' }}>
                  <p className="font-poppins font-bold text-[22px]" style={{ color: '#0a2a4a' }}>4</p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                {[
                  { set: 'Set 1', name: 'Pull-ups',     label: 'Sets/Reps:', value: '3x8'  },
                  { set: 'Set 2', name: 'Rows',         label: 'Weight:',    value: '3x12' },
                  { set: 'Set 3', name: 'Bicep Curls',  label: 'Weight:',    value: '3x12' },
                  { set: 'Set 4', name: 'Lat Pulldown', label: 'Weight:',    value: '3x10' },
                  { set: 'Set 5', name: 'Face Pulls',   label: 'Reps:',      value: '2x15' },
                ].map((item) => (
                  <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#0a2a4a' }}>
                        <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                    </div>
                    <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                      {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                      <p className="font-poppins text-[13px] text-black">{item.label}</p>
                      <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 5: Finisher + Cool-down stacked */}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] h-full min-w-px">

              {/* 5. Finisher */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{ background: 'rgba(232,93,74,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(232,93,74,0.10), 0 8px 24px rgba(232,93,74,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer2} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#6b1a0e' }}>Finisher</p>
                  </div>
                  <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(232,93,74,0.20)' }}>
                    <p className="font-poppins font-bold text-[22px]" style={{ color: '#6b1a0e' }}>5</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Burpees',           label: 'Reps:', value: '10'  },
                    { set: 'Set 2', name: 'Jump Squats',        label: 'Reps:', value: '15'  },
                    { set: 'Set 3', name: 'Mountain Climbers',  label: 'Time:', value: '30s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#6b1a0e' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Cool-down */}
              <div className="relative overflow-hidden flex flex-[1_0_0] flex-col gap-[16px] min-h-px p-[24px] rounded-[20px]"
                style={{ background: 'rgba(117,141,178,0.13)', border: '1px solid rgba(255,255,255,0.75)', boxShadow: '0 2px 8px rgba(117,141,178,0.10), 0 8px 24px rgba(117,141,178,0.14), 0 20px 40px rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[12px]">
                    <img alt="" className="w-[50px] h-[50px]" src={imgThermometer2} />
                    <p className="font-poppins font-semibold text-[28px]" style={{ color: '#334367' }}>Cool-down</p>
                  </div>
                  <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(117,141,178,0.20)' }}>
                    <p className="font-poppins font-bold text-[22px]" style={{ color: '#334367' }}>6</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  {[
                    { set: 'Set 1', name: 'Chest Stretch',    label: 'Time:', value: '30s' },
                    { set: 'Set 2', name: 'Shoulder Stretch', label: 'Time:', value: '30s' },
                    { set: 'Set 3', name: 'Hip Flexor',       label: 'Time:', value: '45s' },
                  ].map((item) => (
                    <div key={item.set} className="flex items-center justify-between p-[10px] rounded-[10px] w-full" style={{ background: 'rgba(255,255,255,0.80)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-[8px] items-center min-w-0">
                        <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[5px] shrink-0" style={{ background: '#334367' }}>
                          <p className="font-poppins font-bold text-[10px] text-white whitespace-nowrap">{item.set}</p>
                        </div>
                        <p className="font-poppins font-semibold text-[14px] text-black truncate">{item.name}</p>
                      </div>
                      <div className="flex gap-[6px] shrink-0 ml-[8px] items-center">
                        {(() => { const LI = LABEL_ICON[item.label]; return LI ? <LI size={11} className="text-black/50 shrink-0" /> : null })()}
                        <p className="font-poppins text-[13px] text-black">{item.label}</p>
                        <p className="font-poppins font-bold text-[13px] text-black">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </>)}

          </div>
        </div>
      </div>
    </div>
    </ScaledFrame>
  );
}
