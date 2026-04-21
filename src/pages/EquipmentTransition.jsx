import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { Barbell, ArrowsClockwise } from '@phosphor-icons/react'

const REST_SECONDS = 30

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Bands+',
  image: 'https://www.figma.com/api/mcp/asset/0dfe2e16-86bd-4710-ba7b-c1f333f1687c',
}

const ANCHOR_INTRO       = 'Please note'
const ANCHOR_INSTRUCTION = 'Change to this anchor point'
const ANCHOR_IMAGE       = '/assets/anchor-point.png'

function FocusRing({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      pointerEvents: 'none', zIndex: 20,
      boxShadow: `0 0 0 4px ${color}, 0 0 32px color-mix(in srgb, ${color} 60%, transparent)`,
    }} />
  )
}

function UrgentOverlay({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      pointerEvents: 'none', zIndex: 10,
      '--c': color,
      animation: 'et-urgentGlow 0.75s ease-in-out infinite',
    }} />
  )
}

/* ── Full-size right panel cards (1334×888) ─────────────────────── */

function NextGearFull({ color, grad, isFocused, isUrgent }) {
  return (
    <div
      className="flex flex-col gap-[36px] items-start relative overflow-hidden"
      style={{
        width: 1334, height: 888,
        padding: 36,
        background: grad,
        borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
      }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex gap-[16px] items-center shrink-0">
        <Barbell size={46} color={color} weight="bold" />
        <span className="font-poppins font-semibold text-[56px] leading-[66px] text-black whitespace-nowrap">
          Next Gear To Use
        </span>
      </div>
      <div className="flex flex-col gap-[16px] flex-1 items-center justify-end min-h-0 w-full">
        <div
          className="flex flex-col gap-[8px] items-start justify-center rounded-[24px] w-full shrink-0"
          style={{ background: color, padding: 36 }}
        >
          <span className="font-poppins font-normal text-[28px] leading-[38px] text-white">
            {GEAR.deviceName}
          </span>
          <span className="font-poppins font-semibold text-[36px] leading-[46px] text-white">
            {GEAR.deviceLabel}
          </span>
        </div>
        <div
          className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1 min-h-0 w-full"
          style={{ background: 'white' }}
        >
          <img
            src={GEAR.image}
            alt={GEAR.deviceLabel}
            style={{ maxHeight: 440, maxWidth: '60%', objectFit: 'contain', animation: 'et-float 3.2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  )
}

function SwitchAnchorFull({ color, grad, isFocused, isUrgent }) {
  return (
    <div
      className="flex flex-col gap-[36px] items-start relative overflow-hidden"
      style={{
        width: 1334, height: 888,
        padding: 36,
        background: grad,
        borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
      }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex gap-[16px] items-center shrink-0">
        <ArrowsClockwise size={46} color="#fff" weight="bold" />
        <span className="font-poppins font-semibold text-[56px] leading-[66px] text-white whitespace-nowrap">
          Switch Anchor Point
        </span>
      </div>
      <div className="flex flex-1 min-h-0 w-full gap-[36px]">
        <div
          className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1"
          style={{ background: 'white' }}
        >
          <img
            src={ANCHOR_IMAGE}
            alt="anchor device"
            style={{ maxWidth: '60%', maxHeight: 500, objectFit: 'contain' }}
          />
        </div>
        <div
          className="flex flex-col justify-center relative overflow-hidden rounded-[24px] shrink-0"
          style={{ width: 480, padding: '36px 48px', gap: 16, background: color }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)', animation: 'et-shimmer 9s ease-in-out infinite', pointerEvents: 'none' }} />
          <span className="font-poppins font-light text-white" style={{ fontSize: 28, lineHeight: '38px', position: 'relative' }}>
            {ANCHOR_INTRO}
          </span>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px', position: 'relative' }}>
            {ANCHOR_INSTRUCTION}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Compact cards (450×350) ────────────────────────────────────── */

function NextGearCompact({ color, grad, isFocused, isUrgent }) {
  return (
    <div
      className="flex flex-col relative"
      style={{ width: 450, height: 350, padding: 36, gap: 18, background: grad, borderRadius: '36px 18px 36px 36px', boxSizing: 'border-box' }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex items-center" style={{ gap: 10 }}>
        <Barbell size={24} color="#fff" weight="bold" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 22, lineHeight: '26px' }}>Next Gear To Use</span>
      </div>
      <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
        <div className="flex flex-col justify-center relative overflow-hidden" style={{ flex: '1 1 0', minWidth: 0, padding: 12, gap: 6, background: color, borderRadius: '16px 8px 16px 16px' }}>
          <span className="font-poppins font-light text-white" style={{ fontSize: 16, lineHeight: '22px', position: 'relative' }}>{GEAR.deviceName}</span>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 18, lineHeight: '26px', position: 'relative' }}>{GEAR.deviceLabel}</span>
        </div>
        <div className="flex items-center justify-center overflow-hidden" style={{ flex: '1 1 0', minWidth: 0, background: '#fff', borderRadius: '16px 8px 16px 16px' }}>
          <img src={GEAR.image} alt="device" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  )
}

function SwitchAnchorCompact({ color, grad, isFocused, isUrgent }) {
  return (
    <div
      className="flex flex-col relative"
      style={{ width: 450, height: 350, padding: 36, gap: 18, background: grad, borderRadius: '36px 18px 36px 36px', boxSizing: 'border-box' }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex items-center" style={{ gap: 10 }}>
        <ArrowsClockwise size={24} color="#fff" weight="bold" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 22, lineHeight: '26px' }}>Switch Anchor Point</span>
      </div>
      <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
        <div className="flex items-center justify-center overflow-hidden relative" style={{ flex: '1 1 0', minWidth: 0, background: '#fff', borderRadius: '16px 8px 16px 16px' }}>
          <img src={ANCHOR_IMAGE} alt="anchor" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div className="flex flex-col justify-center relative overflow-hidden" style={{ flex: '1.4 1 0', minWidth: 0, padding: 12, gap: 6, background: color, borderRadius: '16px 8px 16px 16px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)', animation: 'et-shimmer 9s ease-in-out infinite', pointerEvents: 'none' }} />
          <span className="font-poppins font-light text-white" style={{ fontSize: 16, lineHeight: '22px', position: 'relative' }}>{ANCHOR_INTRO}</span>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 18, lineHeight: '26px', position: 'relative' }}>{ANCHOR_INSTRUCTION}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────── */
export default function EquipmentTransition({ zoneIdx = 3 }) {
  const ZONE  = ZONES[zoneIdx]
  const COLOR = ZONE.color
  const GRAD  = `linear-gradient(180deg, color-mix(in srgb, ${COLOR} 60%, transparent) 0%, color-mix(in srgb, ${COLOR} 30%, transparent) 100%)`

  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  const isUrgent  = timer <= 5 && timer > 0
  const phase     = timer > 20 ? 'prep'
                  : timer > 10 ? 'anchor'
                  : timer > 5  ? 'compact-a'
                  :              'compact-b'
  const isCompact = phase === 'compact-a' || phase === 'compact-b'

  return (
    <ScaledFrame>
      <StageBackground>
        <style>{`
          @keyframes et-enter     { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:none; } }
          @keyframes et-fadeSlide { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
          @keyframes et-float     { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-14px) scale(1.05); } }
          @keyframes et-shimmer   { 0%,100% { opacity:0; transform:translateX(-100%); } 30%,70% { opacity:1; } 50% { transform:translateX(100%); } }
          @keyframes et-urgentGlow {
            0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent),
                                  0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
            50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent),
                                  0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
          }
        `}</style>

        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

          {/* ── Timer — original position/size, moves to center in compact ── */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: isCompact ? 536 : 50,
              top: 142,
              width: isCompact ? 600 : 450,
              height: isCompact ? 888 : 450,
              background: GRAD,
              borderRadius: '36px 18px 36px 36px',
              animation: 'et-enter 0.5s ease-out both',
              transition: 'all 0.6s ease',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}
            <CountdownRing
              size={isCompact ? 420 : 280}
              value={timer}
              max={REST_SECONDS}
              label="REST"
              color={COLOR}
              textColor="white"
              trackColor="white"
            />
          </div>

          {/* ── Zone card — bottom-left (always visible) ─────────── */}
          <div
            className="absolute flex flex-col items-start"
            style={{
              left: 50,
              top: isCompact ? 528 : 628,
              width: 450,
              height: isCompact ? 502 : 402,
              padding: 36, gap: 36,
              borderBottom: `8px solid ${COLOR}`,
              background: `color-mix(in srgb, ${COLOR} 12%, #fff)`,
              borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'et-enter 0.5s 0.08s ease-out both',
              transition: 'all 0.6s ease',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}
            <div style={{ borderBottom: `1px solid ${COLOR}`, paddingBottom: 8, width: '100%' }}>
              <span className="font-poppins font-semibold text-[28px] leading-[38px]" style={{ color: COLOR }}>
                ZONE {ZONE.id}
              </span>
            </div>
            <span className="font-poppins font-semibold text-[36px] leading-[46px] text-black">{ZONE.label}</span>
            <span className="font-poppins font-light text-[28px] leading-[38px] text-black">{ZONE.desc}</span>
          </div>

          {/* ── Right panel — full-size rotating cards ────────────── */}
          {phase === 'prep' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <NextGearFull isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}
          {phase === 'anchor' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <SwitchAnchorFull isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}

          {/* ── Compact slot — top-left ───────────────────────────── */}
          {phase === 'compact-a' && (
            <div key="compact-a" className="absolute" style={{ left: 50, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <SwitchAnchorCompact isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}
          {phase === 'compact-b' && (
            <div key="compact-b" className="absolute" style={{ left: 50, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <NextGearCompact isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}

        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
