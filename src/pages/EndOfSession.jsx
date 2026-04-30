import { UsersThree } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#a855f7',
    accent: '#6AD3E5',
    headlineMain: '20',
    headlineUnit: 'T',
    leftNum: '100',
    rightNum: '300',
    goalHeadline: 'Group weight: 20 tons',
    mode: 'scale',
  },
  BURN: {
    label: 'BURN',
    color: '#ec4899',
    mode: 'burn',
    goalHeadline: '300 team points',
    boxes: ['3', '0', '0'],
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06b6d4',
    accent: '#6AD3E5',
    light1: '#38C5DD',
    light2: '#6AD3E5',
    light3: '#9BE2EE',
    mode: 'shield',
    goalHeadline: '450 group minutes of control',
  },
}

const RANKING = [
  { rank: 1, name: 'Ben',   scores: [100, 100, 100], total: 300, tier: 'gold'   },
  { rank: 2, name: 'David', scores: [80, 80, 80],    total: 240, tier: 'silver' },
  { rank: 3, name: 'Shir',  scores: [70, 70, 70],    total: 320, tier: 'bronze' },
  { rank: 4, name: 'Tal',   scores: [60, 60, 60],    total: 180, tier: 'plain'  },
  { rank: 5, name: 'Mia',   scores: [50, 50, 50],    total: 150, tier: 'plain'  },
  { rank: 6, name: 'Avi',   scores: [45, 45, 45],    total: 135, tier: 'plain'  },
]

const RADIUS = '36px 18px 36px 36px'

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
      <path d="M6 0 L18 0 L26 36 L18 36 Z" fill="#F41943" />
      <path d="M54 0 L42 0 L34 36 L42 36 Z" fill="#F41943" />
      <path d="M18 0 L24 0 L26 14 L20 18 Z" fill="#BA0F38" />
      <path d="M42 0 L36 0 L34 14 L40 18 Z" fill="#BA0F38" />
      <circle cx="30" cy="50" r="22" fill={palette.ring} />
      <circle cx="30" cy="50" r="16" fill={palette.inner} stroke={palette.shadow} strokeWidth="1.5" />
    </svg>
  )
}

/* ----- Visualizations ----- */

function ScaleVisual({ cfg }) {
  // 7 left ticks + triangle + 7 right ticks (gap 36 between each)
  const tickHeights = [24, 24, 30, 24, 24, 24, 24, 24, 24, 24, 24, 30, 24, 24]
  const TRIANGLE_AT = 7
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{
        background: '#000', borderRadius: '24px 12px 24px 24px',
        width: 661, height: 166, padding: '20px 48px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>
        {/* Numbers row — flex space-between */}
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
      <div style={{
        position: 'relative', height: 40,
        borderRadius: '12px 6px 12px 12px',
        background: 'rgba(255,255,255,0.5)', overflow: 'hidden',
      }}>
        <div style={{
          width: '75%', height: '100%',
          background: cfg.color, borderRadius: '12px 6px 12px 12px',
        }} />
        <span style={{
          position: 'absolute', left: 'calc(75% - 60px)', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Poppins', fontSize: 24, fontWeight: 700, lineHeight: '34px',
          color: '#fff',
        }}>75%</span>
      </div>
    </div>
  )
}

function GradientHeart() {
  // Exact heart shape from Figma export (Union.svg)
  return (
    <svg width="113" height="108" viewBox="0 0 113 108" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="eosHeartGrad" x1="49.9067" y1="0" x2="100.194" y2="73.6782" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="1" stopColor="#EC4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.928 0C108.33 10.0861 107.976 23.0382 100.544 32.3398C90.6186 44.7244 107.435 53.7818 112.398 41.3984L112.348 42.0439C112.34 42.1407 112.329 42.2373 112.32 42.334C112.313 42.4189 112.304 42.5039 112.296 42.5889C112.269 42.8626 112.24 43.1364 112.207 43.4102C112.19 43.5511 112.172 43.692 112.154 43.833C112.136 43.972 112.118 44.111 112.099 44.25C112.07 44.459 112.04 44.668 112.008 44.877C111.981 45.0514 111.953 45.2259 111.924 45.4004C109.08 62.5599 95.8146 79.6991 80.673 92.3359C80.5629 92.4279 80.4521 92.5189 80.3419 92.6104C80.1095 92.803 79.8769 92.9951 79.6437 93.1855C79.4992 93.3037 79.3548 93.4218 79.2101 93.5391C79.0555 93.6641 78.9001 93.788 78.7452 93.9121C71.2824 99.9 63.4622 104.772 56.2784 108C53.6686 106.826 51.117 105.55 48.6271 104.178C48.628 104.181 48.6291 104.184 48.63 104.187C31.203 94.5905 16.8593 80.2726 7.25597 62.8604C7.21846 62.7924 7.18103 62.7243 7.14366 62.6562C6.85692 62.1336 6.57418 61.6082 6.29601 61.0801C6.08375 60.6773 5.87334 60.2732 5.66613 59.8672C4.06527 56.7303 2.84553 53.7018 1.92296 50.8086C-8.99555 15.5032 29.0617 -2.22008 53.6095 17.1611C53.7192 17.2474 53.8279 17.3351 53.9366 17.4229C54.0529 17.5167 54.1687 17.6115 54.2843 17.707C54.3702 17.7782 54.4567 17.8488 54.5421 17.9209C54.9808 18.2896 55.4159 18.6701 55.8448 19.0635C63.1951 10.14 73.5288 4.00186 85.4093 2.73047C76.5677 5.86756 79.6045 16.4676 88.0128 15.6562C94.1699 15.0891 101.765 9.11341 101.928 0Z"
        fill="url(#eosHeartGrad)"
      />
    </svg>
  )
}

function Waveform({ color }) {
  // Wave pattern: peaks (max) at indices 3 and 13 — first 21 colored, next 21 faded.
  const seq = [20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20]
  const totalLeft = seq.length
  const totalBars = totalLeft * 2
  return (
    <svg width="100%" height="80" viewBox="0 0 521 80" preserveAspectRatio="none">
      {Array.from({ length: totalBars }, (_, i) => {
        const h = seq[i % totalLeft]
        const yTop = 40 - h / 2
        const x = 8 + (i * (505 / (totalBars - 1)))
        const c = i < totalLeft ? color : 'rgba(255,255,255,0.5)'
        return <line key={i} x1={x} y1={yTop} x2={x} y2={yTop + h} stroke={c} strokeWidth={5} strokeLinecap="round" />
      })}
    </svg>
  )
}

function BurnVisual({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 108 }}>
        <div style={{ flexShrink: 0, width: 113, height: 108, display: 'flex', alignItems: 'center' }}>
          <GradientHeart />
        </div>
        {cfg.boxes.map((n, i) => (
          <div key={i} style={{
            flex: 1, height: 108, borderRadius: '24px 12px 24px 24px',
            background: '#000', boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins', fontSize: 80, fontWeight: 700, color: '#fff', lineHeight: '66px',
          }}>{n}</div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 80 }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 900, fontSize: 40, lineHeight: '66px',
          background: `linear-gradient(192.26deg, ${cfg.color} 0.02%, ${rgba(cfg.color, 0.8)} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', minWidth: 105,
        }}>50%</span>
        <div style={{ flex: 1 }}><Waveform color="#EA4898" /></div>
      </div>
    </div>
  )
}

function ShieldGauge({ cfg }) {
  // New gauge per Figma Frame 1707480444 — horizontal slider with tick marks,
  // triangles above/below, and a circular indicator.
  const TRACK_W = 661
  const TICKS = [0, 110, 220, 438, 547, 657]
  const INDICATOR_LEFT = 306
  const indicatorCenterPct = ((INDICATOR_LEFT + 25) / TRACK_W) * 100

  return (
    <div style={{
      width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
      gap: 4,
    }}>
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
            <linearGradient id="shieldGaugeGradEos" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={cfg.color} stopOpacity="0.25" />
              <stop offset="50%"  stopColor={cfg.color} stopOpacity="1" />
              <stop offset="100%" stopColor={cfg.color} stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect x="0" y="28" width={TRACK_W} height="4" fill="url(#shieldGaugeGradEos)" />
          {TICKS.map((x, i) => (
            <rect key={i} x={x - 2} y="5" width="4" height="50" fill="url(#shieldGaugeGradEos)" />
          ))}
        </svg>
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

function ShieldVisual({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 22 }}>
      <ShieldGauge cfg={cfg} />
      <div style={{
        width: '100%',
        background: '#000', border: `3px solid ${cfg.color}`,
        borderRadius: '24px 12px 24px 24px', height: 135,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
      }}>
        <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 80, lineHeight: '66px', color: '#fff' }}>120</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 32, lineHeight: '66px', color: '#fff',
          alignSelf: 'flex-end', marginBottom: 12, letterSpacing: '0.05em',
        }}>MIN</span>
        <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 80, lineHeight: '66px', color: '#fff', margin: '0 18px' }}>/</span>
        <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 60, lineHeight: '66px', color: cfg.color }}>450</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 24, lineHeight: '66px', color: cfg.color,
          alignSelf: 'flex-end', marginBottom: 14, letterSpacing: '0.05em',
        }}>MIN</span>
      </div>
    </div>
  )
}

/* ----- Left Panel (Goal Achieved) ----- */

function LeftPanel({ cfg }) {
  return (
    <div style={{
      position: 'absolute', top: 142, left: 50, width: 805, height: 888,
      borderRadius: RADIUS,
      background: panelGradient(cfg.color),
      padding: 36, color: '#fff', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 36,
      fontFamily: 'Poppins, sans-serif',
      justifyContent: 'space-between',
    }}>
      {/* Title — matches Figma: 54px/800, "Group Target" 36px below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px' }}>Prime</span>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px', color: cfg.color }}>{cfg.label}</span>
        </div>
      </div>

      {/* Goal achieved title + body (matches Figma Frame 1707480397: gap 12) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 56, lineHeight: '66px', color: '#fff' }}>
          GOAL ACHIEVED!
        </div>
        <div style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 32, lineHeight: '46px', color: '#fff' }}>
          Perfect! Team completed 100% of training goals
        </div>
      </div>

      {/* Inner card with visualization — Figma Frame 1707480388 (padding 36, gap 48) */}
      <div style={{
        padding: 36,
        borderRadius: RADIUS,
        background: 'rgba(255,255,255,0.10)',
        border: `3px solid ${cfg.color}`,
        display: 'flex', flexDirection: 'column', gap: 48,
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        {/* Headline with icon — 36px font, 56x56 icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: cfg.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <UsersThree size={32} weight="bold" color="#fff" />
          </div>
          <span style={{ fontSize: 36, fontWeight: 600, lineHeight: '46px' }}>{cfg.goalHeadline}</span>
        </div>

        {cfg.mode === 'scale'  && <ScaleVisual  cfg={cfg} />}
        {cfg.mode === 'burn'   && <BurnVisual   cfg={cfg} />}
        {cfg.mode === 'shield' && <ShieldVisual cfg={cfg} />}
      </div>
    </div>
  )
}

/* ----- Right Panel (Ranking Table) ----- */

/* Shared column layout — header medals align over score columns */
function RankingHeader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
      width: '100%', height: 74,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 53 }}>
        {/* 3 medal columns, each 130 wide to match the score cells below */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: 130, display: 'flex', justifyContent: 'center' }}><Medal tier="gold"   /></div>
          <div style={{ width: 130, display: 'flex', justifyContent: 'center' }}><Medal tier="bronze" /></div>
          <div style={{ width: 130, display: 'flex', justifyContent: 'center' }}><Medal tier="silver" /></div>
        </div>
        {/* TOTAL column — matches total cell width 90 with padding-right 20 */}
        <div style={{
          width: 90, paddingRight: 20, boxSizing: 'border-box',
          fontFamily: 'Poppins', fontWeight: 600, fontSize: 32, lineHeight: '46px',
          color: '#fff', textAlign: 'center',
        }}>TOTAL</div>
      </div>
    </div>
  )
}

function RankingRow({ row }) {
  const bg =
    row.tier === 'gold'
      ? 'linear-gradient(90deg, rgba(249,185,6,0.5) 0%, rgba(249,185,6,0) 100%)'
      : row.tier === 'silver'
      ? 'linear-gradient(90deg, rgba(235,242,242,0.5) 0%, rgba(235,242,242,0) 100%)'
      : row.tier === 'bronze'
      ? 'linear-gradient(90deg, rgba(227,127,34,0.5) 0%, rgba(227,127,34,0) 100%)'
      : 'rgba(255,255,255,0.10)'
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      width: '100%', height: 90, padding: '16px 0 16px 20px',
      background: bg, borderRadius: '16px 8px 16px 16px',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 44, lineHeight: '58px',
          color: '#fff', minWidth: 80,
        }}>#{row.rank}</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 600, fontSize: 34, lineHeight: '58px',
          color: '#fff', minWidth: 130,
        }}>{row.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 53 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {row.scores.map((s, i) => (
            <div key={i} style={{
              width: 130, textAlign: 'center',
              fontFamily: 'Poppins', fontWeight: 600, fontSize: 32, lineHeight: '46px',
              color: '#fff',
            }}>{s}</div>
          ))}
        </div>
        <div style={{
          width: 90, paddingRight: 20, boxSizing: 'border-box',
          fontFamily: 'Poppins', fontWeight: 800, fontSize: 32, lineHeight: '46px',
          color: '#fff', textAlign: 'center',
        }}>{row.total}</div>
      </div>
    </div>
  )
}

function RightPanel({ cfg }) {
  return (
    <div style={{
      position: 'absolute', top: 142, left: 891, width: 979, height: 888,
      borderRadius: RADIUS,
      background: panelGradient(cfg.color),
      padding: 36, color: '#fff', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 30,
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{ fontSize: 36, fontWeight: 600, lineHeight: '46px' }}>Ranking table</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <RankingHeader />
        {RANKING.map(r => <RankingRow key={r.rank} row={r} />)}
      </div>
    </div>
  )
}

export default function EndOfSession({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={cfg.color}>
        <LeftPanel cfg={cfg} />
        <RightPanel cfg={cfg} />
      </StageBackground>
    </ScaledFrame>
  )
}
