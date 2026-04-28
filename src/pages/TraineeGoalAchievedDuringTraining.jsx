import { useEffect, useState, useMemo } from 'react'
import { Trophy } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

/**
 * Trainee version of the "Group Goal Achieved — during training" screen
 * (the original Studio screen lives in `GoalAchievedDuringTraining.jsx`).
 *
 * Same content (animated cyan/pink/purple panel with trophy + headline) scaled to
 * fit the 1366×1024 Trainee frame. Per the established Trainee rules:
 *
 *   • Uniform scale of S = 1366/1920 ≈ 0.7115 keeps every visual proportion intact.
 *   • Dark top bar (105px) — matches the dark StageBackground variant used here.
 *   • 36px page padding on all sides; inner content extends from design y=142 → y=1332.
 *   • The outer animated card grows 1820×888 → 1820×1190 to fill the taller frame.
 *     The inner trophy card uses its existing min/max sizing and stays centered, so
 *     the entrance/exit/wobble/breathe animations all run identically.
 *   • Station pill stays uniform cyan (only the Prime high-level screens use variant
 *     gradient on the S1 pill — every other Trainee screen uses cyan).
 */

// Radii x1.5 — outer panel + inner card share the same scaled values
const RADIUS = '54px 27px 54px 54px'
const S = 1366 / 1920
const STATION_PILL_GRADIENT = 'linear-gradient(180deg, #22d3ee 0%, #06b6d4 100%)'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#A855F7',
    primeFrom: '#c084fc',
    primeTo: '#a855f7',
    rgba6: 'rgba(168,85,247,0.6)',
    rgba3: 'rgba(168,85,247,0.3)',
    rgba9: 'rgba(168,85,247,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '20 tons lifted — the team smashed the BUILD target.',
  },
  BURN: {
    label: 'BURN',
    color: '#EC4899',
    primeFrom: '#f472b6',
    primeTo: '#ec4899',
    rgba6: 'rgba(236,72,153,0.6)',
    rgba3: 'rgba(236,72,153,0.3)',
    rgba9: 'rgba(236,72,153,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '300 team points reached — the BURN target is yours.',
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06B6D4',
    primeFrom: '#22d3ee',
    primeTo: '#06b6d4',
    rgba6: 'rgba(6,182,212,0.6)',
    rgba3: 'rgba(6,182,212,0.3)',
    rgba9: 'rgba(6,182,212,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '450 group control minutes — the SHIELD target is locked in.',
  },
}

// Cycle: 0–500ms enter | 500–9500ms visible | 9500–10000ms exit
const CYCLE_MS = 10000

// Hygear logo for the dark top bar (white).
const HygearLogo = () => (
  <svg width={67} height={40} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="#FFFFFF"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="#FFFFFF"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="#FFFFFF"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.464197Z" fill="#FFFFFF"/>
  </svg>
)

// Dark Trainee top bar — black background with white text + cyan S1 pill.
function TraineeDarkTopBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: 1366, height: 105,
      background: '#020202', borderBottom: '1px solid #FFFFFF',
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      padding: '25px 36px',
      boxSizing: 'border-box', zIndex: 20,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <HygearLogo />
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
          color: '#FFFFFF',
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

export default function TraineeGoalAchievedDuringTraining({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  // Sparkle positions regenerate each cycle for variety.
  const sparkles = useMemo(() => {
    const list = []
    const count = 18
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: Math.random() * 1.2,
        duration: 1.6 + Math.random() * 1.8,
      })
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  // Wrapper offset + extended outer card height — same approach as TraineeBlockPreview.
  const WRAPPER_TOP = Math.round(141 - 142 * S)
  const CARD_HEIGHT = 1190

  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      {/* Clip wrapper — StageBackground hardcodes 1920×1080, so we constrain to 1366×1024. */}
      <div style={{ position: 'relative', width: 1366, height: 1024, overflow: 'hidden' }}>
        <StageBackground variant="dark" glowColor={cfg.color} showTopbar={false}>
          <style>{`
            @keyframes goal-grad-shift {
              0%   { background-position:   0% 50%, 100%  0%, 50% 100%; }
              33%  { background-position:  60% 30%,  20% 90%, 80%  40%; }
              66%  { background-position:  30% 90%,  80% 30%, 10%  60%; }
              100% { background-position:   0% 50%, 100%  0%, 50% 100%; }
            }
            @keyframes goal-panel-pulse {
              0%, 100% { filter: brightness(1) saturate(1); }
              50%      { filter: brightness(1.18) saturate(1.25); }
            }
            @keyframes goal-card-in {
              0%   { transform: scale(0.55) rotate(-3deg); opacity: 0; }
              55%  { transform: scale(1.06) rotate(1.5deg); opacity: 1; }
              75%  { transform: scale(0.98) rotate(-0.5deg); }
              100% { transform: scale(1) rotate(0); opacity: 1; }
            }
            @keyframes goal-card-out {
              0%   { transform: scale(1) rotate(0); opacity: 1; }
              100% { transform: scale(0.85) rotate(2deg); opacity: 0; }
            }
            @keyframes goal-trophy-in {
              0%   { transform: scale(0) rotate(-180deg); }
              60%  { transform: scale(1.2) rotate(15deg); }
              100% { transform: scale(1) rotate(0); }
            }
            @keyframes goal-trophy-wobble {
              0%, 100% { transform: rotate(-6deg); }
              50%      { transform: rotate(6deg); }
            }
            @keyframes goal-text-up {
              0%   { transform: translateY(24px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes goal-sparkle {
              0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
              20%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
              100% { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
            }
            @keyframes goal-breathe {
              0%, 100% { transform: scale(1); }
              50%      { transform: scale(1.012); }
            }
            @keyframes goal-ring-pulse {
              0%, 100% {
                box-shadow:
                  0 0 0 0 var(--ring-strong),
                  0 0 0 0 var(--ring-soft),
                  0 0 60px var(--ring-soft),
                  0 0 160px var(--ring-faint);
                border-color: var(--ring-strong);
              }
              50% {
                box-shadow:
                  0 0 0 6px var(--ring-soft),
                  0 0 0 14px var(--ring-faint),
                  0 0 100px var(--ring-strong),
                  0 0 240px var(--ring-soft);
                border-color: var(--ring-glow);
              }
            }
          `}</style>

          <TraineeDarkTopBar />

          {/* Scaled wrapper — uniform scale by S, design coords inside (1920-wide). */}
          <div style={{
            position: 'absolute',
            top: WRAPPER_TOP, left: 0,
            width: 1920, height: 142 + CARD_HEIGHT,
            transformOrigin: '0 0',
            transform: `scale(${S})`,
            zIndex: 5,
          }}>
            {/* Outer animated-gradient glass panel — extended height to fill the Trainee frame. */}
            <div
              key={tick}
              style={{
                position: 'absolute',
                width: 1820,
                height: CARD_HEIGHT,
                left: 50,
                top: 142,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                gap: 36,
                background: `
                  radial-gradient(ellipse 60% 80% at 30% 30%, ${cfg.rgba9} 0%, transparent 55%),
                  radial-gradient(ellipse 70% 60% at 80% 70%, ${cfg.rgba6} 0%, transparent 60%),
                  radial-gradient(ellipse 50% 50% at 50% 50%, ${cfg.rgba3} 0%, transparent 70%),
                  linear-gradient(135deg, ${cfg.rgba9} 0%, ${cfg.rgba3} 100%)
                `,
                backgroundSize: '180% 180%, 200% 200%, 160% 160%, 100% 100%',
                animation: `
                  goal-grad-shift 6s ease-in-out infinite,
                  goal-panel-pulse 4s ease-in-out infinite
                `,
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
                borderRadius: RADIUS,
                boxSizing: 'border-box',
                fontFamily: 'Poppins, sans-serif',
                overflow: 'hidden',
              }}
            >
              {/* Decorative sparkles */}
              {sparkles.map(s => (
                <div
                  key={s.id}
                  style={{
                    position: 'absolute',
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.size,
                    height: s.size,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: `0 0 ${s.size * 2}px ${cfg.color}`,
                    animation: `goal-sparkle ${s.duration}s ease-out ${s.delay}s infinite`,
                    pointerEvents: 'none',
                    opacity: 0,
                  }}
                />
              ))}

              {/* Inner black card — entrance + breathing + ring pulse + exit. Same as Studio. */}
              <div
                style={{
                  minWidth: 1158,
                  maxWidth: 1700,
                  minHeight: 436,
                  background: '#000000',
                  borderRadius: RADIUS,
                  padding: 66,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 36,
                  position: 'relative',
                  zIndex: 2,
                  border: `3px solid ${cfg.color}`,
                  '--ring-strong': cfg.color,
                  '--ring-glow':   cfg.primeFrom,
                  '--ring-soft':   cfg.rgba6,
                  '--ring-faint':  cfg.rgba3,
                  animation: `
                    goal-card-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                    goal-breathe 4s ease-in-out 0.7s infinite,
                    goal-ring-pulse 1.8s ease-in-out 0.7s infinite,
                    goal-card-out 0.5s ease-in 9.5s forwards
                  `,
                }}
              >
                {/* Trophy — entrance spin then continuous wobble */}
                <div
                  style={{
                    width: 120, height: 120, display: 'grid', placeItems: 'center',
                    animation: `
                      goal-trophy-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                      goal-trophy-wobble 1.6s ease-in-out 0.8s infinite
                    `,
                  }}
                >
                  <Trophy
                    size={120} weight="fill" color={cfg.color}
                    style={{ filter: `drop-shadow(0 0 24px ${cfg.color})` }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 800,
                    fontSize: 56,
                    lineHeight: '66px',
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    animation: 'goal-text-up 0.5s ease-out 0.4s both',
                  }}
                >
                  <span style={{ color: '#fff' }}>Prime </span>
                  <span style={{
                    backgroundImage: `linear-gradient(180deg, ${cfg.primeFrom} 0%, ${cfg.primeTo} 100%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}>{cfg.label}</span>
                </div>

                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 80,
                    lineHeight: '88px',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    animation: 'goal-text-up 0.5s ease-out 0.55s both',
                  }}
                >
                  {cfg.headline}
                </div>

                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: 36,
                    lineHeight: '48px',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    opacity: 0.95,
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    animation: 'goal-text-up 0.5s ease-out 0.7s both',
                  }}
                >
                  {cfg.subline}
                </div>
              </div>
            </div>
          </div>
        </StageBackground>
      </div>
    </ScaledFrame>
  )
}
