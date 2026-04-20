/**
 * StageBackground — shared design language for all Studio screens.
 *
 * Extracted from the High Level screen so every studio page gets the same
 * dark stage: aurora blobs, sparkle haloes, rising particles, and the
 * Hygear/Studio name topbar, with all of the original animations.
 *
 * The topbar is rendered at z=10. Animated background layers sit at z=0 and
 * are pointer-events:none, so existing absolute-positioned page content
 * (which usually starts at top:142) overlays on top untouched.
 *
 * Usage:
 *   <ScaledFrame>
 *     <StageBackground>
 *       {/* existing absolute-positioned page content * /}
 *     </StageBackground>
 *   </ScaledFrame>
 */

const HygearLogo = ({ color = '#fff' }) => (
  <svg width="67" height="40" viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="currentColor"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="currentColor"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="currentColor"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.398264Z" fill="currentColor"/>
  </svg>
)

const SPARKLE_PATH = "M 330.563 0 C 242.892 0 158.812 34.827 96.82 96.82 C 34.827 158.812 0 242.892 0 330.563 C 0 418.233 34.827 502.313 96.82 564.305 C 158.812 626.298 242.892 661.125 330.563 661.125 C 418.233 661.125 502.313 626.298 564.305 564.305 C 626.298 502.313 661.125 418.233 661.125 330.563 C 661.125 242.892 626.298 158.812 564.305 96.82 C 502.313 34.827 418.233 0 330.563 0 Z M 514.065 349.59 C 509.998 354.941 504.36 358.887 497.94 360.877 L 446.017 378.292 C 430.151 383.715 415.711 392.644 403.77 404.415 C 391.909 416.285 382.966 430.747 377.647 446.663 L 359.91 498.585 C 357.524 504.44 353.629 509.559 348.623 513.42 C 343.268 517.299 336.851 519.438 330.24 519.548 C 323.595 519.645 317.115 517.485 311.858 513.42 C 306.494 509.57 302.442 504.167 300.248 497.94 L 283.155 446.017 C 277.843 430.047 268.862 415.544 256.933 403.67 C 245.003 391.797 230.458 382.885 214.462 377.647 L 162.863 360.555 C 156.636 358.361 151.232 354.308 147.383 348.945 C 143.362 343.664 141.207 337.199 141.255 330.563 C 141.298 323.841 143.441 317.302 147.383 311.858 C 151.086 306.63 156.416 302.774 162.54 300.892 L 214.462 283.478 C 230.513 278.042 245.16 269.121 257.355 257.355 C 269.287 245.293 278.221 230.587 283.478 214.462 L 300.892 163.508 C 302.825 157.406 306.53 152.017 311.535 148.028 C 316.679 143.684 323.185 141.287 329.917 141.255 C 336.316 141.145 342.603 142.941 347.978 146.415 C 353.653 149.943 357.971 155.284 360.233 161.573 L 377.647 214.14 C 383.065 230.362 392.095 245.132 404.092 257.355 C 416.213 269.056 430.741 277.971 446.663 283.478 L 498.585 301.538 C 504.755 303.504 510.091 307.477 513.742 312.825 C 517.506 318.217 519.532 324.631 519.548 331.208 C 519.515 337.722 517.612 344.108 514.065 349.59 Z"

/**
 * @param {{ studioName?: string, showTopbar?: boolean, variant?: 'dark' | 'light', children?: React.ReactNode }} props
 */
export default function StageBackground({ studioName = 'Studio name', showTopbar = true, variant = 'dark', glowColor, children }) {
  const isLight = variant === 'light'
  const rootBg       = isLight ? '#f7f8fa' : '#000'
  const blobOpacity  = isLight ? 0.10 : 0.22
  const blobOpacityR = isLight ? 0.10 : 0.22
  const blobOpacityS = isLight ? 0.06 : 0.14
  const blobBlend    = isLight ? 'multiply' : 'screen'
  const tinted       = isLight && !!glowColor
  const haloColor    = tinted ? glowColor : (isLight ? '#334367' : '#fff')
  const haloOpacity  = tinted ? 0.5 : (isLight ? 0.08 : 0.25)
  const haloBlend    = isLight ? 'multiply' : 'screen'
  const particleSet  = isLight
    ? ['rgba(255,107,0,.55)', 'rgba(58,134,255,.5)', 'rgba(245,54,92,.5)', 'rgba(51,67,103,.35)']
    : ['rgba(255,107,0,.7)',  'rgba(58,134,255,.6)', 'rgba(245,54,92,.6)', 'rgba(255,255,255,.5)']
  const railOpacity  = isLight ? 0.35 : 0.2
  const topbarBg     = isLight ? '#ffffff' : '#020202'
  const topbarBorder = isLight ? '1px solid #e5e5e5' : '1px solid #ffffff'
  const topbarText   = isLight ? '#1a1a2e' : '#ffffff'
  return (
    <div style={{ width: 1920, height: 1080, background: rootBg, fontFamily: 'Poppins, sans-serif', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes sbg-drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(120px,-80px)} }
        @keyframes sbg-drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-140px,100px)} }
        @keyframes sbg-drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-80px,-60px) scale(1.15)} }
        @keyframes sbg-floatTR { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,12px)} }
        @keyframes sbg-floatBL { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,-12px)} }
        @keyframes sbg-spinSlow { to{rotate:360deg} }
        @keyframes sbg-glowPulse {
          0%,100%{filter:blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))}
          50%    {filter:blur(110px) drop-shadow(0 0 140px rgba(255,255,255,.45))}
        }
        @keyframes sbg-rise {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-1200px) translateX(var(--dx,30px)); opacity:0; }
        }
        @keyframes sbg-railGlide {
          0%{transform:translateX(0)} 100%{transform:translateX(1920px)}
        }
        .sbg-rail::after {
          content:''; position:absolute; top:-3px; left:0; width:80px; height:8px; border-radius:8px;
          background:linear-gradient(90deg,transparent,#fff,transparent); filter:blur(3px);
          animation:sbg-railGlide 6s linear infinite;
        }
      `}</style>

      {/* Aurora blobs */}
      <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#FF6B00', left:-200, top:200, filter:'blur(120px)', opacity:blobOpacity, mixBlendMode:blobBlend, animation:'sbg-drift1 22s ease-in-out infinite', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#3A86FF', right:-200, top:-150, filter:'blur(120px)', opacity:blobOpacityR, mixBlendMode:blobBlend, animation:'sbg-drift2 28s ease-in-out infinite', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', width:900, height:900, borderRadius:'50%', background:'#F5365C', left:'40%', bottom:-400, filter:'blur(120px)', opacity:blobOpacityS, mixBlendMode:blobBlend, animation:'sbg-drift3 30s ease-in-out infinite', pointerEvents:'none', zIndex:0 }} />

      {/* Sparkle haloes */}
      <svg style={{ position:'absolute', width:661, height:661, left:0, top:749, color:haloColor, opacity:haloOpacity, filter:'blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))', animation:'sbg-floatBL 22s ease-in-out infinite, sbg-spinSlow 80s linear infinite reverse, sbg-glowPulse 6s ease-in-out infinite', mixBlendMode:haloBlend, pointerEvents:'none', zIndex:0 }} viewBox="0 0 661.125 661.125" aria-hidden="true">
        <path d={SPARKLE_PATH} fill="currentColor"/>
      </svg>
      <svg style={{ position:'absolute', width:661, height:661, left:1259, top:-331, color:haloColor, opacity:haloOpacity, filter:'blur(90px) drop-shadow(0 0 80px rgba(255,255,255,.3))', animation:'sbg-floatTR 18s ease-in-out infinite, sbg-spinSlow 60s linear infinite, sbg-glowPulse 5s ease-in-out infinite', mixBlendMode:haloBlend, pointerEvents:'none', zIndex:0 }} viewBox="0 0 661.125 661.125" aria-hidden="true">
        <path d={SPARKLE_PATH} fill="currentColor"/>
      </svg>

      {/* Particles */}
      {Array.from({ length: 30 }, (_, i) => {
        const c = particleSet[i % particleSet.length]
        const size = 2 + (i * 1.3) % 4
        return (
          <div key={i} style={{
            position:'absolute', bottom:-10, pointerEvents:'none', zIndex:0,
            width: size, height: size, borderRadius:'50%',
            background: c, boxShadow: `0 0 8px ${c}`,
            left: `${(i * 64) % 1920}px`,
            '--dx': `${(i % 3 - 1) * 50}px`,
            animationName: 'sbg-rise', animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: `${10 + (i * 1.1) % 12}s`,
            animationDelay: `-${(i * 0.7) % 20}s`,
          }} />
        )
      })}

      {/* Energy rail — animated glow gliding left→right across the full width */}
      <div className="sbg-rail" style={{
        position:'absolute', left:0, right:0, top:721, height:2, pointerEvents:'none',
        background:'linear-gradient(90deg, rgba(58,134,255,.4), rgba(35,184,112,.4), rgba(249,185,6,.4), rgba(255,107,0,.5), rgba(245,54,92,.5), rgba(58,134,255,.4))',
        opacity:railOpacity, mixBlendMode: isLight ? 'multiply' : 'screen', zIndex:1,
      }} />

      {/* Top bar */}
      {showTopbar && (
        <div style={{
          position:'absolute', left:0, top:0, width:1920, height:93,
          background:topbarBg, borderBottom:topbarBorder,
          display:'flex', alignItems:'center', padding:'25px 50px',
          boxSizing:'border-box', zIndex:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <HygearLogo color={topbarText} />
            <span style={{ fontWeight:700, fontSize:36, lineHeight:'46px', color:topbarText }}>{studioName}</span>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
