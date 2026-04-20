import { useState, useEffect } from 'react'
import { Barbell, ArrowRight, Fire, Stack, PersonArmsSpread, Lightning, Snowflake } from '@phosphor-icons/react'
import { ZONES } from '../data/zones'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'

const ZONE_BLOCK = [
  { number: 1, label: 'Warm-Up',          zoneLabel: 'ZONE 1', Icon: Fire },
  { number: 2, label: 'Demo & Prep',      zoneLabel: 'ZONE 2', Icon: Stack },
  { number: 3, label: 'Dynamic Strength', zoneLabel: 'ZONE 3', Icon: PersonArmsSpread },
  { number: 4, label: 'Isometric Holds',  zoneLabel: 'ZONE 4', Icon: PersonArmsSpread },
  { number: 5, label: 'All Out',          zoneLabel: 'ZONE 5', Icon: Lightning },
]

const GEAR = {
  intro: 'Getting started',
  instruction: 'Make sure the device is turned on.',
  image: '/assets/rope.png',
}

const EXERCISES = [
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
  { set: 1, name: 'Arm Circles', sets: 3, reps: 10 },
]

const REST_SECONDS = 30

// Overlay that flashes a colored glow ring when urgent — placed inside any panel
function UrgentOverlay({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      pointerEvents: 'none', zIndex: 10,
      '--c': color,
      animation: 'bp-urgentGlow 0.75s ease-in-out infinite',
    }} />
  )
}

export default function BlockPreview({ zoneIdx }) {
  const zIdx = zoneIdx ?? 3
  const zone = ZONES[zIdx]
  const COLOR = zone.color
  const GRAD = `linear-gradient(180deg, color-mix(in srgb, ${COLOR} 60%, transparent) 0%, color-mix(in srgb, ${COLOR} 30%, transparent) 100%)`
  const BLOCK = ZONE_BLOCK[zIdx]
  const BlockIcon = BLOCK.Icon
  const DURATION = '5 Minutes'

  const [timer, setTimer] = useState(REST_SECONDS)
  const isUrgent = timer <= 5 && timer > 0

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <StageBackground>
        <style>{`
          @keyframes bp-enter      { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes bp-iconBounce { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-6px) scale(1.06); } }
          @keyframes bp-zonePulse  { 0%,100% { text-shadow:0 0 0 currentColor; } 50% { text-shadow:0 0 18px currentColor; } }
          @keyframes bp-float      { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-14px) scale(1.05); } }
          @keyframes bp-slideIn    { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
          @keyframes bp-shimmer    { 0%,60% { transform:translateX(-120%); } 90%,100% { transform:translateX(220%); } }
          @keyframes bp-urgentGlow {
            0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent),
                                  0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
            50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent),
                                  0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
          }
        `}</style>

        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

          {/* ── Timer top-left ─────────────────────────────── */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: 50, top: 142, width: 450, height: 350,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
              animation: 'bp-enter 0.5s ease-out both',
              position: 'absolute',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}
            <CountdownRing
              size={280} value={timer} max={REST_SECONDS}
              label="REST" color={COLOR} textColor="white" trackColor="white"
            />
          </div>

          {/* ── NEXT BLOCK bottom-left ─────────────────────── */}
          <div
            className="absolute flex flex-col justify-between"
            style={{
              left: 50, top: 528, width: 450, height: 502,
              padding: 36, background: GRAD,
              borderBottom: `8px solid ${COLOR}`,
              borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'bp-enter 0.5s 0.08s ease-out both',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}

            <div className="flex flex-col" style={{ gap: 21 }}>
              <div style={{ borderBottom: `1px solid ${COLOR}`, padding: '8px 0' }}>
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color: COLOR }}>
                  NEXT BLOCK:&nbsp;&nbsp;{BLOCK.number}
                </span>
              </div>
              <div
                className="flex items-center justify-center"
                style={{ width: 88, height: 88, background: COLOR, borderRadius: 24, animation: 'bp-iconBounce 2.6s ease-in-out infinite' }}
              >
                <BlockIcon size={50} color="#fff" weight="regular" />
              </div>
              <div className="flex flex-col" style={{ gap: 12 }}>
                <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>{BLOCK.label}</span>
                <span className="font-poppins font-normal text-white" style={{ fontSize: 24, lineHeight: '34px' }}>{DURATION}</span>
              </div>
            </div>

            <div className="relative" style={{ width: '100%', height: 54 }}>
              <div className="absolute" style={{ left: -10, right: -10, top: -10, bottom: -10, background: COLOR, mixBlendMode: 'screen', opacity: 0.2, filter: 'blur(10px)', borderRadius: 10, pointerEvents: 'none' }} />
              <div className="relative flex items-center justify-center" style={{ width: '100%', height: 54, background: '#000', borderRadius: 8, boxShadow: '0 1px 0 rgba(0,0,0,0.05), 0 4px 4px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.1)' }}>
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color: COLOR, animation: 'bp-zonePulse 2.2s ease-in-out infinite' }}>
                  {BLOCK.zoneLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── Prep next device center ────────────────────── */}
          <div
            className="absolute flex flex-col"
            style={{
              left: 536, top: 142, width: 600, height: 888,
              padding: 36, gap: 36,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'bp-enter 0.5s 0.16s ease-out both',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}

            <div className="flex items-center" style={{ gap: 16 }}>
              <Barbell size={46} color="#fff" />
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 46, lineHeight: '46px' }}>Prep next device</span>
            </div>

            <div className="flex flex-col flex-1 justify-end min-h-0" style={{ gap: 16 }}>
              {/* Instruction card with lightning shimmer */}
              <div style={{ padding: 36, gap: 12, background: COLOR, borderRadius: '24px 12px 24px 24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {/* shimmer sweep */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
                  animation: 'bp-shimmer 9s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
                <span className="font-poppins font-light text-white" style={{ fontSize: 28, lineHeight: '38px', position: 'relative' }}>{GEAR.intro}</span>
                <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px', position: 'relative' }}>{GEAR.instruction}</span>
              </div>

              {/* Device image — prominent float */}
              <div
                className="flex items-center justify-center flex-1 min-h-0 overflow-hidden"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, #fff 0%, #fff 100%), #000', borderRadius: '24px 12px 24px 24px' }}
              >
                <img
                  src={GEAR.image} alt="device"
                  style={{ maxWidth: 260, maxHeight: 440, objectFit: 'contain', animation: 'bp-float 3.2s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* ── Next Exercises right ───────────────────────── */}
          <div
            className="absolute flex flex-col"
            style={{
              left: 1172, top: 142, width: 698, height: 888,
              padding: 36, gap: 36,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
              boxSizing: 'border-box',
              animation: 'bp-enter 0.5s 0.24s ease-out both',
            }}
          >
            {isUrgent && <UrgentOverlay color={COLOR} />}

            <div className="flex items-center" style={{ gap: 16 }}>
              <ArrowRight size={46} weight="bold" color="#fff" />
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 46, lineHeight: '46px' }}>Next Exercises</span>
            </div>

            <div className="flex flex-col" style={{ gap: 16 }}>
              {EXERCISES.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{
                    padding: 18, background: '#000', borderRadius: '16px 8px 16px 16px',
                    animation: `bp-slideIn 0.4s ${0.32 + i * 0.09}s ease-out both`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* shimmer — cascades right after Getting Started sweep ends at 8.1s */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
                    animation: `bp-shimmer 9s ${2.7 + i * 0.6}s ease-in-out infinite`,
                    pointerEvents: 'none',
                  }} />
                  <div className="flex items-center" style={{ gap: 12 }}>
                    <div className="flex items-center justify-center" style={{ width: 70, height: 34, background: COLOR, borderRadius: 6 }}>
                      <span className="font-poppins font-semibold text-white" style={{ fontSize: 18, lineHeight: '28px' }}>Set {ex.set}</span>
                    </div>
                    <span className="font-poppins font-semibold text-white" style={{ fontSize: 24, lineHeight: '34px' }}>{ex.name}</span>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: 100 }}>
                    <span className="font-poppins font-bold text-white" style={{ fontSize: 24, lineHeight: '34px' }}>{ex.sets} x {ex.reps}</span>
                    <span className="font-poppins font-normal text-white" style={{ fontSize: 16, lineHeight: '24px' }}>SETS x REPS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
