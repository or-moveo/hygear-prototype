import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

const imgLogo          = '/icons/hygear-logo.png'
const imgGear          = '/assets/gear-render.png'
const imgSpider        = '/assets/spider-x.png'
const imgRope          = '/assets/rope.png'
const imgHybar         = '/assets/hybar.png'
const imgBarbellGoal   = '/assets/barbell-hl.svg'
const imgRepsIcon      = '/assets/arrows-hl.svg'
const imgEquipmentIcon = '/assets/equipment-icon.svg'

// Thermometer SVGs — colors verified against Figma fills
const STEPS = [
  { step: 1, label: 'Warm-Up',          color: '#3A86FF', icon: '/assets/thermo-warmup-bare.svg',        duration: '5 Minutes'  },
  { step: 2, label: 'Demo & Prep',      color: '#23B870', icon: '/assets/thermo-strength-bare.svg',      duration: '5 Minutes'  },
  { step: 3, label: 'Dynamic\nStrength',color: '#FFD000', icon: '/assets/thermo-cooldown2-bare.svg',     duration: '15 Minutes' },
  { step: 4, label: 'Holds\nIsometric', color: '#FF6B00', icon: '/assets/thermo-cooldown2-bare.svg',     duration: '15 Minutes' },
  { step: 5, label: 'All Out',          color: '#F5365C', icon: '/assets/thermo-purple-bare.svg',        duration: '15 Minutes' },
  { step: 6, label: 'Cool-down',        color: '#3A86FF', icon: '/assets/thermo-cooldown-blue-bare.svg', duration: '5 Minutes'  },
]

function stepRadius(i) {
  const bl = i === 0 ? 36 : 8
  const br = i === STEPS.length - 1 ? 36 : 8
  return `36px 36px ${br}px ${bl}px`
}

export default function HighLevelTraining2() {
  return (
    <ScaledFrame frameWidth={1920} frameHeight={1080}>
      <div className="bg-white relative" style={{ width: 1920, height: 1080 }}>

        {/* ── Dark navy header ── */}
        <StudioHeader />

        {/* ── Main content ── */}
        <div style={{ position: 'absolute', top: 130, left: 50, width: 1820, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Row 1: Training card + Equipment */}
          <div style={{ display: 'flex', gap: 36 }}>

            {/* Upper Body Power */}
            <div
              style={{
                width: 1286, height: 230, flexShrink: 0,
                padding: '36px 48px',
                borderRadius: 36,
                background: 'linear-gradient(79.86deg, #435a97 0%, #6685cd 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
            >
              {/* Title + 30 min badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-poppins font-bold text-white" style={{ fontSize: 60, lineHeight: '66px' }}>
                  Upper Body Power
                </span>
                <div style={{ background: '#435a97', borderRadius: 999, padding: '7px 29px', flexShrink: 0 }}>
                  <span className="font-poppins font-semibold text-white" style={{ fontSize: 22, lineHeight: '34px' }}>
                    30 Minutes
                  </span>
                </div>
              </div>

              {/* Goal text + Reps button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={imgBarbellGoal} alt="" style={{ width: 36, height: 36, flexShrink: 0 }} />
                  <p className="font-poppins text-white" style={{ fontSize: 24, lineHeight: '34px', maxWidth: 654, margin: 0 }}>
                    <strong>Training Goal:</strong>{' '}Full Body work that combines dynamic strength, static stability, and aerobics.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.18)', borderRadius: 999, paddingRight: 18, flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.35)' }}>
                  <ArrowsCounterClockwise size={32} color="white" style={{ marginLeft: 12, marginRight: 8, flexShrink: 0 }} />
                  <span className="font-poppins font-semibold" style={{ fontSize: 28, lineHeight: '38px', color: '#fff' }}>
                    Reps 0/1800
                  </span>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div
              style={{
                flex: 1,
                height: 230,
                padding: 36,
                borderRadius: 36,
                background: 'linear-gradient(252.16deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)',
                display: 'flex', flexDirection: 'column', gap: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={imgEquipmentIcon} alt="" style={{ width: 46, height: 46 }} />
                <span className="font-poppins font-semibold" style={{ fontSize: 36, lineHeight: '46px' }}>Equipment</span>
              </div>
              <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                {[
                  { src: imgGear,   h: 70 },
                  { src: imgSpider, h: 70 },
                  { src: imgRope,   h: 72 },
                  { src: imgHybar,  h: 37, rotate: true },
                ].map(({ src, h, rotate }, i) => (
                  <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={src} alt="" style={{ height: h, width: 'auto', objectFit: 'contain', transform: rotate ? 'rotate(-90deg)' : undefined }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: 6 block cards */}
          <div style={{ display: 'flex', gap: 36, height: 610 }}>
            {STEPS.map(({ step, label, color, icon, duration }, i) => (
              <div
                key={step}
                style={{
                  flex: i === 0 ? '0 0 273px' : '1 0 0',
                  padding: 36,
                  borderRadius: stepRadius(i),
                  borderBottom: `8px solid ${color}`,
                  background: `linear-gradient(205deg, ${color}4D 0%, ${color}0D 100%), #fff`,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
              >
                {/* Top: step label + icon badge + name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                  {/* Step label with underline */}
                  <div style={{ borderBottom: `1px solid ${color}`, paddingBottom: 8 }}>
                    <span className="font-poppins" style={{ fontSize: 24, lineHeight: '34px', color }}>
                      BLOCK {step}
                    </span>
                  </div>

                  {/* Icon — thermometer SVG includes its own colored background */}
                  <div style={{ width: 88, height: 88, borderRadius: 16, background: color, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={icon} alt="" style={{ width: 88, height: 88, display: 'block' }} />
                  </div>

                  {/* Step name */}
                  <span className="font-poppins font-semibold text-black" style={{ fontSize: 36, lineHeight: '46px', whiteSpace: 'pre-line' }}>
                    {label}
                  </span>
                </div>

                {/* Duration badge */}
                <div style={{
                  background: color, borderRadius: 999,
                  padding: '8px 24px', width: 201, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="font-poppins font-medium text-white" style={{ fontSize: 18, lineHeight: '28px', whiteSpace: 'nowrap' }}>
                    {duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ScaledFrame>
  )
}
