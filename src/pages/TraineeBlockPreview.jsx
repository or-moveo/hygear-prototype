import { useState, useEffect } from 'react'
import { Barbell, ArrowRight, ArrowsClockwise, Fire, Stack, PersonArmsSpread, Lightning } from '@phosphor-icons/react'
import { ZONES } from '../data/zones'
import { BLOCK_EXERCISES } from '../data/workout'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'

/**
 * Trainee version of the Block Preview screens.
 *
 * The original Studio Block Preview is designed at 1920×1080. To fit the Trainee
 * 1366×1024 frame (matching the high-level training screens), we render the original
 * content unchanged inside a wrapper that uniformly scales it by S = 1366/1920 ≈ 0.711.
 * This keeps every animation, background, and visual element pixel-perfect — only
 * scaled — and adds a white top bar (105px) on top with the trainee name and station pill.
 */

const S = 1366 / 1920 // ≈ 0.7115 — uniform scale factor for the 1920×1080 inner content

const ZONE_BLOCK = [
  { number: 1, label: 'Joint Warm-Up with Bosu', zoneLabel: 'ZONE 1', Icon: Fire,               group: 'warmup' },
  { number: 2, label: 'Demo & Prep',              zoneLabel: 'ZONE 2', Icon: Stack,              group: 'warmup' },
  { number: 3, label: 'Main Block',               zoneLabel: 'ZONE 3', Icon: PersonArmsSpread,   group: 'holds'  },
  { number: 3, label: 'Main Block: Unilateral',   zoneLabel: 'ZONE 2', Icon: PersonArmsSpread,   group: 'holds'  },
  { number: 4, label: 'Iron Wall Isometrics',     zoneLabel: 'ZONE 4', Icon: Lightning,          group: 'allout' },
]

const GEAR = {
  intro: 'Please note',
  instruction: 'Make sure the device is turned on.',
  image: '/assets/rope.png',
}

const REST_SECONDS = 30

// Uniform station pill gradient — same across ALL Trainee screens (HighLevelTraining
// + BlockPreview), regardless of zone or workout variant. Cyan matches the brand identity.
const STATION_PILL_GRADIENT = 'linear-gradient(180deg, #22d3ee 0%, #06b6d4 100%)'

// Dark version of the hygear logo for use against the white top bar background.
const HygearLogoDark = ({ width = 67, height = 40 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="#000000"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="#000000"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="#000000"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.464197Z" fill="#000000"/>
  </svg>
)

// White top bar — same format as the 3 high-level Trainee screens but with a white background.
// Left: hygear logo + trainee name (dark text). Right: station pill (uniform cyan).
function TraineeWhiteTopBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: 1366, height: 105,
      background: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,.08)',
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      padding: '25px 36px',
      boxSizing: 'border-box', zIndex: 20,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <HygearLogoDark width={67} height={40} />
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
          color: '#000000',
        }}>Adar Shirasi</span>
      </div>
      <div style={{
        width: 100, height: 54,
        padding: '10px 20px',
        borderRadius: 10,
        background: STATION_PILL_GRADIENT,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 26, lineHeight: '34px',
          color: '#FFFFFF',
        }}>S1</span>
      </div>
    </div>
  )
}

// Pulsing focus ring applied to the active rotating card.
function FocusRing({ color }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      pointerEvents: 'none', zIndex: 10,
      '--c': color,
      animation: 'tbp-focusRing 2s ease-in-out infinite',
    }} />
  )
}

function PrepNextDeviceCard({ color, grad, isFocused, compact }) {
  if (compact) {
    // Compact card moved to top-left when timer takes center stage. Sized to match
    // the original (pre-20%) initial Timer (450×500), per the spec.
    // Compact card sized 450×600 to match the current non-compact Timer (the timer that
     // sits in the same top-left slot in the prep/anchor phases). Layout is now top-to-bottom:
     // image frame on top, "Please note" instruction pill on the bottom.
    return (
      <div
        className="flex flex-col relative"
        style={{
          width: 450, height: 600,
          padding: 36, gap: 18,
          background: grad, borderRadius: '36px 18px 36px 36px',
          boxSizing: 'border-box',
          transition: 'all 0.6s ease',
        }}
      >
        {isFocused && <FocusRing color={color} />}
        {/* Title row — icon + label both enlarged 25% (24→30, 22/26→28/33). */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <Barbell size={30} color="#fff" weight="bold" />
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: 28, lineHeight: '33px', color: '#fff' }}>
            Prep next device
          </span>
        </div>
        <div className="flex flex-col flex-1 min-h-0" style={{ gap: 18 }}>
          {/* Image frame — top. Image itself shrunk (80% → 60%) so the now-larger
              please-note pill below has more room to read clearly. */}
          <div className="flex items-center justify-center overflow-hidden" style={{
            flex: '1 1 0', minHeight: 0,
            background: '#fff', borderRadius: '16px 8px 16px 16px',
          }}>
            <img src={GEAR.image} alt="device" style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain', animation: 'tbp-float 3.2s ease-in-out infinite' }} />
          </div>
          {/* Please-note instruction pill — bottom. Both lines enlarged 25%
              (intro 16/22 → 20/28, instruction 18/26 → 23/33). */}
          <div className="flex flex-col justify-center relative overflow-hidden" style={{
            flexShrink: 0, padding: 12, gap: 6,
            background: color, borderRadius: '16px 8px 16px 16px',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
              animation: 'tbp-shimmer 9s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span className="font-poppins font-light text-white" style={{ fontSize: 20, lineHeight: '28px', position: 'relative' }}>{GEAR.intro}</span>
            <span className="font-poppins font-semibold text-white" style={{ fontSize: 23, lineHeight: '33px', position: 'relative' }}>{GEAR.instruction}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    // Non-compact card — full-frame size for the Trainee 4:3 layout.
    // Width grew from 600 → 720 (+20%) at the expense of the Next Exercises card on its right.
    // The body uses flex-1 internally so the image area absorbs the extra space naturally.
    <div className="flex flex-col relative" style={{
      width: 720, height: 1190,
      padding: 36, gap: 36,
      background: grad, borderRadius: '36px 18px 36px 36px',
      boxSizing: 'border-box', transition: 'all 0.6s ease',
    }}>
      {isFocused && <FocusRing color={color} />}
      <div className="flex items-center" style={{ gap: 16 }}>
        <Barbell size={46} color="#fff" />
        <span className="font-poppins font-semibold text-white" style={{ fontSize: 46, lineHeight: '46px' }}>Prep next device</span>
      </div>
      <div className="flex flex-col flex-1 justify-end min-h-0" style={{ gap: 16 }}>
        <div style={{ padding: 36, gap: 12, background: color, borderRadius: '24px 12px 24px 24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
            animation: 'tbp-shimmer 9s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <span className="font-poppins font-light text-white" style={{ fontSize: 28, lineHeight: '38px', position: 'relative' }}>{GEAR.intro}</span>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px', position: 'relative' }}>{GEAR.instruction}</span>
        </div>
        <div className="flex items-center justify-center flex-1 min-h-0 overflow-hidden" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #fff 0%, #fff 100%), #000', borderRadius: '24px 12px 24px 24px' }}>
          <img src={GEAR.image} alt="device" style={{ maxWidth: 260, maxHeight: 440, objectFit: 'contain', animation: 'tbp-float 3.2s ease-in-out infinite' }} />
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
    // Compact card sized 450×600 to match the current non-compact Timer in the same slot
    // and the PrepNextDeviceCard compact (visual consistency between compact-a / compact-b).
    // Layout is now top-to-bottom (image frame on top, please-note pill on bottom) — mirrors
    // the PrepNextDeviceCard compact. Title/icon enlarged 25% (24→30, 22/26→28/33), please-note
    // text enlarged 25% (16/22→20/28, 18/26→23/33), image shrunk to 60%, and tbp-float
    // animation re-applied so the image keeps the same subtle pulse as in the full-size version.
    return (
      <div className="flex flex-col relative" style={{
        width: 450, height: 600,
        padding: 36, gap: 18,
        background: grad, borderRadius: '36px 18px 36px 36px',
        boxSizing: 'border-box', transition: 'all 0.6s ease',
      }}>
        {isFocused && <FocusRing color={color} />}
        <div className="flex items-center" style={{ gap: 10 }}>
          <ArrowsClockwise size={30} color="#fff" weight="bold" />
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: 28, lineHeight: '33px', color: '#fff' }}>Switch Anchor Point</span>
        </div>
        <div className="flex flex-col flex-1 min-h-0" style={{ gap: 18 }}>
          {/* Image frame — top. Image shrunk to 60% with tbp-float animation restored. */}
          <div className="flex items-center justify-center overflow-hidden relative" style={{
            flex: '1 1 0', minHeight: 0, background: '#fff', borderRadius: '16px 8px 16px 16px',
          }}>
            <img src={img} alt="anchor" style={{
              maxWidth: '60%', maxHeight: '60%', objectFit: 'contain',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 80, height: 36, borderRadius: 8,
              pointerEvents: 'none', '--c': color,
              animation: 'tbp-anchorPulse 1.6s ease-in-out infinite',
            }} />
          </div>
          {/* Please-note instruction pill — bottom, fonts enlarged 25%. */}
          <div className="flex flex-col justify-center relative overflow-hidden" style={{
            flexShrink: 0, padding: 12, gap: 6,
            background: color, borderRadius: '16px 8px 16px 16px',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
              animation: 'tbp-shimmer 9s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span className="font-poppins font-light text-white" style={{ fontSize: 20, lineHeight: '28px', position: 'relative' }}>{ANCHOR_INTRO}</span>
            <span className="font-poppins font-semibold text-white" style={{ fontSize: 23, lineHeight: '33px', position: 'relative' }}>{ANCHOR_INSTRUCTION}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    // Non-compact card — full-frame size for the Trainee 4:3 layout.
    // Width 720 matches PrepNextDeviceCard (they share the center slot).
    // The body uses flexGrow:1 internally so the image area absorbs the extra space naturally.
    <div className="flex flex-col items-start relative" style={{
      width: 720, height: 1190,
      padding: 36, gap: 36,
      background: grad, borderRadius: '36px 18px 36px 36px',
      boxSizing: 'border-box', transition: 'all 0.6s ease',
    }}>
      {isFocused && <FocusRing color={color} />}
      <div className="flex flex-row items-center justify-center" style={{ width: 529, height: 46, gap: 16 }}>
        <ArrowsClockwise size={46} color="#fff" weight="bold" />
        <span className="font-poppins" style={{ width: 467, fontWeight: 600, fontSize: 46, lineHeight: '46px', color: '#ffffff' }}>Switch Anchor Point</span>
      </div>
      <div className="flex flex-col items-center justify-end self-stretch" style={{ gap: 16, flexGrow: 1, minHeight: 0 }}>
        <div className="flex items-center justify-center self-stretch overflow-hidden relative" style={{
          flex: '1 1 auto', background: '#ffffff', borderRadius: '24px 12px 24px 24px',
        }}>
          <img src={img} alt="anchor device" style={{ maxWidth: 338, maxHeight: 572, width: '100%', height: '100%', objectFit: 'contain' }} />
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 160, height: 70, borderRadius: 12,
            pointerEvents: 'none', '--c': color,
            animation: 'tbp-anchorPulse 1.6s ease-in-out infinite',
          }} />
        </div>
        <div className="flex flex-col justify-center self-stretch relative overflow-hidden" style={{
          height: 214,
          padding: 36, gap: 12,
          background: color, borderRadius: '24px 12px 24px 24px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)',
            animation: 'tbp-shimmer 9s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <span className="font-poppins" style={{ fontWeight: 300, fontSize: 28, lineHeight: '38px', color: '#ffffff', position: 'relative', whiteSpace: 'nowrap' }}>{ANCHOR_INTRO}</span>
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: 28, lineHeight: '38px', color: '#ffffff', position: 'relative', whiteSpace: 'nowrap' }}>{ANCHOR_INSTRUCTION}</span>
        </div>
      </div>
    </div>
  )
}

export default function TraineeBlockPreview({ zoneIdx, anchorImage }) {
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

  const phase =
    timer > 20 ? 'prep'
    : timer > 10 ? 'anchor'
    : timer > 5  ? 'compact-a'
    :              'compact-b'
  const isCompact = phase === 'compact-a' || phase === 'compact-b'

  // Inner content is laid out at the original 1920×1080 design coords.
  // Original first row sits at top:142 → after scale (×S) it lands at y = 142*S ≈ 101.
  // We want the first row to start at top-bar (105) + page padding (36) = 141 in viewport space.
  // So the wrapper is offset down by (141 − 142*S) ≈ 40px.
  const WRAPPER_TOP = Math.round(141 - 142 * S)

  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      {/* Clip wrapper — StageBackground hardcodes 1920×1080 dimensions, so we constrain it
          to the 1366×1024 Trainee frame to prevent its aurora blobs and built-in top bar from
          bleeding past the right and bottom edges (which produced the "duplicated background"). */}
      <div style={{ position: 'relative', width: 1366, height: 1024, overflow: 'hidden' }}>
      <StageBackground variant="light" glowColor={COLOR} showTopbar={false}>
        <style>{`
          @keyframes tbp-enter      { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes tbp-iconBounce { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-6px) scale(1.06); } }
          @keyframes tbp-zonePulse  { 0%,100% { text-shadow:0 0 0 currentColor; } 50% { text-shadow:0 0 18px currentColor; } }
          @keyframes tbp-slideIn    { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
          @keyframes tbp-shimmer    { 0%,60% { transform:translateX(-120%); } 90%,100% { transform:translateX(220%); } }
          @keyframes tbp-focusRing {
            0%,100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 80%, transparent), 0 0 24px color-mix(in srgb, var(--c) 45%, transparent); }
            50%     { box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 100%, transparent), 0 0 60px color-mix(in srgb, var(--c) 75%, transparent); }
          }
          @keyframes tbp-fadeSlide { from { opacity:0; transform:translateY(12px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
          @keyframes tbp-float      { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-14px) scale(1.05); } }
          @keyframes tbp-urgentGlow {
            0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent), 0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
            50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent), 0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
          }
          @keyframes tbp-anchorPulse {
            0%,100% { transform: translate(-50%, -50%) scale(1);
                      box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 70%, transparent), 0 0 14px color-mix(in srgb, var(--c) 35%, transparent);
                      background: color-mix(in srgb, var(--c) 20%, transparent); }
            50%     { transform: translate(-50%, -50%) scale(1.05);
                      box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 100%, transparent), 0 0 32px color-mix(in srgb, var(--c) 65%, transparent);
                      background: color-mix(in srgb, var(--c) 30%, transparent); }
          }
        `}</style>

        {/* White top bar (fixed at native scale, on top of the scaled content) */}
        <TraineeWhiteTopBar />

        {/* Scaled wrapper: holds the unmodified 1920×1080 BlockPreview content,
            uniformly scaled by S. The animations and background remain pixel-perfect
            (just scaled), and the layout adapts responsively to the 1366×1024 frame. */}
        <div style={{
          position: 'absolute',
          top: WRAPPER_TOP, left: 0,
          width: 1920, height: 1080,
          transformOrigin: '0 0',
          transform: `scale(${S})`,
          zIndex: 5,
        }}>

          {/* ── Timer: top-left in prep/anchor phases, center in compact.
              Compact width grew 600 → 720 to match the new Prep/Anchor center cards.
              Non-compact (initial) timer height grew 500 → 600 (+20%) per the spec —
              Next Block below shrinks accordingly to keep the 36px bottom margin. */}
          <div className="absolute flex items-center justify-center" style={{
            left: isCompact ? 536 : 50,
            top: 142,
            width: isCompact ? 720 : 450,
            height: isCompact ? 1190 : 600,
            background: GRAD, borderRadius: '36px 18px 36px 36px',
            animation: 'tbp-enter 0.5s ease-out both',
            transition: 'all 0.6s ease',
          }}>
            {isUrgent && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />
            )}
            <CountdownRing
              size={isCompact ? 504 : 336}
              value={timer}
              max={REST_SECONDS}
              label="REST"
              color={COLOR}
              textColor="white"
              trackColor="white"
            />
          </div>

          {/* ── NEXT BLOCK bottom-left — shrunk further to make room for the larger initial Timer.
              Top 678 → 778 (Timer 600 + 36 gap from top:142), height 654 → 554 (still ends at 1332). */}
          <div className="absolute flex flex-col justify-between" style={{
            left: 50, top: 778, width: 450, height: 554,
            padding: 36, background: GRAD,
            borderBottom: `8px solid ${COLOR}`,
            borderRadius: '36px 18px 36px 36px',
            boxSizing: 'border-box',
            animation: 'tbp-enter 0.5s 0.08s ease-out both',
          }}>
            {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
            <div className="flex flex-col" style={{ gap: 21 }}>
              <div style={{ borderBottom: `1px solid ${COLOR}`, padding: '8px 0' }}>
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color: COLOR }}>
                  NEXT BLOCK:&nbsp;&nbsp;{BLOCK.number}
                </span>
              </div>
              <div className="flex items-center justify-center" style={{ width: 88, height: 88, background: COLOR, borderRadius: 24, animation: 'tbp-iconBounce 2.6s ease-in-out infinite' }}>
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
                <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color: COLOR, animation: 'tbp-zonePulse 2.2s ease-in-out infinite' }}>
                  {BLOCK.zoneLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── Center rotating cards (Prep / Anchor) ──────── */}
          {phase === 'prep' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'tbp-fadeSlide 0.5s ease-out both' }}>
              {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
              <PrepNextDeviceCard color={COLOR} grad={GRAD} isFocused />
            </div>
          )}

          {phase === 'anchor' && (
            <div className="absolute" style={{ left: 536, top: 142, animation: 'tbp-fadeSlide 0.5s ease-out both' }}>
              {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
              <SwitchAnchorPointCard isFocused color={COLOR} grad={GRAD} image={anchorImage} />
            </div>
          )}

          {phase === 'compact-a' && (
            <div key="compact-a" className="absolute" style={{ left: 50, top: 142, animation: 'tbp-fadeSlide 0.5s ease-out both' }}>
              {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
              <SwitchAnchorPointCard isFocused compact color={COLOR} grad={GRAD} image={anchorImage} />
            </div>
          )}

          {phase === 'compact-b' && (
            <div key="compact-b" className="absolute" style={{ left: 50, top: 142, animation: 'tbp-fadeSlide 0.5s ease-out both' }}>
              {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
              <PrepNextDeviceCard isFocused compact color={COLOR} grad={GRAD} />
            </div>
          )}

          {/* ── Next Exercises right — narrowed (698 → 578) and shifted right (1172 → 1292)
              to make room for the wider center Prep/Anchor card (per the +20% spec). */}
          <div className="absolute flex flex-col" style={{
            left: 1292, top: 142, width: 578, height: 1190,
            padding: 36, gap: 36,
            background: GRAD, borderRadius: '36px 18px 36px 36px',
            boxSizing: 'border-box',
            animation: 'tbp-enter 0.5s 0.24s ease-out both',
          }}>
            {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': COLOR, animation: 'tbp-urgentGlow 0.75s ease-in-out infinite' }} />}
            <div className="flex items-center" style={{ gap: 16 }}>
              <ArrowRight size={46} weight="bold" color="#fff" />
              <span className="font-poppins font-semibold text-white" style={{ fontSize: 46, lineHeight: '46px' }}>Next Exercises</span>
            </div>

            <div className="flex flex-col" style={{ gap: 16 }}>
              {EXERCISES.map((ex, i) => (
                <div key={i} className="flex items-center justify-between" style={{
                  padding: 18, background: '#000', borderRadius: '16px 8px 16px 16px',
                  animation: `tbp-slideIn 0.4s ${0.32 + i * 0.09}s ease-out both`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
                    animation: `tbp-shimmer 9s ${2.7 + i * 0.6}s ease-in-out infinite`,
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
      </div>
    </ScaledFrame>
  )
}
