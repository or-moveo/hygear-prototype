import { useEffect, useState } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import { Fire, Stack, Barbell, Lightning, Snowflake, Target, UsersThree, PersonArmsSpread, BatteryFull } from '@phosphor-icons/react'

/**
 * Trainee version of the Prime SHIELD/BURN/BUILD high-level overview screens.
 *
 * Designed natively for a 1366×1024 (iPad Pro landscape, 4:3) frame instead of the
 * Studio's 1920×1080 (16:9). To fill the new aspect ratio without distortion:
 *  - Each visual ELEMENT (icon, font, badge, image) is uniformly scaled by S = 1366/1920 ≈ 0.711
 *    so its proportions stay identical to the original.
 *  - The LAYOUT CONTAINERS (top row, blocks row, content area) use flex:1 / auto-layout so they
 *    naturally grow vertically to fill the extra height in the 4:3 viewport — giving each
 *    block & the upper cards more breathing room without ever stretching their contents.
 *  - The whole 1366×1024 frame is uniformly scaled to the actual viewport via ScaledFrame.
 */

const Z = { z1: '#3A86FF', z2: '#23B870', z3: '#F9B906', z4: '#FF6B00', z5: '#F5365C' }

const BLOCKS = [
  { num: 1, name: 'Joint\nWarm-Up',   minutes: 5,  zone: 'z1', zoneLabel: 'ZONE 1', Icon: Fire },
  { num: 2, name: 'Demo &\nPrep',     minutes: 5,  zone: 'z2', zoneLabel: 'ZONE 2', Icon: Stack },
  { num: 3, name: 'Main\nBlock',      minutes: 26, zone: 'z3', zoneLabel: 'ZONE 2', Icon: PersonArmsSpread },
  { num: 4, name: 'Iron\nWall',       minutes: 7,  zone: 'z4', zoneLabel: 'ZONE 4', Icon: PersonArmsSpread },
  { num: 5, name: 'Core\nFinisher',   minutes: 3,  zone: 'z5', zoneLabel: 'ZONE 5', Icon: Lightning },
  { num: 6, name: 'Deep\nRelease',    minutes: 4,  zone: 'z1', zoneLabel: 'ZONE 1', Icon: Snowflake },
]

// Per-item image dimensions and rotations from the Figma equipment spec.
// Battery levels are placeholder data for the indicator pill below each slot.
const EQUIP = [
  { src: '/assets/gear-render.png', imgW: 35, imgH: 60, battery: 99 },
  { src: '/assets/spider-x.png',    imgW: 33, imgH: 60, battery: 99 },
  { src: '/assets/rope.png',        imgW: 46, imgH: 55, battery: 99 },
  { src: '/assets/hybar.png',       imgW: 55, imgH: 29, battery: 99, rotate: 'rotate(-90deg)' },
]

const HygearLogo = ({ width = 48, height = 28 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="white"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="white"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="white"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.398264Z" fill="white"/>
  </svg>
)

const BRAND = {
  SHIELD: { word: 'SHIELD', primeFrom: '#22d3ee', primeTo: '#06b6d4', pill: '#06b6d4' },
  BURN:   { word: 'BURN',   primeFrom: '#f472b6', primeTo: '#ec4899', pill: '#ec4899' },
  BUILD:  { word: 'BUILD',  primeFrom: '#c084fc', primeTo: '#a855f7', pill: '#a855f7' },
}

const GOALS = {
  SHIELD: {
    pillLabel: '450 group minutes of control',
    pillPrefix: null,
    goalTitle: 'Training Goal:',
    goalBody: 'The accumulated dwell time in "Total Prime Control Minutes". Make a smooth, perfect movement',
  },
  BURN: {
    pillLabel: '300 team points',
    pillPrefix: null,
    goalTitle: 'Training Goal:',
    goalBody: 'can you keep your heart rate high? Every minute you are in Zone 4–5 adds a point to the group score.',
  },
  BUILD: {
    pillLabel: '20 tons',
    pillPrefix: 'Group weight:',
    goalTitle: 'Training Goal:',
    goalBody: 'The total cumulative weight that the entire group pulled in training together.',
  },
}

// Uniform scale factor for visual elements. 1366 / 1920.
const S = 1366 / 1920

export default function TraineeHighLevelTraining({ variant = 'SHIELD' } = {}) {
  const [activeBlock, setActiveBlock] = useState(0)
  const brand = BRAND[variant] ?? BRAND.SHIELD
  const goal  = GOALS[variant] ?? GOALS.SHIELD

  useEffect(() => {
    const t = setInterval(() => setActiveBlock(b => (b + 1) % 6), 12000)
    return () => clearInterval(t)
  }, [])

  return (
    <ScaledFrame frameWidth={1366} frameHeight={1024}>
      <style>{`
        @keyframes thl-drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(120px,-80px)} }
        @keyframes thl-drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-140px,100px)} }
        @keyframes thl-drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-80px,-60px) scale(1.15)} }
        @keyframes thl-floatTR { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,12px)} }
        @keyframes thl-floatBL { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,-12px)} }
        @keyframes thl-spinSlow { to{rotate:360deg} }
        @keyframes thl-glowPulse {
          0%,100%{filter:blur(64px) drop-shadow(0 0 56px rgba(255,255,255,.3))}
          50%    {filter:blur(78px) drop-shadow(0 0 100px rgba(255,255,255,.45))}
        }
        @keyframes thl-rise {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-1000px) translateX(var(--dx,30px)); opacity:0; }
        }
        @keyframes thl-shimmer { 0%,70%{transform:translateX(-100%)} 95%,100%{transform:translateX(100%)} }
        @keyframes thl-ekg { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
        @keyframes thl-eqpulse {
          0%,100%{box-shadow:inset 0 0 0 1px rgba(58,134,255,.3), 0 0 17px rgba(58,134,255,.35)}
          50%    {box-shadow:inset 0 0 0 1px rgba(58,134,255,.5), 0 0 28px rgba(58,134,255,.6)}
        }
        @keyframes thl-eqring {
          0%{transform:scale(1);opacity:1} 100%{transform:scale(1.25);opacity:0}
        }
        @keyframes thl-teamPulse {
          0%,100%{box-shadow:0 0 0 0 var(--brand-glow,rgba(102,133,205,.55))} 50%{box-shadow:0 0 0 8px transparent}
        }
        @keyframes thl-teamRing {
          0%{transform:scale(1);opacity:.9} 100%{transform:scale(1.35);opacity:0}
        }
        @keyframes thl-railGlide {
          0%{transform:translateX(0)} 100%{transform:translateX(1295px)}
        }
        @keyframes thl-iconBounce {
          0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-4px) scale(1.06)}
        }
        @keyframes thl-zonePulse {
          0%,100%{text-shadow:0 0 0 currentColor} 50%{text-shadow:0 0 12px currentColor}
        }

        .thl-equip-slot { position:relative; width:100%; height:85px; border-radius:11px; background:#fff; display:grid; place-items:center;
          animation:thl-eqpulse 2.4s ease-in-out infinite; }
        .thl-equip-slot::before { content:''; position:absolute; inset:-2px; border-radius:11px; border:2px solid rgba(58,134,255,.6);
          animation:thl-eqring 2.4s ease-out infinite; pointer-events:none; }
        .thl-equip-slot:nth-child(1){ animation-delay:0s } .thl-equip-slot:nth-child(1)::before{ animation-delay:0s }
        .thl-equip-slot:nth-child(2){ animation-delay:.6s } .thl-equip-slot:nth-child(2)::before{ animation-delay:.6s }
        .thl-equip-slot:nth-child(3){ animation-delay:1.2s } .thl-equip-slot:nth-child(3)::before{ animation-delay:1.2s }
        .thl-equip-slot:nth-child(4){ animation-delay:1.8s } .thl-equip-slot:nth-child(4)::before{ animation-delay:1.8s }

        .thl-team-bubble { width:50px; height:50px; border-radius:50%;
          background:linear-gradient(180deg, color-mix(in srgb, var(--brand,#6685CD) 50%, transparent) 0%, var(--brand,#6685CD) 100%);
          display:grid; place-items:center; position:relative; animation:thl-teamPulse 2.4s ease-in-out infinite; }
        .thl-team-bubble::before { content:''; position:absolute; inset:0; border-radius:50%;
          border:2px solid color-mix(in srgb, var(--brand,#6685CD) 80%, transparent); animation:thl-teamRing 2.4s ease-out infinite; pointer-events:none; }

        .thl-block-active { box-shadow:0 0 42px 0 var(--accent-glow) !important; }
        .thl-block-active .thl-block-icon { animation:thl-iconBounce 2s ease-in-out infinite; }
        .thl-block-active .thl-zone-pill { animation:thl-zonePulse 2s ease-in-out infinite; }

        .thl-rail::after { content:''; position:absolute; top:-3px; left:0; width:57px; height:8px; border-radius:8px;
          background:linear-gradient(90deg,transparent,#fff,transparent); filter:blur(3px);
          animation:thl-railGlide 6s linear infinite; }
      `}</style>

      <div style={{
        width: 1366, height: 1024, background: '#000', fontFamily: 'Poppins, sans-serif',
        overflow: 'hidden', position: 'relative',
        '--brand': brand.pill, '--brand-glow': `color-mix(in srgb, ${brand.pill} 55%, transparent)`,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Aurora blobs (proportionally scaled) */}
        <div style={{ position:'absolute', width:640, height:640, borderRadius:'50%', background:'#FF6B00', left:-142, top:142, filter:'blur(85px)', opacity:.22, mixBlendMode:'screen', animation:'thl-drift1 22s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:640, height:640, borderRadius:'50%', background:'#3A86FF', right:-142, top:-107, filter:'blur(85px)', opacity:.22, mixBlendMode:'screen', animation:'thl-drift2 28s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:640, height:640, borderRadius:'50%', background:'#F5365C', left:'40%', bottom:-285, filter:'blur(85px)', opacity:.14, mixBlendMode:'screen', animation:'thl-drift3 30s ease-in-out infinite', pointerEvents:'none' }} />

        {/* Particles */}
        {Array.from({ length: 30 }, (_, i) => {
          const colors = ['rgba(255,107,0,.7)', 'rgba(58,134,255,.6)', 'rgba(245,54,92,.6)', 'rgba(255,255,255,.5)']
          const c = colors[i % colors.length]
          const size = 2 + (i * 1.3) % 4
          return (
            <div key={i} style={{
              position:'absolute', bottom:-10, pointerEvents:'none',
              width: size, height: size, borderRadius:'50%',
              background: c, boxShadow: `0 0 8px ${c}`,
              left: `${(i * 46) % 1366}px`,
              '--dx': `${(i % 3 - 1) * 36}px`,
              animationName: 'thl-rise', animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDuration: `${10 + (i * 1.1) % 12}s`,
              animationDelay: `-${(i * 0.7) % 20}s`,
            }} />
          )
        })}

        {/* Top bar — Trainee 1366×1024 frame, per Figma spec.
            Left: hygear logo + trainee name. Right: set pill whose gradient follows
            the variant brand colors (SHIELD: cyan, BURN: pink, BUILD: purple). */}
        <div style={{
          width: 1366, height: 105,
          background: '#020202', borderBottom: '1px solid #FFFFFF',
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          padding: '25px 36px',
          boxSizing: 'border-box', zIndex: 10,
          flexShrink: 0,
        }}>
          {/* Logo + trainee name */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <HygearLogo width={67} height={40} />
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
              color: '#FFFFFF',
            }}>Adar Shirasi</span>
          </div>

          {/* Set/Station pill — gradient follows the workout variant in the Prime screens
              (SHIELD=cyan, BURN=pink, BUILD=purple). Other Trainee screens use a uniform cyan. */}
          <div style={{
            width: 100, height: 54,
            padding: '10px 20px',
            borderRadius: 10,
            background: `linear-gradient(180deg, ${brand.primeFrom} 0%, ${brand.primeTo} 100%)`,
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

        {/* Content area — flex column that fills remaining height.
            Page margins: 36px on all four sides (matches the design system). */}
        <div style={{
          flex: '1 1 auto',
          display: 'flex', flexDirection: 'column', gap: 29,
          padding: '36px 36px 36px 36px',
          boxSizing: 'border-box', zIndex: 5,
          minHeight: 0,
        }}>

          {/* Top row — responsive: fr-based columns auto-fit any container width,
              keeping the 915:354 ratio from the design (≈ 72%/28%).
              Height bumped to 236 to absorb the extra 10px (top bar grew by 39, blocks shrink by 49 total). */}
          <div style={{
            display: 'grid', gridTemplateColumns: '915fr 354fr',
            gap: 26,
            flex: '0 0 auto',
            height: 236,
          }}>

            {/* Session card */}
            <div style={{
              borderRadius: '26px 13px 26px 26px',
              background: 'rgb(32,32,37)',
              padding: '26px 34px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 9,
              position: 'relative', overflow: 'visible',
              border: '1px solid rgba(255,255,255,.04)',
              boxSizing: 'border-box',
            }}>
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: 43, fontWeight: 700, lineHeight: '47px', letterSpacing: '-.01em' }}>
                  <span style={{ color: '#fff' }}>Prime </span>
                  <span style={{ backgroundImage: `linear-gradient(180deg, ${brand.primeFrom} 0%, ${brand.primeTo} 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>{brand.word}</span>
                </h1>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  height: 44, padding: '0 20px', borderRadius: 999,
                  background: `linear-gradient(180deg, color-mix(in srgb, ${brand.pill} 55%, transparent) 0%, ${brand.pill} 100%)`,
                  border: '1px solid rgba(255,255,255,.15)',
                  fontSize: 18, fontWeight: 700, color: '#fff',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <style>{`.thl-dur::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);transform:translateX(-100%);animation:thl-shimmer 9s ease-in-out infinite}`}</style>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  50 Minutes
                  <span className="thl-dur" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Goal row — both items align to the top so the pill and the text start on the same line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 17 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: '0 1 auto', maxWidth: 420, fontSize: 18, lineHeight: '26px', color: 'rgba(255,255,255,.92)' }}>
                  <div style={{ width: 26, height: 26, flexShrink: 0, display: 'grid', placeItems: 'center', marginTop: 1 }}>
                    <Target size={20} color="#fff" />
                  </div>
                  <div>
                    <b>{goal.goalTitle}</b> {goal.goalBody}
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 0,
                  height: 50, paddingRight: 20, borderRadius: 999,
                  background: `color-mix(in srgb, ${brand.pill} 22%, rgba(255,255,255,.08))`,
                  fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  <div className="thl-team-bubble">
                    <UsersThree size={24} color="#fff" />
                  </div>
                  <span style={{ marginLeft: 12 }}>
                    {goal.pillPrefix && <b style={{ marginRight: 6 }}>{goal.pillPrefix}</b>}
                    {goal.pillLabel}
                  </span>
                </div>
              </div>

              {/* EKG line */}
              <svg style={{ width: '100%', height: 14, marginTop: 4, color: brand.pill }} viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d="M0 10 L60 10 L70 10 L78 4 L86 16 L94 2 L102 18 L110 10 L180 10 L188 6 L196 14 L204 10 L400 10"
                  stroke="currentColor" strokeWidth="2" fill="none"
                  strokeDasharray="400"
                  style={{ filter: 'drop-shadow(0 0 6px currentColor)', animation: 'thl-ekg 9s linear infinite' }}
                />
              </svg>
            </div>

            {/* Equipment card — 26px padding all sides (matches the rest of the design system) */}
            <div style={{
              borderRadius: '26px 13px 26px 26px',
              background: 'linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(60,141,235,.3) 100%), rgb(39,40,41)',
              padding: 26,
              display: 'flex', flexDirection: 'column', gap: 16,
              position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(58,134,255,.1)',
              boxSizing: 'border-box',
            }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0, fontSize: 28, fontWeight: 700, color: '#ffffff' }}>
                <span style={{ width: 38, height: 38, borderRadius: 8, display: 'grid', placeItems: 'center', color: '#3A86FF' }}>
                  <Barbell size={30} color="#fff" />
                </span>
                Equipment
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9 }}>
                {EQUIP.map((eq, i) => (
                  // minWidth:0 lets the 1fr columns actually shrink to fit the inner card width.
                  // Without it, the battery pill's intrinsic content width forces each column wider
                  // than 1fr, causing the grid to overflow on the right.
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'stretch', minWidth: 0 }}>
                    {/* Top decorative bar (Figma addition) — same green as the battery indicator */}
                    <div style={{
                      width: '100%', height: 5,
                      background: '#43A77C',
                      borderRadius: 6,
                      flexShrink: 0,
                    }} />

                    {/* Equipment slot — keeps existing animations, roundness, and white bg */}
                    <div className="thl-equip-slot">
                      <img
                        src={eq.src}
                        alt=""
                        style={{
                          width: eq.imgW,
                          height: eq.imgH,
                          objectFit: 'contain',
                          ...(eq.rotate ? { transform: eq.rotate } : null),
                        }}
                      />
                    </div>

                    {/* Battery indicator pill (Figma addition) */}
                    <div style={{
                      display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                      padding: '0 8px', gap: 4,
                      height: 28, width: '100%',
                      background: '#FFFFFF',
                      borderRadius: 6,
                      boxSizing: 'border-box',
                      flexShrink: 0,
                    }}>
                      <BatteryFull size={20} color="#43A77C" weight="fill" />
                      <span style={{
                        fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px',
                        color: '#000000',
                      }}>{eq.battery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blocks row — flex:1 so it fills the remaining vertical space, giving each block extra breathing room */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 16,
            flex: '1 1 auto',
            position: 'relative',
            minHeight: 0,
          }}>

            {/* Energy rail */}
            <div className="thl-rail" style={{
              position: 'absolute', left: 0, right: 0, top: '50%', height: 2, pointerEvents: 'none',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(90deg, rgba(58,134,255,.4), rgba(35,184,112,.4), rgba(249,185,6,.4), rgba(255,107,0,.5), rgba(245,54,92,.5), rgba(58,134,255,.4))',
              opacity: .2, mixBlendMode: 'screen',
            }} />

            {BLOCKS.map(({ num, name, minutes, zone, zoneLabel, Icon }, idx) => {
              const accent = Z[zone]
              const isActive = idx === activeBlock
              return (
                <div
                  key={num}
                  className={isActive ? 'thl-block-active' : ''}
                  style={{
                    borderRadius: idx === 0 ? '26px 13px 13px 26px' : idx === 5 ? '26px 13px' : '26px 13px 26px 26px',
                    padding: '26px 20px',
                    display: 'flex', flexDirection: 'column',
                    position: 'relative', overflow: 'hidden',
                    color: '#fff',
                    '--accent-glow': `color-mix(in srgb, ${accent} 45%, transparent)`,
                    background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 60%, transparent) 0%, color-mix(in srgb, ${accent} 30%, transparent) 100%)`,
                    border: `2px solid ${accent}`,
                    transition: 'transform .4s ease',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', height: 36, color: accent, fontWeight: 700, fontSize: 20, letterSpacing: '.08em' }}>
                    BLOCK {num}
                  </div>

                  <div className="thl-block-icon" style={{
                    width: 63, height: 63, borderRadius: 17,
                    background: accent,
                    display: 'grid', placeItems: 'center',
                    marginTop: 26, flexShrink: 0,
                    boxShadow: `0 6px 17px color-mix(in srgb, ${accent} 40%, transparent)`,
                  }}>
                    <Icon size={31} color="#fff" />
                  </div>

                  <div style={{ flex: 1, marginTop: 20 }}>
                    <h3 style={{ fontSize: 28, fontWeight: 700, lineHeight: '34px', margin: '0 0 10px 0', letterSpacing: '-.01em', whiteSpace: 'pre-line' }}>
                      {name}
                    </h3>
                    <div style={{ fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,.92)' }}>
                      {minutes} Minutes
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <div className="thl-zone-pill" style={{
                      height: 40, borderRadius: 6,
                      background: '#000',
                      border: '1px solid rgba(255,255,255,.08)',
                      display: 'grid', placeItems: 'center',
                      fontWeight: 700, fontSize: 20,
                      color: accent,
                    }}>
                      {zoneLabel}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ScaledFrame>
  )
}
