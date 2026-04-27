import { useState, useEffect } from 'react'
import { Fire, Stack, PersonArmsSpread, Lightning, ArrowRight } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import VideoPlayer from '../components/VideoPlayer'
import CountdownRing from '../components/CountdownRing'
import StageBackground from '../components/StageBackground'
import { ZONES } from '../data/zones'
import { DEMO_DURATION_PER_EXERCISE } from '../data/config'

/**
 * Trainee version of the "Before Warmup / Before Dynamic / Before All Out" screen
 * (the original Studio screen lives in `DemoPrep.jsx`).
 *
 * The Studio screen is designed at 1920×1080. To fit the Trainee 1366×1024 frame
 * (matching the high-level training + block-preview screens) we render the original
 * content unchanged inside a wrapper that uniformly scales it by S = 1366/1920 ≈ 0.7115.
 * That keeps every animation, the white StageBackground, and visual proportions intact —
 * we only swap in the Trainee white top bar (105px) and **stretch a few specific cards
 * vertically** so the content fills the taller (relative to its width) Trainee frame:
 *
 *   • Clock card        — 350 → 658  (auto-grows to fill the left column, since
 *                                     NEXT BLOCK keeps its original 496 height)
 *   • Video card        — 882 → 1190 (full main row height)
 *   • Training structure— 888 → 1190 (right sidebar)
 *
 * NEXT BLOCK card and the UP NEXT badge keep their original proportions per spec.
 */

const S = 1366 / 1920 // ≈ 0.7115 — uniform scale factor for the 1920×1080 inner content

const ZONE_BLOCK = [
  { number: 1, label: 'Warm-Up',          zoneLabel: 'ZONE 1', Icon: Fire },
  { number: 2, label: 'Demo & Prep',      zoneLabel: 'ZONE 2', Icon: Stack },
  { number: 3, label: 'Dynamic Strength', zoneLabel: 'ZONE 3', Icon: PersonArmsSpread },
  { number: 4, label: 'Isometric Holds',  zoneLabel: 'ZONE 4', Icon: PersonArmsSpread },
  { number: 5, label: 'All Out',          zoneLabel: 'ZONE 5', Icon: Lightning },
]

const EXERCISE = {
  name: 'Arm Circles',
  video: 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8',
}

const DEFAULT_ZONE_IDX = 0

// Uniform station pill gradient — same across ALL Trainee screens.
const STATION_PILL_GRADIENT = 'linear-gradient(180deg, #22d3ee 0%, #06b6d4 100%)'

// Dark version of the hygear logo for the white top bar.
const HygearLogoDark = ({ width = 67, height = 40 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="#000000"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="#000000"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="#000000"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.464197Z" fill="#000000"/>
  </svg>
)

// White top bar — same as the other Trainee screens (Adar Shirasi + cyan S1 pill).
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

export default function TraineeDemoPrep({ onComplete, zoneIdx }) {
  const zIdx = zoneIdx ?? DEFAULT_ZONE_IDX
  const NEXT_ZONE = ZONES[zIdx]
  const BLOCK = ZONE_BLOCK[zIdx]
  const BlockIcon = BLOCK.Icon
  const [timer, setTimer] = useState(DEMO_DURATION_PER_EXERCISE)

  useEffect(() => {
    if (timer <= 0) {
      onComplete?.()
      return
    }
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer, onComplete])

  const color = NEXT_ZONE.color
  const grad = `linear-gradient(180deg, color-mix(in srgb, ${color} 60%, transparent) 0%, color-mix(in srgb, ${color} 30%, transparent) 100%)`
  const isUrgent = timer <= 5 && timer > 0

  // Vertical offset used by the scaled wrapper:
  // Original first row sits at design top=142; after scaling, it lands at y = 142*S ≈ 101.
  // The top bar takes 105 + 36 page padding = 141 viewport units, so we offset the wrapper
  // down by (141 − 142*S) ≈ 40 so the row aligns flush with the page padding.
  const WRAPPER_TOP = Math.round(141 - 142 * S)

  // Extended content area heights (in design space):
  //   - Original content went from y=142 to y=1024 (height 882, ends at the original frame bottom).
  //   - Trainee frame allows content from y=142 to y=1332 (height 1190, fills 1024 viewport
  //     minus top bar 105 + 36 + 36 page padding).
  const CONTENT_HEIGHT = 1190
  // Inside the left column: NEXT BLOCK keeps its original 496 height (per spec — does not grow),
  // gap stays 36, and the Timer card absorbs the rest of the column.
  const NEXT_BLOCK_HEIGHT = 496
  const TIMER_HEIGHT = CONTENT_HEIGHT - 36 - NEXT_BLOCK_HEIGHT // 658

  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      <style>{`
        @keyframes bp-urgentGlow {
          0%,100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 80%, transparent),
                                0 0 16px color-mix(in srgb, var(--c) 35%, transparent); }
          50%     { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 100%, transparent),
                                0 0 40px color-mix(in srgb, var(--c) 65%, transparent); }
        }
      `}</style>
      {/* Clip wrapper — StageBackground hardcodes 1920×1080 dimensions, so we constrain it
          to the 1366×1024 Trainee frame to prevent its aurora blobs from bleeding past the edges. */}
      <div style={{ position: 'relative', width: 1366, height: 1024, overflow: 'hidden' }}>
        <StageBackground variant="light" glowColor={color} showTopbar={false}>
          {/* White top bar (fixed at native scale, on top of the scaled content). */}
          <TraineeWhiteTopBar />

          {/* Scaled wrapper: holds the 1920-wide DemoPrep content, uniformly scaled by S.
              Animations and proportions are preserved; only specific card heights are
              extended (in design space) to fill the taller-relative-to-width Trainee frame. */}
          <div style={{
            position: 'absolute',
            top: WRAPPER_TOP, left: 0,
            width: 1920, height: 142 + CONTENT_HEIGHT,
            transformOrigin: '0 0',
            transform: `scale(${S})`,
            zIndex: 5,
          }}>
            {/* Right sidebar — Training structure (height extended to fill the frame). */}
            <div className="absolute right-[51px] top-[142px]">
              {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: '36px 18px 36px 36px', pointerEvents: 'none', zIndex: 10, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
              {/* Width 426 = default 370 × 1.15 (+15% per spec). The extra 56px is taken
                  from the main content row width (1425 → 1369), which narrows the video. */}
              <TrainingStructure color={NEXT_ZONE.color} height={CONTENT_HEIGHT} fontScale={1.2} width={426} />
            </div>

            {/* Main content area — height extended from 882 → 1190.
                Width reduced from 1425 → 1356 so:
                  • Left gap (Timer↔Video, the inner flex gap) = 36
                  • Right gap (Video↔Training Structure) = 1443 − (51+1356) = 36
                The 13px we trimmed from the previous 1369 came out of the video card,
                which keeps both gaps visually identical (per spec: equal gaps, take from video). */}
            <div className="absolute flex left-[51px] top-[142px]" style={{ width: 1356, height: CONTENT_HEIGHT, gap: 36 }}>

              {/* Left column: Timer (grows) + NEXT BLOCK (fixed at original 496). */}
              <div className="flex flex-col shrink-0" style={{ width: 450, gap: 36 }}>

                {/* Timer card — height extended to absorb the column's extra vertical space. */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ height: TIMER_HEIGHT, background: grad, borderRadius: '36px 18px 36px 36px', flexShrink: 0 }}
                >
                  {isUrgent && (
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 'inherit',
                      pointerEvents: 'none', zIndex: 10,
                      '--c': color,
                      animation: 'bp-urgentGlow 0.75s ease-in-out infinite',
                    }} />
                  )}
                  <CountdownRing
                    size={350}
                    value={timer}
                    max={DEMO_DURATION_PER_EXERCISE}
                    label="REST"
                    color={color}
                    textColor="white"
                    trackColor="white"
                  />
                </div>

                {/* NEXT BLOCK card — fixed at the original Studio height (does not grow). */}
                <div
                  className="flex flex-col justify-between"
                  style={{
                    position: 'relative',
                    height: NEXT_BLOCK_HEIGHT,
                    padding: 36,
                    background: grad,
                    borderBottom: `8px solid ${color}`,
                    borderRadius: '36px 18px 36px 36px',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                >
                  {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
                  <div className="flex flex-col" style={{ gap: 21 }}>
                    <div style={{ borderBottom: `1px solid ${color}`, padding: '8px 0' }}>
                      <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color }}>
                        NEXT BLOCK:&nbsp;&nbsp;{BLOCK.number}
                      </span>
                    </div>
                    <div className="flex items-center justify-center" style={{ width: 88, height: 88, background: color, borderRadius: 24 }}>
                      <BlockIcon size={50} color="#fff" weight="regular" />
                    </div>
                    <div className="flex flex-col" style={{ gap: 12 }}>
                      <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>{BLOCK.label}</span>
                      <span className="font-poppins font-normal text-white" style={{ fontSize: 24, lineHeight: '34px' }}>5 Minutes</span>
                    </div>
                  </div>
                  <div className="relative" style={{ width: '100%', height: 54 }}>
                    <div className="absolute" style={{ left: -10, right: -10, top: -10, bottom: -10, background: color, mixBlendMode: 'screen', opacity: 0.2, filter: 'blur(10px)', borderRadius: 10, pointerEvents: 'none' }} />
                    <div className="relative flex items-center justify-center" style={{ width: '100%', height: 54, background: '#000', borderRadius: 8, boxShadow: '0 1px 0 rgba(0,0,0,0.05), 0 4px 4px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.1)' }}>
                      <span className="font-poppins font-bold" style={{ fontSize: 24, lineHeight: '34px', color }}>{BLOCK.zoneLabel}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Video — fills the remaining width of the row, height matches CONTENT_HEIGHT. */}
              <div className="relative flex-[1_0_0] min-w-px overflow-hidden" style={{ backgroundColor: 'rgba(248, 247, 247, 0.5)', borderRadius: '36px 18px 36px 36px' }}>
                {isUrgent && <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 30, '--c': color, animation: 'bp-urgentGlow 0.75s ease-in-out infinite' }} />}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/65 to-transparent px-[40px] py-[48px] pointer-events-none">
                  <p className="font-poppins font-normal text-[23px] text-white/60 uppercase tracking-widest">REST</p>
                  <p className="font-poppins font-bold text-[62px] leading-none text-white mt-[6px]">{EXERCISE.name}</p>
                </div>
                <VideoPlayer src={EXERCISE.video} />

                {/* UP NEXT badge — same vertical anchor as Studio (relative to viewport center
                    of the now-taller video container). Keeps original size & shape. */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 'calc(50% - 47px + 270px)',
                    width: 257,
                    height: 94,
                    background: color,
                    borderRadius: '0px 12px 24px 0px',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 12,
                    zIndex: 20,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <ArrowRight size={46} weight="bold" color="#fff" />
                    <span className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>
                      UP NEXT
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </StageBackground>
      </div>
    </ScaledFrame>
  )
}
