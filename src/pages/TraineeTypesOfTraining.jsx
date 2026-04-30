import { Pulse, Heart } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

const VARIANTS = {
  SHIELD: {
    label: 'SHIELD', color: '#06b6d4', solid: '#06B6D4',
    primeFrom: '#22d3ee', primeTo: '#06b6d4',
    cardBg: 'linear-gradient(192.26deg, rgba(6, 182, 212, 0.6) 0.02%, rgba(6, 182, 212, 0.3) 100%)',
  },
  BURN: {
    label: 'BURN', color: '#ec4899', solid: '#EA4898',
    primeFrom: '#f472b6', primeTo: '#ec4899',
    cardBg: 'linear-gradient(192.26deg, rgba(234, 72, 152, 0.6) 0%, rgba(234, 72, 152, 0.3) 99.98%)',
  },
  BUILD: {
    label: 'BUILD', color: '#a855f7', solid: '#A855F7',
    primeFrom: '#c084fc', primeTo: '#a855f7',
    cardBg: 'linear-gradient(192.26deg, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.3) 99.98%)',
  },
}
const CARD_RADIUS = '36px 18px 36px 36px'

/* Layout constants — all 3 Types-of-Training screens share the SAME margins
   (36px on every side of the page) and the SAME 36px spacing between every
   component, both column-wise and row-wise.
   Frame: 1366×1024 → topbar 105 → content 1294×847 starting at (36, 141). */
const PAGE_MARGIN = 36
const CONTENT_W   = 1366 - PAGE_MARGIN * 2          // 1294
const CONTENT_H   = 1024 - 105 - PAGE_MARGIN        // 883 → but per spec we use 847 + bottom 36
const CONTENT_TOP = 105 + PAGE_MARGIN               // 141
const TOP_CARD_H  = 235
const MID_ROW_H   = 316
const BOT_CARD_H  = 224
// Timer card width is shared across all variants; the right card flexes.
const TIMER_CARD_W = 523
const RIGHT_CARD_W = CONTENT_W - TIMER_CARD_W - PAGE_MARGIN  // 735

/* ───────────────── Topbar logo ───────────────── */

const HygearLogo = ({ width = 67, height = 40 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="white"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="white"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="white"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.464197Z" fill="white"/>
  </svg>
)

/* ───────────────── Shared Top Bar ───────────────── */

function TopBar({ cfg }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, width: 1366, height: 105,
      background: '#020202', borderBottom: '1px solid #FFFFFF',
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      padding: '25px 36px', boxSizing: 'border-box', zIndex: 10,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <HygearLogo width={67} height={40} />
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
          color: '#FFFFFF',
        }}>Adar Shirasi</span>
      </div>
      <div style={{
        width: 100, height: 54,
        padding: '10px 20px', borderRadius: 10,
        background: `linear-gradient(180deg, ${cfg.primeFrom} 0%, ${cfg.primeTo} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 26, lineHeight: '34px',
          color: '#FFFFFF',
        }}>S1</span>
      </div>
    </div>
  )
}

/* ───────────────── Shared Timer Ring (cardio circular timer) ───────────────── */

function TimerRing({ cfg, progress = 0.5, label = '0:45', sublabel = 'seconds left',
                    labelSize = 56, sublabelSize = 24, sublabelLineHeight = '34px',
                    labelLineHeight = '66px' }) {
  // 260 fits the 316-tall middle-row timer card exactly with 28px padding
  // (316 − 28*2 = 260), keeping the bottom page margin a clean 36px.
  const SIZE = 260
  const STROKE = 19.29
  const R = (SIZE - STROKE) / 2
  const C = 2 * Math.PI * R
  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#FFFFFF" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke={cfg.solid} strokeWidth={STROKE} strokeLinecap="round"
          strokeDasharray={`${C * progress} ${C}`}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#FFFFFF', fontFamily: 'Poppins, sans-serif',
      }}>
        <span style={{ fontWeight: 600, fontSize: labelSize, lineHeight: labelLineHeight }}>{label}</span>
        <span style={{ fontWeight: 400, fontSize: sublabelSize, lineHeight: sublabelLineHeight, textAlign: 'center' }}>{sublabel}</span>
      </div>
    </div>
  )
}

/* ───────────────── Shared "My Efforts Zone" bottom card ───────────────── */

const ZONE_DIM = [
  'rgba(58, 134, 255, 0.3)',  // Z1 blue
  'rgba(35, 184, 112, 0.3)',  // Z2 green
  null,                        // Z3 active
  'rgba(255, 107, 0, 0.3)',   // Z4 orange
  'rgba(245, 54, 92, 0.3)',   // Z5 red
]
const ACTIVE_ZONE_BG =
  'radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.115) 0%, rgba(0, 0, 0, 0) 86.18%),' +
  'radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),' +
  '#FFD000'

function EffortsZone({ cfg, activeZone = 3 }) {
  return (
    <div style={{
      flex: '0 0 224px',
      padding: 28,
      background: cfg.cardBg, borderRadius: CARD_RADIUS,
      display: 'flex', flexDirection: 'column', gap: 24,
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 46 }}>
        <Pulse size={36} weight="bold" color="#FFFFFF" />
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
          color: '#FFFFFF',
        }}>My Efforts Zone</span>
      </div>
      <div style={{
        background: '#000000', borderRadius: 24, padding: 12,
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12,
        boxSizing: 'border-box',
      }}>
        {ZONE_DIM.map((bg, idx) => {
          const zoneNum = idx + 1
          if (zoneNum === activeZone) {
            return (
              <div key={idx} style={{
                width: 350, height: 74, padding: 26,
                background: ACTIVE_ZONE_BG,
                boxShadow: 'inset -3px -4px 7px rgba(255, 255, 255, 0.15)',
                borderRadius: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, lineHeight: '34px',
                color: '#000000', flexShrink: 0, boxSizing: 'border-box',
              }}>ZONE {zoneNum}</div>
            )
          }
          return <div key={idx} style={{ flex: 1, height: 66, background: bg, borderRadius: 500 }} />
        })}
      </div>
    </div>
  )
}

/* ═══════════════════ BURN content ═══════════════════ */

/* ECG line — exact 4-segment heartbeat path from the Figma asset
   Frame 1707480471.svg (viewBox 1258×109, stroke-width 4). The whole asset is
   duplicated side-by-side and the group is animated with translateX(-1258) for a
   seamless infinite scroll, plus a subtle drop-shadow glow pulse synced to the
   beat — mimicking a real ECG monitor trace.

   The 4 paths in the asset (verbatim Figma export — do not modify):
   • P1: 0   → 317.46     (left half, ascending)
   • P2: 634 → 317        (left-centre, mirrored back)
   • P3: 623 → 940.54     (right-centre, ascending)
   • P4: 1258 → 940.54    (right half, mirrored back) */
const ECG_PATHS = [
  'M0 57.46H26.6067L34.4691 66.6147L44.1438 49.9241L51.3983 104.846L60.4708 2.53766L67.7253 73.6159L73.7727 52.0776L77.4 62.3076L81.6352 54.7688L87.0775 60.6918H125.171L133.638 68.2306L140.893 47.23L151.173 104.846L157.825 2L166.895 72.5377L174.152 49.9241L176.569 62.8453L182.617 54.2312L186.247 60.1541H224.945L231.598 65.5394L241.877 45.6141L250.947 107L258.204 3.07821L266.064 73.0753L271.506 52.0776L276.344 62.8453L281.786 54.2312L284.811 59.0759H317.462',
  'M634.922 57.46H608.315L600.453 66.6147L590.778 49.9241L583.524 104.846L574.451 2.53766L567.197 73.6159L561.149 52.0776L557.522 62.3076L553.287 54.7688L547.844 60.6918H509.751L501.283 68.2306L494.029 47.23L483.749 104.846L477.097 2L468.027 72.5377L460.77 49.9241L458.353 62.8453L452.305 54.2312L448.675 60.1541H409.976L403.324 65.5394L393.044 45.6141L383.975 107L376.717 3.07821L368.858 73.0753L363.415 52.0776L358.578 62.8453L353.136 54.2312L350.111 59.0759H317.46',
  'M623.078 57.46H649.685L657.547 66.6147L667.222 49.9241L674.476 104.846L683.549 2.53766L690.803 73.6159L696.851 52.0776L700.478 62.3076L704.713 54.7688L710.156 60.6918H748.249L756.717 68.2306L763.971 47.23L774.251 104.846L780.903 2L789.973 72.5377L797.23 49.9241L799.647 62.8453L805.695 54.2312L809.325 60.1541H848.024L854.676 65.5394L864.956 45.6141L874.025 107L881.283 3.07821L889.142 73.0753L894.585 52.0776L899.422 62.8453L904.864 54.2312L907.889 59.0759H940.54',
  'M1258 57.46H1231.39L1223.53 66.6147L1213.86 49.9241L1206.6 104.846L1197.53 2.53766L1190.27 73.6159L1184.23 52.0776L1180.6 62.3076L1176.36 54.7688L1170.92 60.6918H1132.83L1124.36 68.2306L1117.11 47.23L1106.83 104.846L1100.17 2L1091.11 72.5377L1083.85 49.9241L1081.43 62.8453L1075.38 54.2312L1071.75 60.1541H1033.05L1026.4 65.5394L1016.12 45.6141L1007.05 107L999.796 3.07821L991.936 73.0753L986.494 52.0776L981.656 62.8453L976.214 54.2312L973.189 59.0759H940.538',
]

/* Per user feedback (round 2): graphic scaled to 64% of original size
   (= 0.8 × 0.8, two successive 20% reductions). Stroke stays at 3.
   Centred vertically inside the 109-tall viewBox. */
const ECG_SCALE = 0.64
const ECG_Y_OFFSET = (109 * (1 - ECG_SCALE)) / 2  // ≈ 19.6 — vertical centring

function EcgTrace({ color }) {
  // Renders one full pattern using the exact Figma paths, scaled by ECG_SCALE
  // and translated down so the shorter trace remains vertically centred.
  return (
    <g transform={`translate(0 ${ECG_Y_OFFSET}) scale(${ECG_SCALE})`}>
      {ECG_PATHS.map((d, i) => (
        <path
          key={i} d={d}
          stroke={color} strokeWidth="3" fill="none"
          strokeMiterlimit="10"
          strokeLinecap="round" strokeLinejoin="round"
        />
      ))}
    </g>
  )
}

function EcgLine({ color }) {
  const W = 1258, H = 109
  // After horizontal scaling, each trace is W*SCALE wide. We need enough copies
  // placed end-to-end that the viewport is covered at every animation frame —
  // i.e. ceil(W / TRACE_W) + 1 (the "+1" gives a fresh copy waiting on the right
  // when the leftmost copy has fully exited). The animation scrolls by exactly
  // one trace width, so when it loops back the next copy seamlessly takes over.
  const TRACE_W = W * ECG_SCALE                       // ≈ 805.1
  const COPIES = Math.ceil(W / TRACE_W) + 1           // 3 at scale 0.64
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}
         preserveAspectRatio="none" aria-hidden="true">
      <style>{`
        @keyframes ecg-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TRACE_W}px); }
        }
        @keyframes ecg-glow {
          0%, 100% { filter: drop-shadow(0 0 1px ${color}); }
          50%      { filter: drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}); }
        }
        .ecg-anim-track  { animation: ecg-scroll 6s linear infinite; will-change: transform; }
        .ecg-anim-glow   { animation: ecg-glow 1.1s ease-in-out infinite; }
      `}</style>
      {/* Outer group is translated. It contains COPIES copies of the trace
         placed end-to-end so that translateX(-TRACE_W) seamlessly loops with
         no visible gap on the right side at the end of each cycle. */}
      <g className="ecg-anim-track">
        <g className="ecg-anim-glow">
          {Array.from({ length: COPIES }, (_, i) => (
            <g key={i} transform={`translate(${i * TRACE_W} 0)`}>
              <EcgTrace color={color} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

function BpmDisplay({ value = 145 }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      gap: 24, color: '#FFFFFF', fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Heart size={36} weight="bold" color="#FFFFFF" />
        <span style={{ fontWeight: 600, fontSize: 56, lineHeight: '66px' }}>BPM</span>
      </div>
      <span style={{ fontWeight: 700, fontSize: 140, lineHeight: 1 }}>{value}</span>
    </div>
  )
}

/* Shared layout shell — uniform 36px outer margin & 36px inter-component
   spacing across all 3 Types-of-Training screens. The variant-specific
   content is plugged into each of the 3 slots. */
function PageLayout({ cfg, top, mid }) {
  return (
    <div style={{
      position: 'absolute',
      left: PAGE_MARGIN, top: CONTENT_TOP, width: CONTENT_W,
      height: TOP_CARD_H + MID_ROW_H + BOT_CARD_H + PAGE_MARGIN * 2,
      display: 'flex', flexDirection: 'column', gap: PAGE_MARGIN,
    }}>
      {/* 1. Top card */}
      <div style={{
        flex: `0 0 ${TOP_CARD_H}px`, padding: 18,
        background: cfg.cardBg, borderRadius: CARD_RADIUS,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{top}</div>

      {/* 2. Middle row — timer (left) + variant-specific (right) */}
      <div style={{
        flex: `0 0 ${MID_ROW_H}px`,
        display: 'flex', flexDirection: 'row', gap: PAGE_MARGIN,
      }}>
        <div style={{
          width: TIMER_CARD_W, padding: 28,
          background: cfg.cardBg, borderRadius: CARD_RADIUS,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>
          <TimerRing cfg={cfg} />
        </div>
        <div style={{
          width: RIGHT_CARD_W, padding: 36,
          background: cfg.cardBg, borderRadius: CARD_RADIUS,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>{mid}</div>
      </div>

      {/* 3. My Efforts Zone */}
      <EffortsZone cfg={cfg} activeZone={3} />
    </div>
  )
}

function BurnContent({ cfg }) {
  return (
    <PageLayout
      cfg={cfg}
      top={
        <div style={{
          width: '100%', height: 199, background: '#000000', borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <EcgLine color={cfg.solid} />
        </div>
      }
      mid={<BpmDisplay value={145} />}
    />
  )
}

/* ═══════════════════ BUILD content ═══════════════════ */

// Turtle icon — exact 76×66 frame asset from Figma (Frame 1707480479.svg).
const TurtleIcon = () => (
  <svg width="76" height="66" viewBox="0 0 76 66" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4.08926 36.01C4.14452 35.8796 4.21863 35.7711 4.2938 35.687C4.44215 35.5222 4.58585 35.4359 4.71309 35.3707C4.95322 35.2522 5.16346 35.2015 5.39137 35.1538C5.78741 35.0752 6.23447 35.0321 6.73677 34.9967C7.48583 34.9435 8.34779 34.9126 9.18306 34.8617C9.60354 34.8362 10.0184 34.8042 10.4023 34.7642C10.3624 34.5718 10.3393 34.3748 10.3403 34.1756C10.3392 33.68 10.4697 33.1866 10.7022 32.7285C10.9355 32.2692 11.2653 31.8389 11.6813 31.4228C12.0785 31.0267 12.5698 30.4282 13.1219 29.699C14.09 28.4223 15.2529 26.7448 16.606 24.9525C18.6395 22.2628 21.1013 19.3076 24.0754 16.993C25.5624 15.8357 27.18 14.8399 28.9403 14.1296C30.6996 13.4205 32.6025 13 34.6318 13C37.7253 12.9989 40.5157 13.977 42.9719 15.4629C44.8175 16.5783 46.4848 17.9777 47.994 19.4881C50.2566 21.7519 52.1696 24.2634 53.7695 26.4541C54.5695 27.5484 55.2908 28.5629 55.9304 29.4193C56.2966 29.9094 56.6362 30.3465 56.9461 30.716C57.0501 30.6175 57.1519 30.5201 57.2494 30.4227C57.7251 29.9447 58.1112 29.4746 58.4011 28.825C58.6898 28.1755 58.8924 27.3202 58.8933 26.0524C58.8945 24.8861 58.7164 23.3771 58.2727 21.4209C58.1874 21.0448 58.1465 20.6697 58.1465 20.3013C58.1465 19.4449 58.3711 18.6317 58.7539 17.9158C59.328 16.8382 60.242 15.9697 61.3196 15.3612C62.4005 14.7537 63.6541 14.403 64.9475 14.4018C66.2574 14.4008 67.614 14.7724 68.8033 15.6166C69.8899 16.3901 70.6599 17.1014 71.1877 17.8073C71.4499 18.1603 71.6514 18.5132 71.7895 18.8729C71.928 19.2313 72 19.5975 72 19.956C72.0011 20.3709 71.9014 20.7669 71.7378 21.1077C71.595 21.4076 71.407 21.6677 71.199 21.8921C70.835 22.286 70.4101 22.5804 69.9852 22.8215C69.3456 23.1789 68.694 23.4124 68.1928 23.5652C68.1487 23.5784 68.1066 23.5917 68.0634 23.6027C67.8719 26.4218 67.4914 28.7344 66.9901 30.6462C66.1759 33.753 65.0341 35.8087 63.8933 37.2105C63.3246 37.911 62.7582 38.4464 62.2536 38.8656C61.7491 39.2851 61.3032 39.5927 60.9967 39.8239C60.2709 40.3682 59.5761 40.7598 58.9132 41.0187C58.4254 41.209 57.9539 41.3263 57.5037 41.375V41.3762C56.8663 41.7579 55.2864 42.6452 52.8357 43.5934C52.86 43.6819 52.9021 43.7914 52.9586 43.9121C53.1078 44.2352 53.3557 44.6378 53.639 45.0361C54.0682 45.6393 54.5805 46.2421 54.9821 46.6879C55.1834 46.9104 55.355 47.0941 55.4767 47.2224C55.5387 47.2867 55.5851 47.3353 55.6195 47.3664L55.6394 47.3884C55.6415 47.3907 55.6515 47.4017 55.666 47.416C55.7711 47.5167 56.1728 47.9061 56.5898 48.465C56.8244 48.7837 57.0678 49.1553 57.2637 49.5792C57.4573 50.004 57.6111 50.482 57.6143 51.0252C57.6166 51.4103 57.5259 51.8295 57.3123 52.2113C57.195 52.4248 57.0458 52.6008 56.8841 52.748C56.602 53.008 56.2811 53.1938 55.9425 53.3432C55.4302 53.5689 54.8671 53.7183 54.2762 53.819C53.6854 53.9196 53.0734 53.9682 52.4827 53.9682C51.779 53.9661 51.113 53.9018 50.52 53.7458C50.2234 53.664 49.9446 53.5612 49.6746 53.3995C49.5397 53.3188 49.4079 53.2213 49.283 53.093C49.1601 52.9691 49.0428 52.8097 48.9588 52.615C48.9101 52.4977 48.8127 52.2875 48.6866 52.0253C48.2462 51.1036 47.4519 49.5282 46.7736 48.1927C46.4328 47.5233 46.1219 46.9137 45.8962 46.4723C45.7833 46.2499 45.6904 46.0706 45.6262 45.9457C45.5631 45.8229 45.5289 45.7541 45.5289 45.7541L45.5267 45.7498L45.5212 45.7442C45.5168 45.7353 45.5112 45.7253 45.5089 45.7154C42.4242 46.3473 38.7996 46.7842 34.676 46.7842C34.4581 46.7842 34.2423 46.7842 34.0243 46.7809H34.021C30.9418 46.7445 28.1801 46.46 25.756 46.0364C25.4572 46.6194 24.747 48.0036 24.0555 49.3766C23.7026 50.0747 23.355 50.7708 23.0708 51.3516C22.9258 51.6403 22.7985 51.9025 22.6957 52.1205C22.5929 52.3362 22.5121 52.5131 22.4678 52.615C22.385 52.8097 22.2698 52.9691 22.1448 53.093C21.9236 53.3143 21.6889 53.4515 21.4468 53.5588C21.0815 53.7181 20.6911 53.8111 20.2727 53.8753C19.8534 53.9384 19.4075 53.9682 18.9472 53.9682C18.0422 53.9661 17.0962 53.8576 16.2487 53.6176C15.8272 53.4958 15.4278 53.341 15.0627 53.1274C14.879 53.0201 14.7053 52.8974 14.5438 52.748C14.3845 52.6008 14.2351 52.4248 14.1168 52.2113C13.901 51.8295 13.8136 51.4103 13.8158 51.0252C13.8158 50.482 13.9696 50.004 14.1633 49.5792C14.4575 48.9451 14.857 48.4208 15.1834 48.0335C15.4622 47.7072 15.688 47.4847 15.7643 47.4162V47.414C15.7665 47.4106 15.7687 47.4085 15.771 47.4062C15.7742 47.4041 15.7742 47.4018 15.7766 47.4018C15.7809 47.3962 15.7832 47.3941 15.7887 47.3885C15.9203 47.2569 16.541 46.6174 17.1728 45.8407C17.5236 45.4115 17.8733 44.9413 18.1432 44.5074C18.2361 44.3604 18.3169 44.2154 18.3865 44.0804C15.6149 43.0592 13.8966 42.049 13.2814 41.6596C13.1641 41.653 13.036 41.643 12.8953 41.6298C11.9327 41.5335 10.4048 41.2558 8.78395 40.5876C7.97405 40.2534 7.14317 39.8207 6.35758 39.2565C5.57213 38.6922 4.83183 37.9952 4.21889 37.1377L4.19685 37.1056L4.17586 37.0713C4.13057 36.995 4.08741 36.9065 4.05421 36.8025C4.0222 36.6995 4.00002 36.579 4.00002 36.4518C3.99962 36.3012 4.03162 36.144 4.08926 36.01Z" fill="white"/>
  </svg>
)

// Rabbit icon — exact 76×66 frame asset from Figma (Frame 1707480478.svg).
const RabbitIcon = () => (
  <svg width="76" height="66" viewBox="0 0 76 66" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M41.3127 3.00054C42.1912 2.97073 42.4874 4.18945 42.858 4.76948C43.7732 6.20108 45.0216 9.52979 46.2001 10.553C46.3255 10.0233 46.2827 9.49853 46.3404 8.95939C46.4921 7.61564 46.8169 6.12313 47.3904 4.8931C47.7409 4.14187 48.5479 4.6921 48.5938 5.45827C48.6969 7.17459 50.1349 8.42231 51.1223 9.71895C52.7517 11.854 53.7796 14.3864 54.0991 17.0531C54.182 17.7508 54.2137 18.4536 54.1942 19.156C54.1858 19.5313 54.1331 20.6247 54.1938 20.9573C54.3933 22.054 56.8171 22.0083 57.6769 22.3108C58.2459 22.4858 58.7415 22.7731 59.2452 23.0855C60.4397 23.8265 61.1424 25.0714 61.8849 26.2281C62.5471 27.2529 63.1956 28.2865 63.8303 29.3288C64.2717 30.0516 64.7684 30.8358 65.1754 31.5725C65.3848 31.9518 65.5476 32.7036 65.645 33.1396C64.7245 35.4313 62.7149 37.0656 60.3388 37.6656C59.2788 37.9334 58.1622 38.1199 57.2031 38.6935C55.9123 39.4654 56.8263 40.987 57.0051 42.0917C57.4114 43.9619 57.3621 45.6841 56.9692 47.5401C56.7109 47.3437 56.6689 47.286 56.4912 47.0277C56.4805 47.1924 56.4679 47.3574 56.4534 47.5218C56.3834 48.2956 56.0013 50.7118 54.8958 50.5822C54.764 50.7144 54.6394 51.2188 54.3448 51.5284C53.7865 52.1149 53.0543 52.499 52.5916 53.1486C52.2324 53.6431 52.0879 54.2613 52.1915 54.8636C52.4781 56.4544 54.1919 57.2148 55.477 58.0433C56.5634 58.7441 57.9589 60.302 56.247 61.3853C56.111 61.4717 55.6914 61.5921 55.5175 61.6016C54.328 61.667 53.1193 61.7831 51.9294 61.6922C49.5193 61.4878 47.3668 60.2814 45.4901 58.8274C44.8019 58.2943 44.1768 57.6844 43.4935 57.1475C42.9432 57.2756 38.3837 58.5137 38.31 58.6096L38.3459 58.7811C38.519 59.3696 38.7922 60.1881 38.8671 60.7758C39.0799 62.445 36.4055 62.9823 35.2098 62.9979C32.7605 63.03 30.3056 62.68 27.8431 62.6846C24.0054 62.6911 21.0959 61.8309 18.2135 59.2374C15.4119 60.8041 13.2904 58.7104 11.762 56.4112C10.8288 55.0073 10.8693 53.7428 11.2647 52.165C11.6195 50.75 12.4258 49.0602 14.2331 49.5822C14.694 48.3044 14.4819 46.8477 14.5437 45.5439C14.6331 43.6562 15.4007 41.3584 16.2712 39.6882C18.4947 35.4221 22.9737 31.5769 27.5514 30.092C30.8434 29.0242 34.333 29.2591 37.5044 30.574C38.3031 30.9052 38.96 31.2452 39.7273 31.6433C40.3532 31.2692 40.981 30.8987 41.6115 30.532C42.1393 30.229 43.4595 29.6624 43.5608 29.1274C43.7862 27.9374 43.837 26.8833 44.4763 25.7677C44.7263 25.3314 45.3885 24.3112 45.3545 23.8132C45.2891 22.8582 44.2043 21.7814 43.612 21.0601C43.2826 20.6566 42.9643 20.244 42.6578 19.8228C42.09 19.0448 41.5756 18.2293 41.1178 17.3819C40.148 15.619 39.5282 13.6852 39.2928 11.6869C39.0452 9.40491 39.634 8.46801 40.5534 6.50048C40.7793 6.01667 41.004 5.35803 41.0857 4.82764C41.1534 4.38919 41.0991 4.04428 41.0796 3.60812C41.0659 3.29497 41.1075 3.21701 41.3127 3.00054Z" fill="white"/>
  </svg>
)

/* Weight gauge — exact match to Figma spec (Frame 1707480397).
   Black inner box 1258×199 padded 36, contains:
   • Row 1 (Frame 1707480466) 1186×66: turtle (76×66) + 31 vertical pill bars (24×66, gap 8) + rabbit (76×66), justify-content: space-between.
     Bars: 8 dark (#7E22CE) + 15 medium (#A855F7) + 8 light (#E0C2FF) = 31 total; 31×24 + 30×8 = 984 wide.
   • Row 2 (Frame 1707480382) 1186×42: 6 tick groups + central triangle.
     Each tick group has 7 vertical white ticks; one is taller (30px) — at index 2 in the
     left 3 groups, at index 4 in the right 3 groups (mirrored pattern).
     Triangle 48×42 in the variant accent colour. */
function WeightGauge({ cfg }) {
  const PURPLE_DARK = '#7E22CE', PURPLE_MED = '#A855F7', PURPLE_LIGHT = '#E0C2FF'
  const bars = [
    ...Array(8).fill(PURPLE_DARK),
    ...Array(15).fill(PURPLE_MED),
    ...Array(8).fill(PURPLE_LIGHT),
  ]
  // Tall-tick index per tick group, mirrored across the centre triangle.
  const tallByGroup = [2, 2, 2, /* triangle */ 4, 4, 4]
  return (
    <div style={{
      width: '100%', height: 199,
      background: '#000000', borderRadius: '24px 12px 24px 24px',
      padding: 36, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', alignItems: 'stretch', gap: 16,
    }}>
      {/* Row 1 — Turtle | 31 bars | Rabbit (justify-content: space-between) */}
      <div style={{
        height: 66,
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 76, height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <TurtleIcon />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {bars.map((color, i) => (
            <div key={i} style={{
              width: 24, height: 66,
              background: color, borderRadius: 24,
              flexShrink: 0,
            }} />
          ))}
        </div>
        <div style={{ width: 76, height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <RabbitIcon />
        </div>
      </div>

      {/* Row 2 — 3 tick groups | triangle | 3 tick groups (with gap 36, groups flex-grow to fit) */}
      <div style={{
        height: 42,
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', gap: 36,
      }}>
        {tallByGroup.slice(0, 3).map((idx, i) => (
          <TickGroup7 key={`L${i}`} tallIdx={idx} />
        ))}
        {/* Central up-pointing triangle, 48×42 */}
        <div style={{
          width: 0, height: 0,
          borderLeft: '24px solid transparent',
          borderRight: '24px solid transparent',
          borderBottom: `42px solid ${cfg.solid}`,
          flexShrink: 0,
        }} />
        {tallByGroup.slice(3).map((idx, i) => (
          <TickGroup7 key={`R${i}`} tallIdx={idx} />
        ))}
      </div>
    </div>
  )
}

/* Single tick group of 7 vertical white lines — `tallIdx` makes that tick 30px instead of 24px.
   Uses flex: 1 so the 6 groups share the available row width equally, with the
   central triangle taking its 48px slot, all separated by the row's 36px gap. */
function TickGroup7({ tallIdx = -1 }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between',
      height: 30,
    }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{
          width: 0, height: i === tallIdx ? 30 : 24,
          borderLeft: '1px solid #FFFFFF',
        }} />
      ))}
    </div>
  )
}

function BuildMetrics() {
  const Divider = () => (
    <div style={{ width: 0, height: 170, borderLeft: '2px solid rgba(255,255,255,0.25)', flexShrink: 0 }} />
  )
  const baseLabel = {
    fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#FFFFFF', textAlign: 'center',
  }
  const baseNumber = {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 100, lineHeight: '100px', color: '#FFFFFF',
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'center', padding: '0 12px', gap: 24,
      boxSizing: 'border-box',
    }}>
      {/* Target Weight */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span style={{ ...baseLabel, fontSize: 28, lineHeight: '38px' }}>Target Weight</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8.33 }}>
          <span style={baseNumber}>79</span>
          <span style={{ ...baseLabel, fontWeight: 500, fontSize: 44, lineHeight: '58px' }}>Kg</span>
        </div>
      </div>
      <Divider />
      {/* REPS */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span style={{ ...baseLabel, fontSize: 36, lineHeight: '46px' }}>REPS</span>
        <span style={baseNumber}>12</span>
      </div>
      <Divider />
      {/* BPM */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span style={{ ...baseLabel, fontSize: 36, lineHeight: '46px' }}>BPM</span>
        <span style={baseNumber}>125</span>
      </div>
    </div>
  )
}

function BuildContent({ cfg }) {
  return (
    <PageLayout
      cfg={cfg}
      top={<WeightGauge cfg={cfg} />}
      mid={<BuildMetrics />}
    />
  )
}

/* ═══════════════════ SHIELD content ═══════════════════ */

/* Stability indicator — exact 1:1 reproduction of the Figma Frame 1707480471 spec.
   • Frame 1707480471 — black inner box 1258×199, border-radius 16.
   • Rectangle 34624241 — white→transparent vertical gradient, 500×199 centered, drawn ON TOP of the cyan
     (its lighter centre column over the cyan creates the visual illusion of a curved cyan edge).
   • Ellipse 63 — flat cyan band 1258×124.5 at top:74 (no border-radius per spec).
   • Frame 1707480439 — indicator container 125.21×125.21 at left:566.5 top:59 with cyan inset shadow.
     ◦ Ellipse 59 — radial-gradient cyan→transparent disc with 6.26px white border.
     ◦ Ellipse 62 — inner white disc 67.89×67.89, 1.36px cyan border, cyan glow ring + inner glow. */
function StabilityIndicator({ cfg }) {
  const BOX_W = 1258, BOX_H = 199
  return (
    <div style={{
      // Frame 1707480471
      position: 'relative',
      width: BOX_W, height: BOX_H,
      background: '#000000', borderRadius: 16,
      overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Ellipse 63 — drawn as a free SVG shape so the cyan area has a smooth
         smile-shaped top edge (high at the sides at y≈74, dipping in the centre).
         Matches the curved boundary visible in the Figma render. */}
      <svg
        width={BOX_W} height={BOX_H}
        viewBox={`0 0 ${BOX_W} ${BOX_H}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Cubic bezier from (0, 74) → control points pulling the curve down → (1258, 74),
           then closed at the bottom-right and bottom-left corners of the box. */}
        <path
          d={`M 0 74 C ${BOX_W * 0.18} 215, ${BOX_W * 0.82} 215, ${BOX_W} 74 L ${BOX_W} ${BOX_H} L 0 ${BOX_H} Z`}
          fill={cfg.solid}
        />
      </svg>
      {/* Rectangle 34624241 — white→transparent gradient strip, 500 wide, centered (on top of cyan) */}
      <div style={{
        position: 'absolute',
        left: `calc(50% - ${500 / 2}px)`, top: 0,
        width: 500, height: BOX_H,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Frame 1707480439 — indicator container */}
      <div style={{
        position: 'absolute',
        left: 566.5, top: 59,
        width: 125.21, height: 125.21,
        boxShadow: 'inset 0px 0px 10.2211px #05A1BB',
        borderRadius: '50%',
      }}>
        {/* Ellipse 59 — radial gradient + white border */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0,
          width: 125.21, height: 125.21,
          background: `radial-gradient(50% 50% at 50% 50%, ${cfg.solid} 0%, rgba(255,255,255,0) 100%)`,
          border: '6.26044px solid #FFFFFF',
          borderRadius: '50%',
          boxSizing: 'border-box',
        }} />
        {/* Ellipse 62 — inner white disc with cyan glow */}
        <div style={{
          position: 'absolute',
          left: `calc(50% - ${67.89 / 2}px + 0.01px)`,
          top: `calc(50% - ${67.89 / 2}px)`,
          width: 67.89, height: 67.89,
          background: '#FFFFFF',
          border: `1.35788px solid ${cfg.solid}`,
          borderRadius: '50%',
          boxShadow: `0px 0px 0px 15.7893px rgba(6, 182, 212, 0.2), inset 0px 0px 17.0525px ${cfg.solid}`,
          boxSizing: 'border-box',
        }} />
      </div>
    </div>
  )
}

function StabilityScore() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 36, color: '#FFFFFF', fontFamily: 'Poppins, sans-serif',
    }}>
      <span style={{ fontWeight: 600, fontSize: 36, lineHeight: '46px' }}>Average stability score</span>
      <span style={{ fontWeight: 700, fontSize: 140, lineHeight: '100px' }}>7</span>
    </div>
  )
}

function ShieldContent({ cfg }) {
  return (
    <PageLayout
      cfg={cfg}
      top={<StabilityIndicator cfg={cfg} />}
      mid={<StabilityScore />}
    />
  )
}

/* ═══════════════════ Page entry ═══════════════════ */

export default function TraineeTypesOfTraining({ variant = 'SHIELD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.SHIELD
  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      <StageBackground
        variant="dark"
        glowColor={cfg.color}
        frameWidth={1366}
        frameHeight={1024}
        showTopbar={false}
      >
        <TopBar cfg={cfg} />
        {variant === 'BURN'  && <BurnContent  cfg={cfg} />}
        {variant === 'BUILD' && <BuildContent cfg={cfg} />}
        {variant === 'SHIELD' && <ShieldContent cfg={cfg} />}
      </StageBackground>
    </ScaledFrame>
  )
}
