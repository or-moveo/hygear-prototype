import { useState, useEffect } from 'react'
import { Barbell, ArrowRight, ArrowsClockwise, Fire, Stack, PersonArmsSpread, Lightning } from '@phosphor-icons/react'
import { ZONES } from '../data/zones'
import { BLOCK_EXERCISES } from '../data/workout'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'

const ZONE_BLOCK = [
  { number: 1, label: 'Joint Warm-Up with Bosu', zoneLabel: 'ZONE 1', Icon: Fire,               group: 'warmup' },
  { number: 2, label: 'Demo & Prep',              zoneLabel: 'ZONE 2', Icon: Stack,              group: 'warmup' },
  { number: 3, label: 'Main Block',               zoneLabel: 'ZONE 3', Icon: PersonArmsSpread,   group: 'holds'  },
  { number: 3, label: 'Main Block: Unilateral',   zoneLabel: 'ZONE 2', Icon: PersonArmsSpread,   group: 'holds'  },
  { number: 4, label: 'Iron Wall Isometrics',     zoneLabel: 'ZONE 4', Icon: Lightning,          group: 'allout' },
]

const GEAR = {
  intro: 'Getting started',
  instruction: 'Make sure the device is turned on.',
  image: '/assets/rope.png',
}

const REST_SECONDS = 30

// Pulsing focus ring applied to the active rotating card.
function FocusRing({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      pointerEvents: 'none', zIndex: 10,
      '--c': color,
      animation: 'bp-focusRing 2s ease-in-out infinite',
    }} />
  )
}

function PrepNextDeviceCard({ color, grad, isFocused, compact }) {
  if (compact) {
    // 450×350 compact layout — padding 36, equal-size instruction pill + image frame.
    return (
      <div
        className="flex flex-col relative"
        style={{
          width: 450, height: 350,
          padding: 36, gap: 18,
          background: grad, borderRadius: '36px 18px 36px 36px',
          boxSizing: 'border-box',
          transition: 'all 0.6s ease',
        }}
      >
        {isFocused && <FocusRing color={color} />}

        {/* Title row */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <Barbell size={24} color="#fff" weight="bold" />
          <span
            className="font-poppins"
            style={{ fontWeight: 600, fontSize: 22, lineHeight: '26px', color: '#fff' }}
          >
            Prep next device
          </span>
        </div>

        {/* Body row: equal-size instruction pill + image frame */}
        <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
          <div
            className="flex flex-col justify-center relative overflow-hidden"
            style={{
              flex: '1 1 0', minWidth: 0,
              padding: 12, gap: 6,
              background: color,
              borderRadius: '16px 8px 16px 16px',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
              animation: 'bp-shimmer 9s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span className="font-poppins font-light text-white" style={{ fontSize: 16, lineHeight: '22px', position: 'relative' }}>
              {GEAR.intro}
            </span>
            <span className="font-poppins font-medium text-white" style={{ fontSize: 22, lineHeight: '28px', position: 'relative' }}>
              {GEAR.instruction}
            </span>
          </div>
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{
              flex: '1 1 0', minWidth: 0,
              background: '#fff', borderRadius: '16px 8px 16px 16px',
            }}
          >
            <img
              src={GEAR.image} alt="device"
              style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col relative"
      style={{
        width: 600, height: 888,
        padding: 36, gap: 36,
        background: grad, borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
        transition: 'all 0.6s ease',
      }}
    >
      {isFocused && <FocusRing color={color} />}

      <div className="flex items-center" style={{ gap: 16 }}>
        <Barbell size={46} color="#fff" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 46, lineHeight: '46px' }}>
          Prep next device
        </span>
      </div>

      <div className="flex flex-col flex-1 justify-end min-h-0" style={{ gap: 16 }}>
        <div style={{ padding: 36, gap: 12, background: color, borderRadius: '24px 12px 24px 24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
            animation: 'bp-shimmer 9s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <span className="font-poppins font-light text-white" style={{ fontSize: 28, lineHeight: '38px', position: 'relative' }}>{GEAR.intro}</span>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px', position: 'relative' }}>{GEAR.instruction}</span>
        </div>

        <div
          className="flex items-center justify-center flex-1 min-h-0 overflow-hidden"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #fff 0%, #fff 100%), #000', borderRadius: '24px 12px 24px 24px' }}
        >
          <img
            src={GEAR.image} alt="device"
            style={{ maxWidth: 260, maxHeight: 440, objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}

const ANCHOR_IMAGE_DEFAULT = '/assets/anchor-point.png'
const ANCHOR_INTRO = 'Please note'
const ANCHOR_INSTRUCTION = 'Change to this anchor point'

function SwitchAnchorPointCard({ isFocused, compact, color, grad, image }) {
  const img = image || ANCHOR_IMAGE_DEFAULT
  if (compact) {
    // 450×350 compact layout — padding 36, equal-size image & instruction boxes.
    return (
      <div
        className="flex flex-col relative"
        style={{
          width: 450, height: 350,
          padding: 36, gap: 18,
          background: grad, borderRadius: '36px 18px 36px 36px',
          boxSizing: 'border-box',
          transition: 'all 0.6s ease',
        }}
      >
        {isFocused && <FocusRing color={color} />}

        {/* Title row */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <ArrowsClockwise size={24} color="#fff" weight="bold" />
          <span
            className="font-poppins"
            style={{ fontWeight: 600, fontSize: 22, lineHeight: '26px', color: '#fff' }}
          >
            Switch Anchor Point
          </span>
        </div>

        {/* Body row: image frame + instruction pill (pill widened to hold one-line instruction) */}
        <div className="flex flex-1 min-h-0" style={{ gap: 18 }}>
          <div
            className="flex items-center justify-center overflow-hidden relative"
            style={{
              flex: '1 1 0', minWidth: 0,
              background: '#fff', borderRadius: '16px 8px 16px 16px',
            }}
          >
            <img
              src={img} alt="anchor"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
            {/* Middle-bracket pulse highlight */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 80, height: 36,
              borderRadius: 8,
              pointerEvents: 'none',
              '--c': color,
              animation: 'bp-anchorPulse 1.6s ease-in-out infinite',
            }} />
          </div>
          <div
            className="flex flex-col justify-center relative overflow-hidden"
            style={{
              flex: '1.4 1 0', minWidth: 0,
              padding: 12, gap: 6,
              background: color,
              borderRadius: '16px 8px 16px 16px',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
              animation: 'bp-shimmer 9s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span className="font-poppins font-light text-white" style={{ fontSize: 14, lineHeight: '20px', position: 'relative', whiteSpace: 'nowrap' }}>
              {ANCHOR_INTRO}
            </span>
            <span className="font-poppins font-medium text-white" style={{ fontSize: 15, lineHeight: '22px', position: 'relative', whiteSpace: 'nowrap' }}>
              {ANCHOR_INSTRUCTION}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full 600×888 layout matching the Figma CSS spec.
  return (
    <div
      className="flex flex-col items-start relative"
      style={{
        width: 600, height: 888,
        padding: 36, gap: 36,
        background: grad, borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box',
        transition: 'all 0.6s ease',
      }}
    >
      {isFocused && <FocusRing color={color} />}

      {/* Header row (Frame 10) — 529×46 */}
      <div
        className="flex flex-row items-center justify-center"
        style={{ width: 529, height: 46, gap: 16 }}
      >
        <ArrowsClockwise size={46} color="#fff" weight="bold" />
        <span
          className="font-poppins"
          style={{
            width: 467,
            fontWeight: 600,
            fontSize: 46,
            lineHeight: '46px',
            color: '#ffffff',
          }}
        >
          Switch Anchor Point
        </span>
      </div>

      {/* Body column (Frame 14) — 528×734 */}
      <div
        className="flex flex-col items-center justify-end self-stretch"
        style={{ height: 734, gap: 16, flexGrow: 1 }}
      >
        {/* Image frame (Frame 1597880267) — 528×504, flex-grow 1 */}
        <div
          className="flex items-center justify-center self-stretch overflow-hidden relative"
          style={{
            flex: '1 1 auto',
            background: '#ffffff',
            borderRadius: '24px 12px 24px 24px',
          }}
        >
          <img
            src={img}
            alt="anchor device"
            style={{
              maxWidth: 338, maxHeight: 572, width: '100%', height: '100%', objectFit: 'contain',
            }}
          />
          {/* Middle-bracket pulse highlight */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 160, height: 70,
            borderRadius: 12,
            pointerEvents: 'none',
            '--c': color,
            animation: 'bp-anchorPulse 1.6s ease-in-out infinite',
          }} />
        </div>

        {/* Buttons block — 528×214 */}
        <div
          className="flex flex-col justify-center relative overflow-hidden"
          style={{
            width: 528, height: 214,
            padding: 36, gap: 12,
            background: color,
            borderRadius: '24px 12px 24px 24px',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
            animation: 'bp-shimmer 9s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <span
            className="font-poppins"
            style={{
              fontWeight: 300, fontSize: 28, lineHeight: '38px',
              color: '#ffffff', position: 'relative', whiteSpace: 'nowrap',
            }}
          >
            {ANCHOR_INTRO}
          </span>
          <span
            className="font-poppins"
            style={{
              fontWeight: 500, fontSize: 28, lineHeight: '38px',
              color: '#ffffff', position: 'relative', whiteSpace: 'nowrap',
            }}
          >
            {ANCHOR_INSTRUCTION}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function BlockPreview({ zoneIdx, anchorImage }) {
  const zIdx = zoneIdx ?? 3
  const zone = ZONES[zIdx]
  const COLOR = zone.color
  const GRAD = `linear-gradient(180deg, color-mix(in srgb, ${COLOR} 60%, transparent) 0%, color-mix(in srgb, ${COLOR} 30%, transparent) 100%)`
  const BLOCK = ZONE_BLOCK[zIdx]
  const BlockIcon = BLOCK.Icon
  const DURATION = '5 Minutes'
  const EXERCISES = BLOCK_EXERCISES[BLOCK.group] ?? BLOCK_EXERCISES.warmup

  const [timer, setTimer] = useState(REST_SECONDS)
  const isUrgent = timer <= 5 && timer > 0

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  // Rotation phases:
  //   30→21s: 'prep'       (full Prep Next Device centered)
  //   20→11s: 'anchor'     (full Switch Anchor Point centered)
  //   10→6s:  'compact-a'  (compact Switch Anchor Point top-left + big timer center)
  //   5→0s:   'compact-b'  (compact Prep Next Device top-left + big timer center)
  const phase =
    timer > 20 ? 'prep'
    : timer > 10 ? 'anchor'
    : timer > 5  ? 'compact-a'
    :              'compact-b'
  const isCompact = phase === 'compact-a' || phase === 'compact-b'

  return (
    <ScaledFrame>
      <StageBackground variant="light" glowColor={COLOR}>
        <style>{`
          @keyframes bp-enter      { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes bp-iconBounce { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-6px) scale(1.06); } }
          @keyframes bp-zonePulse  { 0%,100% { text-shadow:0 0 0 currentColor; } 50% { text-shadow:0 0 18px currentColor; } }
          @keyframes bp-slideIn    { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
          @keyframes bp-shimmer    { 0%,60% { transform:translateX(-120%); } 90%,100% { transform:translateX(220%); } }
          @keyframes bp-focusRing {
            0%,100% {
              box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 80%, transparent),
                          0 0 24px color-mix(in srgb, var(--c) 45%, transparent);
            }
            50% {
              box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 100%, transparent),
                          0 0 60px color-mix(in srgb, var(--c) 75%, transparent);
            }
          }
          @keyframes bp-fadeSlide {
            from { opacity:0; transform:translateY(12px) scale(0.98); }
            to   { opacity:1; transform:translateY(0) scale(1); }
          }
          @keyframes bp-urgentGlow {
            0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent),
                                  0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
            50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent),
                                  0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
          }
          @keyframes bp-anchorPulse {
            0%,100% { transform: translate(-50%, -50%) scale(1);
                      box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 70%, transparent),
                                  0 0 14px color-mix(in srgb, var(--c) 35%, transparent);
                      background: color-mix(in srgb, var(--c) 20%, transparent); }
            50%     { transform: translate(-50%, -50%) scale(1.05);
                      box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 100%, transparent),
                                  0 0 32px color-mix(in srgb, var(--c) 65%, transparent);
                      background: color-mix(in srgb, var(--c) 30%, transparent); }
          }
        `}</style>

        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

          {/* ── Timer: top-left in prep/anchor phases, center (Anchor's slot) in compact ── */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: isCompact ? 536 : 50,
              top: 142,
              width: isCompact ? 600 : 450,
              height: isCompact ? 888 : 350,
              background: GRAD, borderRadius: '36px 18px 36px 36px',
              animation: 'bp-enter 0.5s ease-out both',
              transition: 'all 0.6s ease',
            }}
          >
            {isUrgent && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                pointerEvents: 'none', zIndex: 10,
                '--c': COLOR,
                animation: 'bp-urgentGlow 0.75s ease-in-out infinite',
              }} />
            )}
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

          {/* ── Center rotating cards (Prep / Anchor) ──────── */}
          {phase === 'prep' && (
            <div
              className="absolute"
              style={{
                left: 536, top: 142,
                animation: 'bp-fadeSlide 0.5s ease-out both',
              }}
            >
              <PrepNextDeviceCard color={COLOR} grad={GRAD} isFocused />
            </div>
          )}

          {phase === 'anchor' && (
            <div
              className="absolute"
              style={{
                left: 536, top: 142,
                animation: 'bp-fadeSlide 0.5s ease-out both',
              }}
            >
              <SwitchAnchorPointCard isFocused color={COLOR} grad={GRAD} image={anchorImage} />
            </div>
          )}

          {/* Compact slot: top-left (replaces timer slot). Alternates SwitchAnchor (10–6s) → PrepNext (5–1s). */}
          {phase === 'compact-a' && (
            <div
              key="compact-a"
              className="absolute"
              style={{
                left: 50, top: 142,
                animation: 'bp-fadeSlide 0.5s ease-out both',
              }}
            >
              <SwitchAnchorPointCard isFocused compact color={COLOR} grad={GRAD} image={anchorImage} />
            </div>
          )}

          {phase === 'compact-b' && (
            <div
              key="compact-b"
              className="absolute"
              style={{
                left: 50, top: 142,
                animation: 'bp-fadeSlide 0.5s ease-out both',
              }}
            >
              <PrepNextDeviceCard isFocused compact color={COLOR} grad={GRAD} />
            </div>
          )}

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
                    <span className="font-poppins font-semibold text-white" style={{ fontSize: 22, lineHeight: '30px' }}>{ex.name}</span>
                  </div>
                  <div className="flex flex-col items-center" style={{ width: 110 }}>
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
