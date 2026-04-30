import { UsersThree } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import TrainingStructure from '../components/TrainingStructure'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#a855f7',
    accent: '#c084fc',
    light1: '#c084fc',
    light2: '#d8b4fe',
    light3: '#e9d5ff',
    mode: 'scale',
    icon: 'atom',
    goalHeadline: 'Group weight: 20 tons',
    goalBody: 'The total cumulative weight that the entire group pulled in training together.',
  },
  BURN: {
    label: 'BURN',
    color: '#ec4899',
    accent: '#f472b6',
    light1: '#f472b6',
    light2: '#f9a8d4',
    light3: '#fbcfe8',
    mode: 'burn',
    icon: 'atom',
    goalHeadline: '300 team points',
    goalBody: 'can you keep your heart rate high? Every minute you are in Zone 4–5 adds a point to the group score.',
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06b6d4',
    accent: '#6AD3E5',
    light1: '#38C5DD',
    light2: '#6AD3E5',
    light3: '#9BE2EE',
    mode: 'shield',
    icon: 'arrows',
    goalHeadline: '450 group minutes of control',
    goalBody: 'The accumulated dwell time in "Total Prime Control Minutes". Make a smooth, perfect movement',
  },
}

const CONTRIBUTORS = [
  { rank: 1, name: 'Ben',   reps: 268, kg: 3963, medal: 'gold' },
  { rank: 2, name: 'Mirel', reps: 268, kg: 3963, medal: 'silver' },
  { rank: 3, name: 'Gal',   reps: 268, kg: 3963, medal: 'bronze' },
]

const RADIUS = '36px 18px 36px 36px'

// Convert hex color to rgba with alpha
function rgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

function panelGradient(hex) {
  return `linear-gradient(192.26deg, ${rgba(hex, 0.6)} 0.02%, ${rgba(hex, 0.3)} 100%)`
}

function Medal({ tier }) {
  const palette = tier === 'gold'
    ? { ring: '#F9B906', inner: '#FFC943', shadow: '#CE9117' }
    : tier === 'silver'
    ? { ring: '#EBF2F2', inner: '#FFFFFF', shadow: '#C3DBDA' }
    : { ring: '#E37F22', inner: '#F79A4D', shadow: '#BA6017' }
  return (
    <svg width="60" height="74" viewBox="0 0 60 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ribbons forming inverted V */}
      <path d="M6 0 L18 0 L26 36 L18 36 Z" fill="#F41943" />
      <path d="M54 0 L42 0 L34 36 L42 36 Z" fill="#F41943" />
      <path d="M18 0 L24 0 L26 14 L20 18 Z" fill="#BA0F38" />
      <path d="M42 0 L36 0 L34 14 L40 18 Z" fill="#BA0F38" />
      {/* Medal circle */}
      <circle cx="30" cy="50" r="22" fill={palette.ring} />
      <circle cx="30" cy="50" r="16" fill={palette.inner} stroke={palette.shadow} strokeWidth="1.5" />
    </svg>
  )
}

function Panel({ x, w, color, children, paddingTop = 36 }) {
  return (
    <div style={{
      position: 'absolute', top: 142, left: x, width: w, height: 888,
      borderRadius: RADIUS,
      background: panelGradient(color),
      border: `2px solid ${color}`,
      padding: 36, paddingTop,
      color: '#fff', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 30,
      fontFamily: 'Poppins, sans-serif',
    }}>{children}</div>
  )
}

function HeadlineIcon({ cfg }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: cfg.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <UsersThree size={32} weight="bold" color="#fff" />
    </div>
  )
}

/* ---------- Bottom visual modes ---------- */

function ShieldGauge({ cfg }) {
  // New gauge per Figma Frame 1707480444 — horizontal slider with tick marks,
  // triangles above/below, and a circular indicator.
  const TRACK_W = 661
  // Tick X positions (left edge of 4px-wide tick) per CSS spec
  const TICKS = [0, 110, 220, 438, 547, 657]
  const INDICATOR_LEFT = 306 // 50x50 box → center at 331 (~50%)
  const indicatorCenterPct = ((INDICATOR_LEFT + 25) / TRACK_W) * 100

  return (
    <div style={{
      width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
      gap: 4,
    }}>
      {/* Top triangle pointing DOWN — aligned to indicator center */}
      <div style={{ position: 'relative', height: 16 }}>
        <div style={{
          position: 'absolute',
          left: `${indicatorCenterPct}%`,
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `16px solid ${cfg.color}`,
          borderRadius: 2,
        }} />
      </div>

      {/* Slider track — height 60, internal absolute layout */}
      <div style={{ position: 'relative', width: '100%', height: 60 }}>
        {/* Rail + tick marks rendered as ONE SVG shape sharing one gradient fill */}
        <svg
          viewBox={`0 0 ${TRACK_W} 60`}
          preserveAspectRatio="none"
          width="100%" height="60"
          style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="shieldGaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={cfg.color} stopOpacity="0.25" />
              <stop offset="50%"  stopColor={cfg.color} stopOpacity="1" />
              <stop offset="100%" stopColor={cfg.color} stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {/* Horizontal rail */}
          <rect x="0" y="28" width={TRACK_W} height="4" fill="url(#shieldGaugeGrad)" />
          {/* Vertical tick marks (4×50 each, centered on each tick X) */}
          {TICKS.map((x, i) => (
            <rect key={i} x={x - 2} y="5" width="4" height="50" fill="url(#shieldGaugeGrad)" />
          ))}
        </svg>
        {/* Circular indicator (50×50) */}
        <div style={{
          position: 'absolute',
          left: `${(INDICATOR_LEFT / TRACK_W) * 100}%`,
          top: 5,
          width: 50, height: 50,
          boxShadow: 'inset 0px 0px 4px #05A1BB',
          borderRadius: '50%',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(50% 50% at 50% 50%, ${cfg.color} 0%, rgba(255,255,255,0) 100%)`,
            border: '2.5px solid #FFFFFF',
            borderRadius: '50%',
            boxSizing: 'border-box',
          }} />
          <div style={{
            position: 'absolute',
            width: 13.33, height: 13.33,
            top: 'calc(50% - 6.665px)',
            left: 'calc(50% - 6.665px)',
            background: '#FFFFFF',
            borderRadius: '50%',
          }} />
        </div>
      </div>

      {/* Bottom triangle pointing UP — aligned to indicator center */}
      <div style={{ position: 'relative', height: 16 }}>
        <div style={{
          position: 'absolute',
          left: `${indicatorCenterPct}%`,
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: `16px solid ${cfg.color}`,
          borderRadius: 2,
        }} />
      </div>
    </div>
  )
}

function ShieldPanel({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 22 }}>
      {/* Top: horizontal gauge (replaces former balance scale) */}
      <ShieldGauge cfg={cfg} />
      {/* Bottom: full-width readout box */}
      <div style={{
        width: '100%',
        background: '#000',
        border: `3px solid ${cfg.color}`,
        borderRadius: '24px 12px 24px 24px',
        height: 135,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
      }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 80,
          lineHeight: '66px', color: '#fff',
        }}>120</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 32,
          lineHeight: '66px', color: '#fff',
          alignSelf: 'flex-end', marginBottom: 12, letterSpacing: '0.05em',
        }}>MIN</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 80,
          lineHeight: '66px', color: '#fff', margin: '0 18px',
        }}>/</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 60,
          lineHeight: '66px', color: cfg.color,
        }}>450</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 24,
          lineHeight: '66px', color: cfg.color,
          alignSelf: 'flex-end', marginBottom: 14, letterSpacing: '0.05em',
        }}>MIN</span>
      </div>
    </div>
  )
}

function GradientHeart() {
  // Exact heart shape from Figma export (Union.svg)
  return (
    <svg width="113" height="108" viewBox="0 0 113 108" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="burnHeartGrad" x1="49.9067" y1="0" x2="100.194" y2="73.6782" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="1" stopColor="#EC4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.928 0C108.33 10.0861 107.976 23.0382 100.544 32.3398C90.6186 44.7244 107.435 53.7818 112.398 41.3984L112.348 42.0439C112.34 42.1407 112.329 42.2373 112.32 42.334C112.313 42.4189 112.304 42.5039 112.296 42.5889C112.269 42.8626 112.24 43.1364 112.207 43.4102C112.19 43.5511 112.172 43.692 112.154 43.833C112.136 43.972 112.118 44.111 112.099 44.25C112.07 44.459 112.04 44.668 112.008 44.877C111.981 45.0514 111.953 45.2259 111.924 45.4004C109.08 62.5599 95.8146 79.6991 80.673 92.3359C80.5629 92.4279 80.4521 92.5189 80.3419 92.6104C80.1095 92.803 79.8769 92.9951 79.6437 93.1855C79.4992 93.3037 79.3548 93.4218 79.2101 93.5391C79.0555 93.6641 78.9001 93.788 78.7452 93.9121C71.2824 99.9 63.4622 104.772 56.2784 108C53.6686 106.826 51.117 105.55 48.6271 104.178C48.628 104.181 48.6291 104.184 48.63 104.187C31.203 94.5905 16.8593 80.2726 7.25597 62.8604C7.21846 62.7924 7.18103 62.7243 7.14366 62.6562C6.85692 62.1336 6.57418 61.6082 6.29601 61.0801C6.08375 60.6773 5.87334 60.2732 5.66613 59.8672C4.06527 56.7303 2.84553 53.7018 1.92296 50.8086C-8.99555 15.5032 29.0617 -2.22008 53.6095 17.1611C53.7192 17.2474 53.8279 17.3351 53.9366 17.4229C54.0529 17.5167 54.1687 17.6115 54.2843 17.707C54.3702 17.7782 54.4567 17.8488 54.5421 17.9209C54.9808 18.2896 55.4159 18.6701 55.8448 19.0635C63.1951 10.14 73.5288 4.00186 85.4093 2.73047C76.5677 5.86756 79.6045 16.4676 88.0128 15.6562C94.1699 15.0891 101.765 9.11341 101.928 0Z"
        fill="url(#burnHeartGrad)"
      />
    </svg>
  )
}

function BurnWaveform({ color }) {
  // Wave pattern from Figma: peaks (max) at indices 3 and 13. Heights in % of 80px height.
  // Sequence over 21 bars repeats; first 21 colored, next 21 faded.
  const seq = [20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20]
  const totalLeft = seq.length
  const totalBars = totalLeft * 2
  return (
    <svg width="100%" height="80" viewBox="0 0 521 80" preserveAspectRatio="none">
      {Array.from({ length: totalBars }, (_, i) => {
        const h = seq[i % totalLeft]
        const yTop = 40 - h / 2
        // Spread bars evenly across full width
        const x = 8 + (i * (505 / (totalBars - 1)))
        const c = i < totalLeft ? color : 'rgba(255,255,255,0.5)'
        return (
          <line
            key={i}
            x1={x} y1={yTop}
            x2={x} y2={yTop + h}
            stroke={c}
            strokeWidth={5}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function BurnPanel({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top row: Heart + 3 black boxes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 108 }}>
        <div style={{ flexShrink: 0, width: 113, height: 108, display: 'flex', alignItems: 'center' }}>
          <GradientHeart />
        </div>
        {['3', '0', '0'].map((n, i) => (
          <div key={i} style={{
            flex: 1, height: 108,
            borderRadius: '24px 12px 24px 24px',
            background: '#000',
            boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins', fontSize: 80, fontWeight: 700,
            color: '#fff', lineHeight: '66px',
          }}>{n}</div>
        ))}
      </div>
      {/* Bottom row: 50% + waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 80 }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 900, fontSize: 40, lineHeight: '66px',
          background: `linear-gradient(192.26deg, ${cfg.color} 0.02%, ${rgba(cfg.color, 0.8)} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          flexShrink: 0,
          minWidth: 105,
        }}>50%</span>
        <div style={{ flex: 1 }}>
          <BurnWaveform color="#EA4898" />
        </div>
      </div>
    </div>
  )
}

function BuildPanel({ cfg }) {
  // 14 tick heights + center triangle (per Figma, gap 36):
  // 7 left ticks: 24,24,30,24,24,24,24 → triangle → 7 right: 24,24,24,24,30,24,24
  const tickHeights = [24, 24, 30, 24, 24, 24, 24, 24, 24, 24, 24, 30, 24, 24]
  const TRIANGLE_AT = 7  // index where triangle is inserted
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Scale ruler — black box, flex auto layout */}
      <div style={{
        background: '#000',
        borderRadius: '24px 12px 24px 24px',
        width: 661,
        height: 166,
        padding: '20px 48px',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>
        {/* Numbers row — flex space-between with "kg" suffix */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 26, width: 549, height: 66,
        }}>
          <span style={{
            width: 126, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 55, fontWeight: 500, lineHeight: '66px', color: '#fff',
          }}>
            100<span style={{ fontSize: 28, fontWeight: 500 }}>kg</span>
          </span>
          <span style={{
            width: 198, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 80, fontWeight: 700, lineHeight: '66px', color: '#fff',
          }}>
            200<span style={{ fontSize: 36, fontWeight: 500 }}>kg</span>
          </span>
          <span style={{
            width: 139, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 55, fontWeight: 500, lineHeight: '66px', color: '#fff',
          }}>
            300<span style={{ fontSize: 28, fontWeight: 500 }}>kg</span>
          </span>
        </div>
        {/* Ticks row — flex with central triangle, gap 36 */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          gap: 36, width: 548, height: 44,
        }}>
          {tickHeights.slice(0, TRIANGLE_AT).map((h, i) => (
            <div key={`l-${i}`} style={{ width: 2, height: h, background: '#fff', flexShrink: 0 }} />
          ))}
          {/* Purple triangle marker, 44x44 */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '22px solid transparent',
            borderRight: '22px solid transparent',
            borderBottom: `44px solid ${cfg.color}`,
          }} />
          {tickHeights.slice(TRIANGLE_AT).map((h, i) => (
            <div key={`r-${i}`} style={{ width: 2, height: h, background: '#fff', flexShrink: 0 }} />
          ))}
        </div>
      </div>
      {/* Progress bar — matches Figma: 75% fill, "75%" label near right edge of fill */}
      <div style={{
        position: 'relative',
        height: 40,
        borderRadius: '12px 6px 12px 12px',
        background: 'rgba(255,255,255,0.5)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '75%', height: '100%',
          background: cfg.color,
          borderRadius: '12px 6px 12px 12px',
        }} />
        <span style={{
          position: 'absolute',
          right: 'calc(25% + 12px)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Poppins', fontSize: 24, fontWeight: 700, lineHeight: '34px',
          color: '#fff',
        }}>75%</span>
      </div>
    </div>
  )
}

function GoalPanel({ cfg }) {
  return (
    <Panel x={659} w={805} color={cfg.color}>
      {/* Title — matches Figma: 54px font 800, line-height 60, "Group Target" 36px below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px', letterSpacing: '0.01em' }}>Prime</span>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px', color: cfg.color, letterSpacing: '0.01em' }}>{cfg.label}</span>
        </div>
        <div style={{ fontSize: 36, fontWeight: 500, lineHeight: '46px', color: '#fff' }}>Group Target</div>
      </div>

      {/* Inner goal card — matches Figma Frame 1707480388 */}
      <div style={{
        padding: 36,
        borderRadius: RADIUS,
        background: 'rgba(255,255,255,0.10)',
        border: `3px solid ${cfg.color}`,
        display: 'flex', flexDirection: 'column', gap: 48,
        boxSizing: 'border-box',
      }}>
        {/* Top section: headline + training goal text (gap 16) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Headline with icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <HeadlineIcon cfg={cfg} />
            <span style={{ fontSize: 36, fontWeight: 600, lineHeight: '46px' }}>{cfg.goalHeadline}</span>
          </div>

          {/* Training Goal */}
          <div style={{ fontSize: 24, fontWeight: 600, lineHeight: '34px', color: '#fff' }}>
            <span style={{ fontWeight: 700 }}>Training Goal:</span>{' '}
            {cfg.goalBody}
          </div>
        </div>

        {/* Bottom section: visualization (gap 24 internal) */}
        {cfg.mode === 'shield' && <ShieldPanel cfg={cfg} />}
        {cfg.mode === 'burn'   && <BurnPanel   cfg={cfg} />}
        {cfg.mode === 'scale'  && <BuildPanel  cfg={cfg} />}
      </div>
    </Panel>
  )
}

function ContributorRow({ c, cfg, opacity }) {
  return (
    <div style={{
      borderRadius: RADIUS,
      background: rgba(cfg.color, opacity),
      padding: 24,
      display: 'flex', flexDirection: 'column', gap: 16,
      flex: 1, minHeight: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>#{c.rank}</span>
        <span style={{ fontSize: 32, fontWeight: 600, color: '#fff' }}>{c.name}</span>
        <div style={{ marginLeft: 'auto' }}>
          <Medal tier={c.medal} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 14,
          padding: '8px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.06)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>REPS</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#000', lineHeight: 1.15 }}>{c.reps}</span>
        </div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 14,
          padding: '8px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.06)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>KG</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#000', lineHeight: 1.15 }}>{c.kg}</span>
        </div>
      </div>
    </div>
  )
}

function ContributorsPanel({ cfg }) {
  // Different opacities per rank: #1=1.0, #2=0.75, #3=0.5
  const opacities = [1, 0.75, 0.5]
  return (
    <Panel x={50} w={573} color={cfg.color}>
      <div style={{ fontSize: 36, fontWeight: 600, color: '#fff' }}>Top Contributors</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, flex: 1 }}>
        {CONTRIBUTORS.map((c, i) => (
          <ContributorRow key={c.rank} c={c} cfg={cfg} opacity={opacities[i]} />
        ))}
      </div>
    </Panel>
  )
}

function StructurePanel({ cfg }) {
  return (
    <div style={{ position: 'absolute', top: 142, left: 1500 }}>
      <TrainingStructure color={cfg.color} />
    </div>
  )
}

export default function PrimeTarget({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={cfg.color}>
        <ContributorsPanel cfg={cfg} />
        <GoalPanel cfg={cfg} />
        <StructurePanel cfg={cfg} />
      </StageBackground>
    </ScaledFrame>
  )
}
