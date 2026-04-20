import { useEffect, useState } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import { Fire, Stack, Barbell, Lightning, Snowflake, Target, UsersThree, PersonArmsSpread } from '@phosphor-icons/react'

const Z = { z1: '#3A86FF', z2: '#23B870', z3: '#F9B906', z4: '#FF6B00', z5: '#F5365C' }

const BLOCKS = [
  { num: 1, name: 'Joint\nWarm-Up',   minutes: 5,  zone: 'z1', zoneLabel: 'ZONE 1', Icon: Fire },
  { num: 2, name: 'Demo &\nPrep',     minutes: 5,  zone: 'z2', zoneLabel: 'ZONE 2', Icon: Stack },
  { num: 3, name: 'Main\nBlock',      minutes: 26, zone: 'z3', zoneLabel: 'ZONE 2', Icon: PersonArmsSpread },
  { num: 4, name: 'Iron\nWall',       minutes: 7,  zone: 'z4', zoneLabel: 'ZONE 4', Icon: PersonArmsSpread },
  { num: 5, name: 'Core\nFinisher',   minutes: 3,  zone: 'z5', zoneLabel: 'ZONE 5', Icon: Lightning },
  { num: 6, name: 'Deep\nRelease',    minutes: 4,  zone: 'z1', zoneLabel: 'ZONE 1', Icon: Snowflake },
]

const EQUIP = [
  '/assets/gear-render.png',
  '/assets/spider-x.png',
  '/assets/rope.png',
  '/assets/hybar.png',
]

const HygearLogo = () => (
  <svg width="67" height="40" viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    goalBody: 'The accumulated dwell time in "Total Prime Control Minutes". The goal is to make a smooth, slow, perfect movement',
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

export default function HighLevelTraining2({ variant = 'SHIELD' } = {}) {
  const [activeBlock, setActiveBlock] = useState(0)
  const brand = BRAND[variant] ?? BRAND.SHIELD
  const goal  = GOALS[variant] ?? GOALS.SHIELD

  useEffect(() => {
    const t = setInterval(() => setActiveBlock(b => (b + 1) % 6), 12000)
    return () => clearInterval(t)
  }, [])

  return (
    <ScaledFrame frameWidth={1920} frameHeight={1080}>
      <style>{`
        @keyframes hl2-drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(120px,-80px)} }
        @keyframes hl2-drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-140px,100px)} }
        @keyframes hl2-drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-80px,-60px) scale(1.15)} }
        @keyframes hl2-floatTR { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,12px)} }
        @keyframes hl2-floatBL { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,-12px)} }
        @keyframes hl2-spinSlow { to{rotate:360deg} }
        @keyframes hl2-glowPulse {
          0%,100%{filter:blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))}
          50%    {filter:blur(110px) drop-shadow(0 0 140px rgba(255,255,255,.45))}
        }
        @keyframes hl2-rise {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-1200px) translateX(var(--dx,30px)); opacity:0; }
        }
        @keyframes hl2-shimmer { 0%,70%{transform:translateX(-100%)} 95%,100%{transform:translateX(100%)} }
        @keyframes hl2-ekg { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
        @keyframes hl2-eqpulse {
          0%,100%{box-shadow:inset 0 0 0 1px rgba(58,134,255,.3), 0 0 24px rgba(58,134,255,.35)}
          50%    {box-shadow:inset 0 0 0 1px rgba(58,134,255,.5), 0 0 40px rgba(58,134,255,.6)}
        }
        @keyframes hl2-eqring {
          0%{transform:scale(1);opacity:1} 100%{transform:scale(1.25);opacity:0}
        }
        @keyframes hl2-teamPulse {
          0%,100%{box-shadow:0 0 0 0 var(--brand-glow,rgba(102,133,205,.55))} 50%{box-shadow:0 0 0 10px transparent}
        }
        @keyframes hl2-teamRing {
          0%{transform:scale(1);opacity:.9} 100%{transform:scale(1.35);opacity:0}
        }
        @keyframes hl2-railGlide {
          0%{transform:translateX(0)} 100%{transform:translateX(1820px)}
        }
        @keyframes hl2-blink { 50%{opacity:.35} }
        @keyframes hl2-iconBounce {
          0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.06)}
        }
        @keyframes hl2-zonePulse {
          0%,100%{text-shadow:0 0 0 currentColor} 50%{text-shadow:0 0 16px currentColor}
        }

        .hl2-equip-slot { position:relative; aspect-ratio:1; border-radius:16px; background:#fff; display:grid; place-items:center;
          animation:hl2-eqpulse 2.4s ease-in-out infinite; }
        .hl2-equip-slot::before { content:''; position:absolute; inset:-2px; border-radius:16px; border:2px solid rgba(58,134,255,.6);
          animation:hl2-eqring 2.4s ease-out infinite; pointer-events:none; }
        .hl2-equip-slot:nth-child(1){ animation-delay:0s } .hl2-equip-slot:nth-child(1)::before{ animation-delay:0s }
        .hl2-equip-slot:nth-child(2){ animation-delay:.6s } .hl2-equip-slot:nth-child(2)::before{ animation-delay:.6s }
        .hl2-equip-slot:nth-child(3){ animation-delay:1.2s } .hl2-equip-slot:nth-child(3)::before{ animation-delay:1.2s }
        .hl2-equip-slot:nth-child(4){ animation-delay:1.8s } .hl2-equip-slot:nth-child(4)::before{ animation-delay:1.8s }

        .hl2-team-bubble { width:56px; height:56px; border-radius:50%;
          background:linear-gradient(180deg, color-mix(in srgb, var(--brand,#6685CD) 50%, transparent) 0%, var(--brand,#6685CD) 100%);
          display:grid; place-items:center; position:relative; animation:hl2-teamPulse 2.4s ease-in-out infinite; }
        .hl2-team-bubble::before { content:''; position:absolute; inset:0; border-radius:50%;
          border:2px solid color-mix(in srgb, var(--brand,#6685CD) 80%, transparent); animation:hl2-teamRing 2.4s ease-out infinite; pointer-events:none; }

        .hl2-block-active { box-shadow:0 0 60px 0 var(--accent-glow) !important; }
        .hl2-block-active .hl2-block-icon { animation:hl2-iconBounce 2s ease-in-out infinite; }
        .hl2-block-active .hl2-zone-pill { animation:hl2-zonePulse 2s ease-in-out infinite; }

        .hl2-rail::after { content:''; position:absolute; top:-3px; left:0; width:80px; height:8px; border-radius:8px;
          background:linear-gradient(90deg,transparent,#fff,transparent); filter:blur(3px);
          animation:hl2-railGlide 6s linear infinite; }
      `}</style>

      <div style={{ width: 1920, height: 1080, background: '#000', fontFamily: 'Poppins, sans-serif', overflow: 'hidden', position: 'relative', '--brand': brand.pill, '--brand-glow': `color-mix(in srgb, ${brand.pill} 55%, transparent)` }}>

        {/* Aurora blobs */}
        <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#FF6B00', left:-200, top:200, filter:'blur(120px)', opacity:.22, mixBlendMode:'screen', animation:'hl2-drift1 22s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#3A86FF', right:-200, top:-150, filter:'blur(120px)', opacity:.22, mixBlendMode:'screen', animation:'hl2-drift2 28s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#F5365C', left:'40%', bottom:-400, filter:'blur(120px)', opacity:.14, mixBlendMode:'screen', animation:'hl2-drift3 30s ease-in-out infinite', pointerEvents:'none' }} />

        {/* Sparkle circles */}
        <svg style={{ position:'absolute', width:661, height:661, left:0, top:749, color:'#fff', opacity:.25, filter:'blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))', animation:'hl2-floatBL 22s ease-in-out infinite, hl2-spinSlow 80s linear infinite reverse, hl2-glowPulse 6s ease-in-out infinite', mixBlendMode:'screen', pointerEvents:'none' }} viewBox="0 0 661.125 661.125" aria-hidden="true">
          <path d="M 330.563 0 C 242.892 0 158.812 34.827 96.82 96.82 C 34.827 158.812 0 242.892 0 330.563 C 0 418.233 34.827 502.313 96.82 564.305 C 158.812 626.298 242.892 661.125 330.563 661.125 C 418.233 661.125 502.313 626.298 564.305 564.305 C 626.298 502.313 661.125 418.233 661.125 330.563 C 661.125 242.892 626.298 158.812 564.305 96.82 C 502.313 34.827 418.233 0 330.563 0 Z M 514.065 349.59 C 509.998 354.941 504.36 358.887 497.94 360.877 L 446.017 378.292 C 430.151 383.715 415.711 392.644 403.77 404.415 C 391.909 416.285 382.966 430.747 377.647 446.663 L 359.91 498.585 C 357.524 504.44 353.629 509.559 348.623 513.42 C 343.268 517.299 336.851 519.438 330.24 519.548 C 323.595 519.645 317.115 517.485 311.858 513.42 C 306.494 509.57 302.442 504.167 300.248 497.94 L 283.155 446.017 C 277.843 430.047 268.862 415.544 256.933 403.67 C 245.003 391.797 230.458 382.885 214.462 377.647 L 162.863 360.555 C 156.636 358.361 151.232 354.308 147.383 348.945 C 143.362 343.664 141.207 337.199 141.255 330.563 C 141.298 323.841 143.441 317.302 147.383 311.858 C 151.086 306.63 156.416 302.774 162.54 300.892 L 214.462 283.478 C 230.513 278.042 245.16 269.121 257.355 257.355 C 269.287 245.293 278.221 230.587 283.478 214.462 L 300.892 163.508 C 302.825 157.406 306.53 152.017 311.535 148.028 C 316.679 143.684 323.185 141.287 329.917 141.255 C 336.316 141.145 342.603 142.941 347.978 146.415 C 353.653 149.943 357.971 155.284 360.233 161.573 L 377.647 214.14 C 383.065 230.362 392.095 245.132 404.092 257.355 C 416.213 269.056 430.741 277.971 446.663 283.478 L 498.585 301.538 C 504.755 303.504 510.091 307.477 513.742 312.825 C 517.506 318.217 519.532 324.631 519.548 331.208 C 519.515 337.722 517.612 344.108 514.065 349.59 Z" fill="currentColor"/>
        </svg>
        <svg style={{ position:'absolute', width:661, height:661, left:1259, top:-331, color:'#fff', opacity:.25, filter:'blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))', animation:'hl2-floatTR 18s ease-in-out infinite, hl2-spinSlow 60s linear infinite, hl2-glowPulse 5s ease-in-out infinite', mixBlendMode:'screen', pointerEvents:'none' }} viewBox="0 0 661.125 661.125" aria-hidden="true">
          <path d="M 330.563 0 C 242.892 0 158.812 34.827 96.82 96.82 C 34.827 158.812 0 242.892 0 330.563 C 0 418.233 34.827 502.313 96.82 564.305 C 158.812 626.298 242.892 661.125 330.563 661.125 C 418.233 661.125 502.313 626.298 564.305 564.305 C 626.298 502.313 661.125 418.233 661.125 330.563 C 661.125 242.892 626.298 158.812 564.305 96.82 C 502.313 34.827 418.233 0 330.563 0 Z M 514.065 349.59 C 509.998 354.941 504.36 358.887 497.94 360.877 L 446.017 378.292 C 430.151 383.715 415.711 392.644 403.77 404.415 C 391.909 416.285 382.966 430.747 377.647 446.663 L 359.91 498.585 C 357.524 504.44 353.629 509.559 348.623 513.42 C 343.268 517.299 336.851 519.438 330.24 519.548 C 323.595 519.645 317.115 517.485 311.858 513.42 C 306.494 509.57 302.442 504.167 300.248 497.94 L 283.155 446.017 C 277.843 430.047 268.862 415.544 256.933 403.67 C 245.003 391.797 230.458 382.885 214.462 377.647 L 162.863 360.555 C 156.636 358.361 151.232 354.308 147.383 348.945 C 143.362 343.664 141.207 337.199 141.255 330.563 C 141.298 323.841 143.441 317.302 147.383 311.858 C 151.086 306.63 156.416 302.774 162.54 300.892 L 214.462 283.478 C 230.513 278.042 245.16 269.121 257.355 257.355 C 269.287 245.293 278.221 230.587 283.478 214.462 L 300.892 163.508 C 302.825 157.406 306.53 152.017 311.535 148.028 C 316.679 143.684 323.185 141.287 329.917 141.255 C 336.316 141.145 342.603 142.941 347.978 146.415 C 353.653 149.943 357.971 155.284 360.233 161.573 L 377.647 214.14 C 383.065 230.362 392.095 245.132 404.092 257.355 C 416.213 269.056 430.741 277.971 446.663 283.478 L 498.585 301.538 C 504.755 303.504 510.091 307.477 513.742 312.825 C 517.506 318.217 519.532 324.631 519.548 331.208 C 519.515 337.722 517.612 344.108 514.065 349.59 Z" fill="currentColor"/>
        </svg>

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
              left: `${(i * 64) % 1920}px`,
              '--dx': `${(i % 3 - 1) * 50}px`,
              animationName: 'hl2-rise', animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDuration: `${10 + (i * 1.1) % 12}s`,
              animationDelay: `-${(i * 0.7) % 20}s`,
            }} />
          )
        })}

        {/* Top bar */}
        <div style={{
          position:'absolute', left:0, top:0, width:1920, height:93,
          background:'#020202', borderBottom:'1px solid #ffffff',
          display:'flex', alignItems:'center', padding:'25px 50px',
          boxSizing:'border-box', zIndex:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <HygearLogo />
            <span style={{ fontWeight:700, fontSize:36, lineHeight:'46px', color:'#fff' }}>Studio name</span>
          </div>
        </div>

        {/* Content */}
        <div style={{
          position:'absolute', left:50, top:142,
          width:1820, height:888,
          display:'flex', flexDirection:'column', gap:36, zIndex:5,
        }}>

          {/* Top row */}
          <div style={{ display:'grid', gridTemplateColumns:'1286px 498px', gap:36, height:243 }}>

            {/* Session card */}
            <div style={{
              borderRadius:'36px 18px 36px 36px',
              background:'rgb(32,32,37)',
              padding:'36px 48px',
              display:'flex', flexDirection:'column', justifyContent:'space-between', gap:12,
              position:'relative', overflow:'visible',
              border:'1px solid rgba(255,255,255,.04)',
            }}>
              {/* Title row */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h1 style={{ margin:0, fontSize:60, fontWeight:700, lineHeight:'66px', letterSpacing:'-.01em' }}>
                  <span style={{ color:'#fff' }}>{brand.word} </span>
                  <span style={{ backgroundImage:`linear-gradient(180deg, ${brand.primeFrom} 0%, ${brand.primeTo} 100%)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', color:'transparent' }}>Prime</span>
                </h1>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  height:48, padding:'0 24px', borderRadius:999,
                  background:`linear-gradient(180deg, color-mix(in srgb, ${brand.pill} 55%, transparent) 0%, ${brand.pill} 100%)`,
                  border:'1px solid rgba(255,255,255,.15)',
                  fontSize:20, fontWeight:700, color:'#fff',
                  position:'relative', overflow:'hidden',
                }}>
                  <style>{`.hl2-dur::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);transform:translateX(-100%);animation:hl2-shimmer 9s ease-in-out infinite}`}</style>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  50 Minutes
                  <span className="hl2-dur" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />
                </div>
              </div>

              {/* Goal row */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:24 }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14, flex:1, fontSize:22, lineHeight:'32px', color:'rgba(255,255,255,.92)' }}>
                  <div style={{ width:36, height:36, flexShrink:0, display:'grid', placeItems:'center', marginTop:2 }}>
                    <Target size={28} color="#fff" />
                  </div>
                  <div>
                    <b>{goal.goalTitle}</b> {goal.goalBody}
                  </div>
                </div>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:0,
                  height:56, paddingRight:24, borderRadius:999,
                  background:`color-mix(in srgb, ${brand.pill} 22%, rgba(255,255,255,.08))`,
                  fontSize:24, fontWeight:700, color:'#fff', flexShrink:0,
                }}>
                  <div className="hl2-team-bubble">
                    <UsersThree size={28} color="#fff" />
                  </div>
                  <span style={{ marginLeft:14 }}>
                    {goal.pillPrefix && <b style={{ marginRight: 6 }}>{goal.pillPrefix}</b>}
                    {goal.pillLabel}
                  </span>
                </div>
              </div>

              {/* EKG line */}
              <svg style={{ width:'100%', height:20, marginTop:6, color: brand.pill }} viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d="M0 10 L60 10 L70 10 L78 4 L86 16 L94 2 L102 18 L110 10 L180 10 L188 6 L196 14 L204 10 L400 10"
                  stroke="currentColor" strokeWidth="2" fill="none"
                  strokeDasharray="400"
                  style={{ filter:'drop-shadow(0 0 6px currentColor)', animation:'hl2-ekg 9s linear infinite' }}
                />
              </svg>
            </div>

            {/* Equipment card */}
            <div style={{
              borderRadius:'36px 18px 36px 36px',
              background:'linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(60,141,235,.3) 100%), rgb(39,40,41)',
              padding:36,
              display:'flex', flexDirection:'column', gap:24,
              position:'relative', overflow:'hidden',
              border:'1px solid rgba(58,134,255,.1)',
            }}>
              <h3 style={{ display:'flex', alignItems:'center', gap:12, margin:0, fontSize:32, fontWeight:700, color:'#ffffff' }}>
                <span style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', color:'#3A86FF' }}>
                  <Barbell size={34} color="#fff" />
                </span>
                Equipment
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
                {EQUIP.map((src, i) => (
                  <div key={i} className="hl2-equip-slot">
                    <img src={src} alt="" style={{ width:'65%', height:'65%', objectFit:'contain' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blocks row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:22, height:600, position:'relative' }}>

            {/* Energy rail */}
            <div className="hl2-rail" style={{
              position:'absolute', left:0, right:0, top:'50%', height:2, pointerEvents:'none',
              transform:'translateY(-50%)',
              background:'linear-gradient(90deg, rgba(58,134,255,.4), rgba(35,184,112,.4), rgba(249,185,6,.4), rgba(255,107,0,.5), rgba(245,54,92,.5), rgba(58,134,255,.4))',
              opacity:.2, mixBlendMode:'screen',
            }} />

            {BLOCKS.map(({ num, name, minutes, zone, zoneLabel, Icon }, idx) => {
              const accent = Z[zone]
              const isActive = idx === activeBlock
              return (
                <div
                  key={num}
                  className={isActive ? 'hl2-block-active' : ''}
                  style={{
                    borderRadius: idx === 0 ? '36px 18px 18px 36px' : idx === 5 ? '36px 18px' : '36px 18px 36px 36px',
                    padding:'36px 28px',
                    display:'flex', flexDirection:'column',
                    position:'relative', overflow:'hidden',
                    color:'#fff',
                    '--accent-glow': `color-mix(in srgb, ${accent} 45%, transparent)`,
                    background:`linear-gradient(180deg, color-mix(in srgb, ${accent} 60%, transparent) 0%, color-mix(in srgb, ${accent} 30%, transparent) 100%)`,
                    border:`2px solid ${accent}`,
                    transition:'transform .4s ease',
                  }}
                >
                  <div style={{ display:'flex', alignItems:'center', height:50, color:accent, fontWeight:700, fontSize:24, letterSpacing:'.08em' }}>
                    BLOCK {num}
                  </div>

                  <div className="hl2-block-icon" style={{
                    width:88, height:88, borderRadius:24,
                    background:accent,
                    display:'grid', placeItems:'center',
                    marginTop:36, flexShrink:0,
                    boxShadow:`0 8px 24px color-mix(in srgb, ${accent} 40%, transparent)`,
                  }}>
                    <Icon size={44} color="#fff" />
                  </div>

                  <div style={{ flex:1, marginTop:28 }}>
                    <h3 style={{ fontSize:32, fontWeight:700, lineHeight:'38px', height:76, margin:'0 0 14px 0', letterSpacing:'-.01em', whiteSpace:'pre-line' }}>
                      {name}
                    </h3>
                    <div style={{ fontSize:22, fontWeight:400, color:'rgba(255,255,255,.92)' }}>
                      {minutes} Minutes
                    </div>
                  </div>

                  <div style={{ marginTop:'auto' }}>
                    <div className="hl2-zone-pill" style={{
                      height:54, borderRadius:8,
                      background:'#000',
                      border:'1px solid rgba(255,255,255,.08)',
                      display:'grid', placeItems:'center',
                      fontWeight:700, fontSize:24,
                      color:accent,
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
