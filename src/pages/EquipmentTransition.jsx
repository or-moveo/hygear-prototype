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

const ANCHOR_INTRO        = 'Please note'
const ANCHOR_INSTRUCTION  = 'Change to this anchor point'
const ANCHOR_IMAGE        = '/assets/anchor-point.png'

/* ── Shared sub-components ─────────────────────────────────────── */

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

/* ── Next Gear card (full 600×888 + compact 450×350) ───────────── */
function NextGearCard({ isFocused, compact, color, grad, isUrgent }) {
  if (compact) {
    return (
      <div
        className="flex flex-col relative"
        style={{
          width: 450, height: 350,
          padding: 36, gap: 18,
          background: grad, borderRadius: '36px 18px 36px 36px',
          boxSizing: 'border-box',
        }}
      >
        {isFocused && <FocusRing color={color} />}
        {isUrgent && <UrgentOverlay color={color} />}
        <div className="flex items-center" style={{ gap: 10 }}>
          <Barbell size={24} color="#fff" weight="bold" />
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: 22, lineHeight: '26px', color: '#fff' }}>
            Next Gear To Use
          </span>
        </div>
        <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
          <div
            className="flex flex-col justify-center relative overflow-hidden"
            style={{ flex: '1 1 0', minWidth: 0, padding: 12, gap: 6, background: color, borderRadius: '16px 8px 16px 16px' }}
          >
            <span className="font-poppins font-light text-white" style={{ fontSize: 16, lineHeight: '22px', position: 'relative' }}>
              {GEAR.deviceName}
            </span>
            <span className="font-poppins font-semibold text-white" style={{ fontSize: 18, lineHeight: '26px', position: 'relative' }}>
              {GEAR.deviceLabel}
            </span>
          </div>
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ flex: '1 1 0', minWidth: 0, background: '#fff', borderRadius: '16px 8px 16px 16px' }}
          >
            <img
              src={GEAR.image} alt="device"
              style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', animation: 'et-float 3.2s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Full card — 600×888
  return (
    <div
      className="flex flex-col relative overflow-hidden"
      style={{
        width: 600, height: 888,
        padding: 36, gap: 24,
        background: grad, borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
      }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex items-center shrink-0" style={{ gap: 16 }}>
        <Barbell size={36} color="#fff" weight="bold" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>
          Next Gear To Use
        </span>
      </div>
      <div
        className="shrink-0 flex flex-col gap-[8px] items-start justify-center rounded-[24px] w-full"
        style={{ background: color, padding: '24px 36px' }}
      >
        <span className="font-poppins font-normal text-white" style={{ fontSize: 22, lineHeight: '32px' }}>
          {GEAR.deviceName}
        </span>
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 28, lineHeight: '38px' }}>
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
          style={{ maxHeight: 440, maxWidth: '80%', objectFit: 'contain', animation: 'et-float 3.2s ease-in-out infinite' }}
        />
      </div>
    </div>
  )
}

/* ── Switch Anchor Point card (full 600×888 + compact 450×350) ── */
function SwitchAnchorPointCard({ isFocused, compact, color, grad, isUrgent }) {
  if (compact) {
    return (
      <div
        className="flex flex-col relative"
        style={{
          width: 450, height: 350,
          padding: 36, gap: 18,
          background: grad, borderRadius: '36px 18px 36px 36px',
          boxSizing: 'border-box',
        }}
      >
        {isFocused && <FocusRing color={color} />}
        {isUrgent && <UrgentOverlay color={color} />}
        <div className="flex items-center" style={{ gap: 10 }}>
          <ArrowsClockwise size={24} color="#fff" weight="bold" />
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: 22, lineHeight: '26px', color: '#fff' }}>
            Switch Anchor Point
          </span>
        </div>
        <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
          <div
            className="flex items-center justify-center overflow-hidden relative"
            style={{ flex: '1 1 0', minWidth: 0, background: '#fff', borderRadius: '16px 8px 16px 16px' }}
          >
            <img src={ANCHOR_IMAGE} alt="anchor" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div
            className="flex flex-col justify-center relative overflow-hidden"
            style={{ flex: '1.4 1 0', minWidth: 0, padding: 12, gap: 6, background: color, borderRadius: '16px 8px 16px 16px' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)', animation: 'et-shimmer 9s ease-in-out infinite', pointerEvents: 'none' }} />
            <span className="font-poppins font-light text-white" style={{ fontSize: 16, lineHeight: '22px', position: 'relative' }}>
              {ANCHOR_INTRO}
            </span>
            <span className="font-poppins font-semibold text-white" style={{ fontSize: 18, lineHeight: '26px', position: 'relative' }}>
              {ANCHOR_INSTRUCTION}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full card — 600×888
  return (
    <div
      className="flex flex-col relative overflow-hidden"
      style={{
        width: 600, height: 888,
        padding: 36, gap: 24,
        background: grad, borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
      }}
    >
      {isFocused && <FocusRing color={color} />}
      {isUrgent && <UrgentOverlay color={color} />}
      <div className="flex items-center shrink-0" style={{ gap: 16 }}>
        <ArrowsClockwise size={36} color="#fff" weight="bold" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>
          Switch Anchor Point
        </span>
      </div>
      <div
        className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1 min-h-0"
        style={{ background: '#fff' }}
      >
        <img
          src={ANCHOR_IMAGE}
          alt="anchor device"
          style={{ maxWidth: 338, maxHeight: 572, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div
        className="shrink-0 flex flex-col justify-center relative overflow-hidden rounded-[24px]"
        style={{ padding: '24px 36px', gap: 8, background: color, minHeight: 110 }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)', animation: 'et-shimmer 9s ease-in-out infinite', pointerEvents: 'none' }} />
        <span className="font-poppins font-light text-white" style={{ fontSize: 22, lineHeight: '32px', position: 'relative' }}>
          {ANCHOR_INTRO}
        </span>
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 28, lineHeight: '38px', position: 'relative' }}>
          {ANCHOR_INSTRUCTION}
        </span>
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

          {/* ── Timer — top-left (prep/anchor) → center (compact) ── */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: isCompact ? 536 : 50,
              top: 142,
              width: isCompact ? 600 : 450,
              height: isCompact ? 888 : 350,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
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
              left: 50, top: 528,
              width: 450, height: 502,
              padding: 36, gap: 36,
              borderBottom: `8px solid ${COLOR}`,
              background: `color-mix(in srgb, ${COLOR} 12%, #fff)`,
              borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'et-enter 0.5s 0.08s ease-out both',
              position: 'absolute',
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

          {/* ── Center rotating cards (prep / anchor) ─────────────── */}
          {phase === 'prep' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <NextGearCard isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}
          {phase === 'anchor' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <SwitchAnchorPointCard isFocused color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}

          {/* ── Compact slot — top-left (compact-a / compact-b) ───── */}
          {phase === 'compact-a' && (
            <div key="compact-a" className="absolute" style={{ left: 50, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <SwitchAnchorPointCard isFocused compact color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}
          {phase === 'compact-b' && (
            <div key="compact-b" className="absolute" style={{ left: 50, top: 142, animation: 'et-fadeSlide 0.5s ease-out both' }}>
              <NextGearCard isFocused compact color={COLOR} grad={GRAD} isUrgent={isUrgent} />
            </div>
          )}

          {/* ── Right panel — gear image (always visible) ─────────── */}
          <div
            className="absolute flex flex-col"
            style={{
              left: 1172, top: 142, width: 698, height: 888,
              padding: 36, gap: 24,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'et-enter 0.5s 0.24s ease-out both',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}
            <div
              className="shrink-0 flex flex-col gap-[8px] items-start justify-center rounded-[24px] w-full"
              style={{ background: COLOR, padding: '24px 36px' }}
            >
              <span className="font-poppins font-normal text-white" style={{ fontSize: 22, lineHeight: '32px' }}>
                {GEAR.deviceName}
              </span>
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 28, lineHeight: '38px' }}>
                {GEAR.deviceLabel}
              </span>
            </div>
            <div
              className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1 min-h-0"
              style={{ background: 'white' }}
            >
              <img
                src={GEAR.image}
                alt={GEAR.deviceLabel}
                style={{ maxHeight: 440, maxWidth: '80%', objectFit: 'contain', animation: 'et-float 3.2s ease-in-out infinite' }}
              />
            </div>
          </div>

        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
